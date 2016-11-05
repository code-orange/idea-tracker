import { Component, OnChanges, SimpleChanges, Input, ViewChild } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'app-idea',
	templateUrl: './idea.component.html',
	styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnChanges {
	abstract;

	@ViewChild('targetelem')
	targetelem;

	@Input('name')
	idea_name = '';

	idea: FirebaseObjectObservable<any>;

	constructor(private af: AngularFire) {
	}

	ngOnChanges(changes:SimpleChanges): void{
		this.idea = this.af.database.object('/ideas/' + changes['idea_name'].currentValue);
	}

	update (key: string, value: any) {
		let change = {};
		change[key] = value;
		this.idea.update(change);
	}

	fileAdded ($event) {
		let file: File = $event.target.files[0];
		let reader: FileReader = new FileReader();
		reader.onloadend = () => {
			this.update('businessmodel', reader.result);
		};
		reader.readAsDataURL(file);
	}
}
