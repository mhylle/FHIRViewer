import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.authService.currentUserValue;
    if (currentToken) {
      req = req.clone({
        setHeaders: {
          Authorization: '${currentToken}',
          HTTP2_HEADER_ACCESS_CONTROL_ALLOW_ORIGIN: 'clud-13783-t70',
          HTTP2_HEADER_ACCESS_CONTROL_ALLOW_METHODS: 'GET, POST',
          HTTP2_HEADER_ACCESS_CONTROL_ALLOW_HEADERS: 'X-Requested-With, content-type, Authorization',
          HTTP2_HEADER_ACCESS_CONTROL_ALLOW_Credentials: 'true'
        }
      });
    }
    return next.handle(req);
  }

}
