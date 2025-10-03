import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { TeacherComponent } from './teacher-component/teacher-component';

const routes: Routes = [
    {path: '',        component: HomeComponent},
    {path: 'teacher', component: TeacherComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
