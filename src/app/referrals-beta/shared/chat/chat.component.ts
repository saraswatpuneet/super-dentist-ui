import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { of, merge, timer, BehaviorSubject, forkJoin } from 'rxjs';
import { filter, switchMap, catchError, takeUntil, repeat, delay, tap, take } from 'rxjs/operators';

import { Referral, Message, Channel } from 'src/app/shared/services/referral';
import { Base } from 'src/app/shared/base/base-component';
import { ReferralService } from 'src/app/shared/services/referral.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

interface MessageChunk {
  icon: any;
  header: MessageHeader;
  messageIds: string[];
}

interface MessageHeader {
  name: string;
  timeStamp: number;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent extends Base implements OnInit {
  @Input() clinicType = '';
  @Output() filesUploaded = new EventEmitter<boolean>();
  @Output() closeChat = new EventEmitter();
  selectedChannel: Channel = 'c2c';
  messagePlaceholder = '';
  referral: Referral;
  messages: Message[];
  messageToSend = '';
  uploadingDocuments = false;
  conversation = {};
  messageChunks: MessageChunk[] = [];
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
    const index = this.messages.length - 1;

    this.referralService.createMessage(this.referralId, [message])
      .pipe(take(1))
      .subscribe(mes => this.messages[index] = mes);

    this.messageToSend = '';
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
        this.enterComment('Uploaded document(s)');
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
      delay(10000),
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
