import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
	selector: 'app-newdialog',
	templateUrl: './newdialog.component.html',
	styleUrls: ['./newdialog.component.less']
})
export class NewDialog {
	name = '';

	constructor(public dialogRef:MdDialogRef<NewDialog>) {}

	submit () {
		this.dialogRef.close(this.name);
	}
}
