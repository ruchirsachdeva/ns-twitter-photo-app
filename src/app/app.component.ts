import {Component, OnInit} from '@angular/core';
import {ToastService} from './service/messaging/toast.service';
import {LocationService} from './service/geo-location/location.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ToastService, LocationService],  // shared services for web and native

})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }


}
