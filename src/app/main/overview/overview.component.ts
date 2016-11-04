import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

	constructor(private location: Location) {
	}

	go (idea: string) {
		this.location.go('/' + idea);
	}

}
