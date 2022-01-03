import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { PostsComponent } from "./posts/posts.component";
import { PostPageComponent } from "./posts/post-page/post-page.component"
import { LoginComponent } from "./auth/login/login.component";
import { CreatePageComponent } from "./posts/create-page/create-page.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";

const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', component: PostsComponent},
    {path: 'post/:id', component: PostPageComponent },
    {path: 'login', component: LoginComponent},
    {path: 'create', component: CreatePageComponent},
    { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
