import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgSelect2Module } from "ngSelect2";

import { AppComponent } from "./app.component";
import { FormulaComponent } from "./demos/formula/formula.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ExampleTowComponent } from "./demos/example-tow/example-tow.component";

@NgModule({
  declarations: [AppComponent, FormulaComponent, ExampleTowComponent],
  imports: [BrowserModule, FormsModule, NgbModule, NgSelect2Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
