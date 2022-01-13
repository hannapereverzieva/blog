import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostPageComponent } from './posts/post-page/post-page.component';
import { LoginComponent } from './auth/login/login.component';
import { CreatePageComponent } from './posts/create-page/create-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: PostsComponent },
  { path: 'post/:id', component: PostPageComponent },
  { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit/:id', component: CreatePageComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
