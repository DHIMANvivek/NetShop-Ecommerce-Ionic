import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  constructor(public authService: AuthServiceService) {}
  ngOnInit() {}
}
