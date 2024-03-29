import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { of, merge, timer, BehaviorSubject, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, catchError, takeUntil, repeat, delay, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { saveAs } from 'file-saver';

import { Referral, Message, Channel } from 'src/app/shared/services/referral';
import { Base } from 'src/app/shared/base/base-component';
import { ReferralService } from 'src/app/shared/services/referral.service';
import { chatAnimations } from './chat.animations';

interface MessageChunk {
  icon: any;
  header: MessageHeader;
  messageIds: string[];
}

interface MessageHeader {
  name: string;
  timeStamp: number;
}

interface MediaPreview {
  name: string;
  requestMade: boolean;
  image: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: chatAnimations
})
export class ChatComponent extends Base implements OnInit {
  @ViewChild('scrollChatEl') scrollChatEl: ElementRef;
  @Input() clinicType = '';
  @Output() filesUploaded = new EventEmitter<boolean>();
  @Output() closeChat = new EventEmitter();
  viewingFile = false;
  imagePreview = '';
  imagePreviewName = '';
  mediaPreview: MediaPreview[] = [];
  selectedPreviewIndex = 0;
  selectedChannel: Channel = 'c2c';
  messagePlaceholder = '';
  referral: Referral;
  messages: Message[];
  messageToSend = '';
  uploadingDocuments = false;
  conversation = {};
  messageChunks: MessageChunk[] = [];
  showInfo = false;
  private referralId: string;
  private checked = false;
  private cutoffTime = 900; // -> 15 minutes
  private pollingTime = 0;
  private polling = new BehaviorSubject<boolean>(this.checked);
  private userEmail: string;

  constructor(
    private auth: AngularFireAuth,
    private route: ActivatedRoute,
    private referralService: ReferralService
  ) { super(); }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.userEmail = user.email);
    this.watchRoute();
  }

  enterComment(text: string): void {
    if (!text) {
      return;
    }

    const message: Message = {
      text,
      userId: this.userEmail,
      channel: this.selectedChannel,
      timeStamp: Date.now()
    };

    this.pollingTime = 0;
    this.messages.push(message);
    this.messageChunks = this.mapMessages(this.messages);
    const index = this.messages.length - 1;

    this.referralService.createMessage(this.referralId, [message])
      .pipe(take(1))
      .subscribe(mes => this.messages[index] = mes);

    this.messageToSend = '';
    this.scrollChatEl.nativeElement.scrollTo(0, this.scrollChatEl.nativeElement.scrollHeight);
  }

  downloadFile(fileName: string): void {
    this.referralService.getDocumentFile(this.referralId, fileName[0]).pipe(take(1)).subscribe(res =>
      saveAs(new Blob([res]), fileName[0]));
  }

  previewFile2(media, selectedIndex: number): void {
    this.mediaPreview = media.map(m => ({ ...m, requestMade: false }));
    this.selectedPreviewIndex = selectedIndex;
    this.previewFile();
  }

  moveLeft(): void {
    if (this.selectedPreviewIndex === 0) {
      this.selectedPreviewIndex = this.mediaPreview.length - 1;
    } else {
      this.selectedPreviewIndex--;
    }
    this.previewFile();
  }

  moveRight(): void {
    if (this.selectedPreviewIndex === this.mediaPreview.length - 1) {
      this.selectedPreviewIndex = 0;
    } else {
      this.selectedPreviewIndex++;
    }
    this.previewFile();
  }

  previewFile(): void {
    this.viewingFile = true;
    if (!this.mediaPreview[this.selectedPreviewIndex].requestMade) {
      const index = this.selectedPreviewIndex;
      this.mediaPreview[this.selectedPreviewIndex].requestMade = true;
      this.referralService.getDocumentFile(this.referralId, this.mediaPreview[this.selectedPreviewIndex].name)
        .pipe(take(1)).subscribe(res => {
          const self = this;
          if (this.viewingFile) {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(res);
              reader.onloadend = () => {
                const base64data = reader.result;
                self.mediaPreview[index].image = base64data.toString().replace('data:application/zip;base64,', '');
              };
            } catch (e) { }
          }
        });
    }
  }

  closePreview(): void {
    this.imagePreview = undefined;
    this.imagePreviewName = undefined;
    this.viewingFile = false;
  }

  onFileSelect($event): void {
    this.uploadingDocuments = true;
    const files = $event.target.files;
    const formData = new FormData();
    for (let x = 0, l = files.length; x < l; x++) {
      formData.append(`File${x}`, files[x]);
    }

    this.referralService.uploadDocuments(this.referralId, formData)
      .pipe(take(1))
      .subscribe(() => {
        this.filesUploaded.emit(true);
        this.uploadingDocuments = false;
      });
  }

  talkTo(isClinic: boolean): void {
    if ((isClinic && this.selectedChannel === 'c2c') || (!isClinic && this.selectedChannel === 'c2p')) {
      return;
    }

    if (isClinic) {
      this.selectedChannel = 'c2c';
    } else {
      this.selectedChannel = 'c2p';
    }

    if (this.clinicType === 'dentist') {
      this.messagePlaceholder = `Message ${this.referral.toClinicName}`;
    } else {
      if (this.selectedChannel === 'c2c') {
        this.messagePlaceholder = `Message ${this.referral.fromClinicName}`;
      } else {
        this.messagePlaceholder = `Message ${this.referral.patientFirstName} ${this.referral.patientLastName}`;
      }
    }

    this.togglePoll(false);
    this.togglePoll(true);
  }

  private togglePoll(enabled: boolean): void {
    this.polling.next(enabled);
    if (enabled) {
      this.pollingTime = 0;
      this.watchTimer();
      this.pollChat();
    }
  }

  private pollChat(): void {
    of('').pipe(
      filter(() => !!this.referralId),
      switchMap(() => this.referralService.getMessages(this.referralId, this.selectedChannel)
        .pipe(catchError(() => of([])))
      ),
      tap(messages => this.messages = messages),
      tap(() => this.messageChunks = this.mapMessages(this.messages)),
      delay(100000),
      repeat(),
      takeUntil(merge(this.unsubscribe$, this.polling.pipe(filter(res => res === false))))
    ).subscribe();
  }

  private watchTimer(): void {
    timer(0, 1000).pipe(
      takeUntil(merge(
        this.unsubscribe$,
        this.polling.pipe(filter(res => res === false)))
      )
    ).subscribe(() => {
      this.pollingTime++;
      if (this.pollingTime > this.cutoffTime) {
        this.checked = false;
        this.polling.next(false);
      }
    });
  }

  private watchRoute(): void {
    this.route.queryParams.pipe(
      filter(params => {
        this.referralId = params.r;

        return !!params.r;
      }),
      switchMap(params => {
        return forkJoin([
          this.referralService.get(params.r).pipe(take(1)),
          this.referralService.getMessages(params.r, this.selectedChannel).pipe(catchError(() => of([])), take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([referral, messages]) => {
      this.referral = referral;
      if (this.clinicType === 'dentist') {
        this.messagePlaceholder = `Message ${this.referral.toClinicName}`;
      } else {
        if (this.selectedChannel === 'c2c') {
          this.messagePlaceholder = `Message ${this.referral.fromClinicName}`;
        } else {
          this.messagePlaceholder = `Message ${this.referral.patientFirstName} ${this.referral.patientLastName}`;
        }
      }
      this.togglePoll(false);
      this.togglePoll(true);
      this.messages = messages;
      this.messageChunks = this.mapMessages(messages);
    });
  }

  private mapMessages(messages: Message[]): MessageChunk[] {
    if (!messages || messages.length === 0) {
      return [];
    }

    let currentId = messages[0].userId;
    const messageIds = {};
    const messageChunks: MessageChunk[] = [];
    const mappedNames = this.mapNames();
    let messageChunk: MessageChunk = this.newMessageChunk(messages[0].timeStamp, mappedNames[currentId] ? mappedNames[currentId] : `${this.referral.patientFirstName} ${this.referral.patientLastName}`);

    messages.forEach(m => {
      messageIds[m.messageId] = m;

      if (currentId !== m.userId) {
        currentId = m.userId;
        messageChunks.push({ ...messageChunk });
        messageChunk = this.newMessageChunk(m.timeStamp, mappedNames[currentId] ? mappedNames[currentId] : `${this.referral.patientFirstName} ${this.referral.patientLastName}`);
        messageChunk.messageIds.push(m.messageId);
      } else {
        messageChunk.messageIds.push(m.messageId);
      }
    });
    this.conversation = messageIds;
    messageChunks.push(messageChunk);
    return messageChunks;
  }

  private mapNames(): any {
    const names = {};
    names[this.referral.fromEmail] = this.referral.fromClinicName;
    names[this.referral.toEmail] = this.referral.toClinicName;

    return names;
  }

  private newMessageChunk(timeStamp: number, name: string): MessageChunk {
    return {
      icon: undefined,
      header: { name, timeStamp },
      messageIds: []
    };
  }
}
