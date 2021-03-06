import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ServerGuard implements CanActivate {

  constructor(private router: Router, private configurationService: ConfigurationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.configurationService.selectedServer == null || this.configurationService.selectedServer === '') {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/selectServer']);
      return false;
    }
    return true;
  }
}
