import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { LoginComponent } from './login.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	declarations: [LoginComponent],
	exports: [LoginComponent]
})
export class LoginModule {
}
