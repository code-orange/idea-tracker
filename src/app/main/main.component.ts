import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

/**
 * The MainComponent is a light-weight router
 */
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent {

	constructor(private location:Location) {
	}

	isOverview() {
		return this.location.path() === '';
	}

	get ideaName() {
		return this.location.path().substr(1);
	}
}
