export interface Session {
  id: number;
  title: string;
  speaker: string;
  speakerId: number;
  abstract: string;
  timeStart: string;
  timeEnd: string;
  room: string;
  roomId: number;
}

export interface SessionGroup {
  timeStart: string;
  sessions: Session[];
}
