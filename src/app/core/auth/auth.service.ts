import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {isDefined} from '@angular/compiler/src/util';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string>;

  public currentUser;
  public loginChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<string>(this.configurationService.selectedServer + '/platform/ws/auth/login',
      {
        'securityPrincipalId': username,
        'password': password,
        'role': 'Udvikler',
        'unit': '70.26.15.1',
        'createSession': true
      })
      .pipe(map(token => {
        if (token) {
          const assignedToken = JSON.stringify(token);
          localStorage.setItem('currentToken', assignedToken);
          this.currentUserSubject.next(token);
        }
        this.loginChanged.emit(isDefined(token));
        return token;
      }));
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.loginChanged.emit(false);
    this.currentUserSubject.next(null);
  }
}
