import {Component, ViewChild} from '@angular/core';
import {registerElement} from 'nativescript-angular/element-registry';
import {MapView, Marker, Position} from 'nativescript-google-maps-sdk';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage.service';
import {TwitterService} from '../service/twitter.service';
import {LocationService} from '../service/geo-location/location.service';


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})


export class MapComponent {

    latitude = -33.86;
    longitude = 151.20;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;

    lastCamera: String;


    constructor(private geoLocationService: LocationService) {
    }

    onMapReady(event) {
        this.geoLocationService.getGeoLocation().then(loc => {
            if (loc) {
                console.log('Current location is: ' + loc.latitude + ',' + loc.longitude);
                this.latitude = loc.latitude;
                this.longitude = loc.longitude;
                console.log('Map Ready');
            }
            this.mapView = event.object;

            console.log('Setting a marker...');

            const marker = new Marker();
            console.log(this.latitude);
            console.log(this.longitude);
            marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
            marker.title = 'Sydney';
            marker.snippet = 'Australia';
            marker.userData = {index: 1};
            this.mapView.addMarker(marker);

        });
    }

    onCoordinateTapped(args) {
        console.log('Coordinate Tapped, Lat: ' + args.position.latitude + ', Lon: ' + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log('Marker Event: ' + args.eventName
            + ' triggered on: ' + args.marker.title
            + ', Lat: ' + args.marker.position.latitude + ', Lon: ' + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log('Camera changed: ' + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log('Camera moving: ' + JSON.stringify(args.camera));
    }


}
