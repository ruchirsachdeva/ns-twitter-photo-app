import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {
    geolocation: any;

    constructor() {
        this.geolocation = {
            latitude: 0,
            longitude: 0
        };
    }


    getGeoLocation(): any {
        if (navigator.geolocation) {
            return new Promise(resolve => {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.geolocation.latitude = position.coords.latitude;
                    this.geolocation.longitude = position.coords.longitude;
                    resolve(this.geolocation);
                });
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
        return Promise.resolve(this.geolocation);
    }

}
