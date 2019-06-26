import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.userInfo.token) {
      request = request.clone({
        setHeaders: {
          companyID: `${currentUser.userInfo.companyID}`,
          Authorization: `Token ${currentUser.userInfo.token}`
        }
      });
    }

    return next.handle(request);
  }
}
