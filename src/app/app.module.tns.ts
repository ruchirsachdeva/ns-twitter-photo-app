import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
import {NativeScriptFormsModule} from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import {LocationService} from './service/geo-location/location.service.tns';
import {ToastService} from './service/messaging/toast.service.tns';
import { MapComponent } from './map/map.component';
import {StorageService} from './service/storage.service';
import * as mobileStorage from 'nativescript-localstorage';
import { LocalStorageComponent } from './local-storage/local-storage.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MapComponent,
        LocalStorageComponent,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    providers: [
        {
            provide: StorageService,
            useValue: mobileStorage
        },
        LocationService,
        ToastService,
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
