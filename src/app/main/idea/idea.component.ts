import { Component, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
	selector: 'app-idea',
	templateUrl: './idea.component.html',
	styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnChanges {
	abstract;

	@Input('name')
	idea_name = '';

	af_idea: FirebaseObjectObservable<any>;

	idea = {
		name: '',
		target: '',
		description: '',
		businessmodel: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=',
		tiers: '',
		upsell: '',
		costs: ''
	};

	constructor(private af: AngularFire) {
	}

	ngOnChanges(changes:SimpleChanges): void{
		this.af_idea = this.af.database.object('/ideas/' + changes['idea_name'].currentValue);
		this.af_idea.subscribe((data) => {
			Object.keys(this.idea).forEach((k) => {
				if (!IdeaComponent.hasFocus(k)) {
					this.idea[k] = data[k];
				}
			});
		});
	}

	update (key: string, value: any) {
		let change = {};
		change[key] = value;
		this.af_idea.update(change);
	}

	fileAdded ($event) {
		let file: File = $event.target.files[0];
		let reader: FileReader = new FileReader();
		reader.onloadend = () => {
			this.update('businessmodel', reader.result);
		};
		reader.readAsDataURL(file);
	}

	static hasFocus (prop: string) {
		if (!document.activeElement.attributes.getNamedItem('prop')){
			return false;
		}
		return document.activeElement.attributes.getNamedItem('prop').value === prop;
	}
}
