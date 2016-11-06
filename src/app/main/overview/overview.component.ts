import { Component, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NewDialog } from '../newdialog/newdialog.component';

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.css']
})
export class OverviewComponent{
	loaded = false;
	emptyIdea = {
		"target": "Target audience",
		"description": "Description",
		"businessmodel": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADWSURBVHhe7dAxAQAwEAOh+rcVY7Xwt4ME3jiTFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZAWyAlmBrEBWICuQFcgKZJ1tH/NTSMi+0zktAAAAAElFTkSuQmCC",
		"tiers": "Available tiers",
		"upsell": "The upsell",
		"costs": "Costs",
		"name": ""
	};
	ideas: FirebaseListObservable<any[]>;
	dialogRef: MdDialogRef<NewDialog>;

	constructor(private location: Location,
				private af: AngularFire,
				public dialog: MdDialog,
				public viewContainerRef: ViewContainerRef) {
		this.ideas = af.database.list('/ideas');
		this.ideas.subscribe(() => {
			this.loaded = true;
		})
	}

	go (idea: string) {
		this.location.go('/' + idea);
	}

	createNew () {
		let config = new MdDialogConfig();
		config.viewContainerRef = this.viewContainerRef;

		this.dialogRef = this.dialog.open(NewDialog, config);

		this.dialogRef.afterClosed().subscribe(result => {
			if (result && result.length > 0) {
				let idea = Object.assign({}, this.emptyIdea, {name: result[0].toUpperCase() + result.slice(1)});
				// This looks kind of complicated but angularfire2 doesn't expose a list.add(key, value) function
				// What I'm doing here is resolving the underlying firebase library's reference to the list,
				// taking a child of that with my key, and setting the value to that
				// Note that this does overwrite if the key already exists
				this.ideas.$ref.ref.child(result).set(idea).then(() => {
					this.go(result);
				});
			}
			this.dialogRef = null;
		});
	}

	limitDescription (description: string) {
		if (description.length >= 450) {
			return description.substr(0, 450) + "…";
		}
		return description;
	}
}
