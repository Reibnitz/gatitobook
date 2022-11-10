import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this._tokenService.possuiToken() == true) {
        const token = this._tokenService.retornarToken();
        const headers = new HttpHeaders().append('Bearer:', token);
        request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
