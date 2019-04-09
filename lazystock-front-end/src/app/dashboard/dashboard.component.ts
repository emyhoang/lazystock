import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.route.navigate(['/login']);
    }
    
  }

}
