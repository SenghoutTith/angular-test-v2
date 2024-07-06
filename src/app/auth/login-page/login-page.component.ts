import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface User{
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ DividerModule, ButtonModule, InputTextModule, FormsModule ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],

})
export class LoginPageComponent {


  @Input() user: User = {
    username: '',
    password: ''
  }

  @Output() newUser = new EventEmitter<string>();

  login() {
    alert("Username: " + this.user.username + ' \nPassword: ' + this.user.password);
  }

  ngOnChanges(){
    if(this.user.username.length > 0 && this.user.password.length > 0){
      this.newUser.emit('User has been changed!');
    }else{
      this.newUser.emit('User has not been changed!');
    }
  }

}
