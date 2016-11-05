import { NgModule, Inject, Optional } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy, PlatformLocation, CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { SafePipe } from './overview/safepipe';
import { IdeaComponent } from './idea/idea.component';
import { HeaderComponent } from './header/header.component';
import { NewDialog } from './newdialog/newdialog.component';

function provideLocationStrategy(platformLocationStrategy:PlatformLocation, baseHref:string) {
	return new PathLocationStrategy(platformLocationStrategy, baseHref);
}

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		FormsModule
	],
	declarations: [MainComponent, OverviewComponent, IdeaComponent, HeaderComponent, NewDialog, SafePipe],
	entryComponents: [NewDialog],
	providers: [
		Location,
		{
			provide: LocationStrategy,
			useFactory: provideLocationStrategy,
			deps: [PlatformLocation, [new Inject(APP_BASE_HREF), new Optional()]]
		}
	],
	exports: [MainComponent]
})
export class MainModule {
}
