import {Injectable} from '@angular/core';
import * as Geolocation from 'nativescript-geolocation';
import {getCurrentLocation} from 'nativescript-geolocation';

@Injectable()
export class LocationService {

    geolocation: any;

    constructor() {
        this.geolocation = {
            latitude: 0,
            longitude: 0
        };
        this.enableLocationTap();
    }

    private enableLocationTap() {
        console.log('enableLocationTap');
        Geolocation.isEnabled().then(function (isEnabled) {
            console.log('Geolocation.isEnabled-????');
            if (!isEnabled) {
                console.log('Geolocation.isEnabled----->true');

                Geolocation.enableLocationRequest().then(function () {
                }, function (e) {
                    console.log('Error: ' + (e.message || e));
                });
            }
        }, function (e) {
            console.log('Error: ' + (e.message || e));
        });
    }


    public getGeoLocation(): any {
        console.log('getGeoLocation');
        return getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000});
    }
}
