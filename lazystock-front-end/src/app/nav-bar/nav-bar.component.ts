import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as moment from 'moment';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentDate = moment();
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
