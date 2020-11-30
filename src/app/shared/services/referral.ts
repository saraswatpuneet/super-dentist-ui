export interface ReferralDetails {
  patient: Patient;
  status?: Status;
  reasons?: string[];
  comments?: Comment[];
  history?: string[];
  tooth?: string[];
  fromAddressId?: string;
  toAddressId?: string;
  toPlaceId?: string;
}

export interface Comment {
  chatBox?: string;
  comment: string;
  createdBy?: string;
  time?: string;
}

export interface Status {
  gdStatus: string;
  spStatus: string;
}

export interface Patient {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export const comments = [
  { message: 'Do you know the song?', user: 'me', date: '' },
  { message: 'The Teenage Mutant Ninja Turtles?', user: '', date: '' },
  { message: 'Yea', user: 'me', date: '' },
  {
    message: `They're the world's most fearsome fighting team (We're really hip!)
  They're heroes in a half-shell and they're green (Hey - get a grip!)
  When the evil Shredder attacks`, user: '', date: ''
  },
  {
    message: `These Turtle boys don't cut him no slack!
  Teenage Mutant Ninja Turtles
  Teenage Mutant Ninja Turtles`, user: 'me', date: ''
  },
  {
    message: `Splinter taught them to be ninja teens (He's a radical rat!)
  Leonardo leads, Donatello does machines (That's a fact, Jack!)
  Raphael is cool but crude (Gimme a break!)
  Michaelangelo is a party dude (Party!)`, user: '', date: ''
  },
  { message: 'HAHAH', user: 'me', date: '' },
  { message: 'Right on man!!!', user: 'me', date: '' },
];
