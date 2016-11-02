import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { MainModule } from './main/main.module';

const firebaseConfig = {
	apiKey: "AIzaSyAgAwLaXEV1D7q55en3Lx0slVEaPdTW7fM",
	authDomain: "idea-tracker-4f296.firebaseapp.com",
	databaseURL: "https://idea-tracker-4f296.firebaseio.com",
	storageBucket: ""
};

const firebaseAuthConfig = {
	provider: AuthProviders.Google,
	method: AuthMethods.Redirect
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
		LoginModule,
		MainModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
