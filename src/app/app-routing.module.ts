import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JenkinsComponent } from './jenkins/jenkins.component';
import { AgtComponent } from './agt/agt.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/atg',
  pathMatch:'full'
}, {
  path:'atg',
  component: AgtComponent

}, {
  path:'jenkins',
  component: JenkinsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class Angular2DatatablesRoutingModule { }
