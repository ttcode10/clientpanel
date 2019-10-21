import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) { }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map(auth => {
      if(!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }))
  }
}