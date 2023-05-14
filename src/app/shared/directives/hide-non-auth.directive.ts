import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHideNonAuth]'
})
export class HideNonAuthDirective implements OnInit, OnDestroy {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AngularFireAuth
  ) { }

  authSub = new Subscription;
  @Input() appHideNonAuth = true;

  ngOnInit(): void {
    this.authSub = this.auth.authState.subscribe(user => {
      let authenticated = user ? true : false;
      this.showHide(authenticated);
    });
  }

  showHide(authenticated: boolean) {
    if ((authenticated && this.appHideNonAuth) || (!authenticated && !this.appHideNonAuth)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
