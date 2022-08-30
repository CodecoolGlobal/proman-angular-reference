import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;
  public user?: firebase.User;
  public loggedIn: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  private firebaseAuthChangeListener(user: firebase.User | null) {
    this.user = user || undefined;
    this.loggedIn = this.user !== undefined ;
    console.log('auth state changed', user, this.loggedIn);
  }

  ngOnInit(): void {
    this.subscription = this.angularFireAuth.authState.subscribe(user => {
      this.firebaseAuthChangeListener(user);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public logout() {
    this.angularFireAuth.signOut().then(result => {
      console.log('logged out', result);
    });
  }

  public isAdmin(): boolean {
    return true;
  }
}

