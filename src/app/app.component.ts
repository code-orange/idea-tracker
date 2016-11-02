import { Component } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	authState = null;
	authChecking = true;

	constructor(private af: AngularFire) {
		af.auth.subscribe((state: FirebaseAuthState) => {
			this.authState = state;
			this.authChecking = false;
		});
	}

	get authenticated(): boolean {
		return this.authState !== null;
	}
}
