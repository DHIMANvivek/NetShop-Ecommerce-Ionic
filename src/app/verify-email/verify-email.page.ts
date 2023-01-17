import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor(
    public authService: AuthServiceService
  ) { }
  ngOnInit() {
  }

  
}
