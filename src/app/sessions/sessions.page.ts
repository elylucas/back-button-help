import { Component, OnInit } from '@angular/core';
import { Session, SessionGroup } from '../models/session';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit {
  sessions: Session[];
  sessionGroups: Observable<SessionGroup[]>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.sessionGroups = this.dataService.getGroupedSessions();
  }
}
