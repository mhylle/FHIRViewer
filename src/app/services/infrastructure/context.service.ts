import {Injectable} from '@angular/core';
import {User} from '../../core/login/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private selectedResource: string;
  private resource = new Subject<string>();
  resourceChanged = this.resource.asObservable();

  private selectedUser: User;
  private user = new Subject<User>();
  userChanged = this.user.asObservable();

  constructor() {
  }

  get currentResource(): string {
    return this.selectedResource;
  }

  set currentResource(value: string) {
    this.selectedResource = value;
    this.resource.next(value);
  }

  get currentUser(): User {
    return this.selectedUser;
  }

  set currentUser(value: User) {
    this.selectedUser = value;
    this.user.next(value);
  }
}
