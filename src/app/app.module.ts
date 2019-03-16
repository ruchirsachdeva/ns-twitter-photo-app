import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LocationService} from './service/geo-location/location.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastService} from './service/messaging/toast.service';
import { MapComponent } from './map/map.component';
import {StorageService} from './service/storage.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MapComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
    ],
    providers: [LocationService, ToastService, StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
