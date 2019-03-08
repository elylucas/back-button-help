import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { groupBy, map, mergeMap, reduce } from 'rxjs/operators';
import { Session, SessionGroup } from '../models/session';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('assets/data/data.json');
  }

  getSessions(): Observable<Session[]> {
    return this.getData().pipe(map((data: any) => data.sessions));
  }

  getGroupedSessions(): Observable<SessionGroup[]> {
    return this.getSessions().pipe(
      mergeMap(x => from(x)),
      groupBy(p => p.timeStart),
      mergeMap(group =>
        group.pipe(reduce((acc: Session[] | string[], cur) => [...acc, cur], [group.key]))
      ),
      reduce((acc, cur) => [...acc, { timeStart: cur[0], sessions: cur.slice(1) }], [])
    );
  }

  getSession(id: number): Observable<Session> {
    return this.getSessions().pipe(map(sessions => sessions.find(s => s.id === id)));
  }
}
