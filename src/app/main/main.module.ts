import { NgModule, Inject, Optional } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy, PlatformLocation, CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { IdeaComponent } from './idea/idea.component';

function provideLocationStrategy(platformLocationStrategy:PlatformLocation, baseHref:string) {
	return new PathLocationStrategy(platformLocationStrategy, baseHref);
}

@NgModule({
	imports: [
		CommonModule,
		MaterialModule
	],
	declarations: [MainComponent, OverviewComponent, IdeaComponent],
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
