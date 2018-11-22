import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard as AuthGuard } from './services/auth.guard';

import { PublicHomeComponent } from './components/public/public-home/public-home.component';
import { PageNotFoundComponent } from './components/public/page-not-found/page-not-found.component';

import { SignUpComponent } from './components/public/sign-up/sign-up.component';
import { SignInComponent } from './components/public/sign-in/sign-in.component';

import { WelcomeComponent } from './components/auth/welcome/welcome.component';

/**
import { WhoWeAreComponent } from './components/public/who-we-are/who-we-are.component';
import { WhatWeDoComponent } from './components/public/what-we-do/what-we-do.component';
import { ContactUsComponent } from './components/public/contact-us/contact-us.component';
*/

const routes: Routes = [

  { path: 'home',           component: PublicHomeComponent },
  { path: 'signup',         component: SignUpComponent  },
  { path: 'signin',         component: SignInComponent  },
//  { path: 'signout',        component: SignOutComponent  },
  { path: 'welcome',        component: WelcomeComponent, canActivate: [AuthGuard]  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',             component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule {}
