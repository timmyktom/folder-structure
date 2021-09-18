import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NodeComponent } from './node/node.component';
import { AddNodeComponent } from './add-node/add-node.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    AddNodeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
