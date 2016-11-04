import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
	selector: 'app-idea',
	templateUrl: './idea.component.html',
	styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnChanges {
	abstract;

	@Input('name')
	idea_name = '';

	constructor() {
	}

	ngOnChanges(changes:SimpleChanges):void {
		// Reload
		console.log(changes['idea_name'].currentValue);
	}
}
