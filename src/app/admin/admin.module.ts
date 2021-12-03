import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PostNewPostService } from "./shared/services/post-new-post.service";
import { SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginComponent,
    CreatePageComponent,
    FeedPageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginComponent},
          {path: 'feed', component: FeedPageComponent},
          {path: 'create', component: CreatePageComponent},
          {path: 'post/:id/edit', component: EditPageComponent},
        ]
      }
    ]),
    SharedModule,
    RouterModule
  ],
  exports: [RouterModule],
  providers: [PostNewPostService]
})
export class AdminModule {

}


