import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../login/user';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {isDefined} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  public currentUser;
  public loginChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(environment.resourceServers[0] + '/login', {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        this.loginChanged.emit(isDefined(user ));
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loginChanged.emit(false);
    this.currentUserSubject.next(null);
  }
}
