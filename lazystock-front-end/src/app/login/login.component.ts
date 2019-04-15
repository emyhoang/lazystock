import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.loginForm.value).subscribe(() => {
      this.route.navigate(['/'])
    }, (err) => {
      console.log(err)
    }
    ); 
  }

}
