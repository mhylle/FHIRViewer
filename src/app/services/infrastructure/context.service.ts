import {Injectable} from '@angular/core';
import {User} from '../../core/login/user';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  private selectedResource: string;
  private selectedUser: User;
  private resource = new Subject<string>();
  private user = new Subject<User>();
  resourceChanged = this.resource.asObservable();
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
