import {Component} from '@angular/core';
import {AuthService} from './core/auth/auth.service';
import {Router} from '@angular/router';
import {User} from './core/login/user';
import {ConfigurationService} from './services/infrastructure/configuration.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  loggedIn: boolean;
  public theme: string;

  constructor(private router: Router, private configurationService: ConfigurationService, private authenticationService: AuthService) {
    this.theme = this.configurationService.currentTheme;
    this.configurationService.themeChanged.subscribe(theme => {
      console.log('setting theme to : ' + theme);
      this.theme = theme;
    });
    this.authenticationService.loginChanged.subscribe(value => {
      this.loggedIn = value;
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
