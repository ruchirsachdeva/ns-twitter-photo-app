import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tweet} from '../tweet';
import {ObservableArray} from 'tns-core-modules/data/observable-array';
import {Location} from '@angular/common';
import {TwitterService} from '../service/twitter.service';
import {LocationService} from '../service/geo-location/location.service';
import {ToastService} from '../service/messaging/toast.service';
import * as camera from 'nativescript-camera';
import * as imageModule from 'tns-core-modules/ui/image';
import {fromAsset} from 'tns-core-modules/image-source';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

    public input: any;
    inflight = false;
    tweets: Array<Tweet> = new Array();
    ids = [];
    timer;
    since = '';
    private myObservableArray: ObservableArray<String> = new ObservableArray();

    constructor(private location: Location, private authService: TwitterService, private geoLocationService: LocationService,
                private toast: ToastService) {
        this.input = {
            latitude: 0,
            longitude: 0
        };
        this.geoLocation();
    }


    ngOnInit() {
        this.getTweets();
        this.timer = setInterval(() => this.getTweets(), 61000);
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }


    getTweets() {
        this.myObservableArray = new ObservableArray();
        this.authService.home(this.since).subscribe(tweets => {
            tweets.data.forEach(tweet => {
                console.log(this.hasPhoto(tweet));
                if (this.hasPhoto(tweet)) {
                    console.log(JSON.stringify(tweet));
                }
                console.log('**************');
                if (this.ids.indexOf(tweet.id_str) < 0) {
                    this.ids.push(tweet.id_str);
                    this.tweets.unshift(tweet);
                }
                if (this.hasPhoto(tweet)) {
                    this.myObservableArray.push(this.getPhoto(tweet));
                }
            });
            this.since = this.tweets[0].id_str;
            this.cleanUp();

        });
    }

    cleanUp() {
        if (this.tweets.length > 1000) {
            this.tweets.splice(1000);
            this.ids.splice(1000);
        }
    }

    public hasPhoto(tweet: Tweet) {
        if (tweet.entities.media
            && tweet.entities.media.length
            && tweet.entities.media[0].type === 'photo') {
            return true;
        }
        return false;
    }

    public getPhoto(tweet: Tweet) {
        if (tweet.entities.media
            && tweet.entities.media.length
            && tweet.entities.media[0].type === 'photo') {
            return tweet.entities.media[0].media_url_https;
        }
        return null;
    }


    public photo() {
        this.photoPromise().then(res => {
            this.publish(res);
        });
    }

    private publish(base64) {
        console.log('base64');
        console.log(base64);
        this.authService.media(base64)
            .subscribe((response: Tweet) => {
                this.toast.showSuccess('Image successfully uploaded on twitter ', 'Upload successful');
                this.getTweets();
                console.log('data =  ' + response);
            });
    }

    private photoPromise() {
        const options = {width: 100, height: 100, keepAspectRatio: false};

        return new Promise(resolve => {
            camera.requestPermissions()
                .then(() => {
                    camera.takePicture(options)
                        .then(function (imageAsset) {
                            console.log('Result is an image asset instance');
                            const image = new imageModule.Image();
                            image.src = imageAsset;
// convert ImageAsset to ImageSource
                            fromAsset(imageAsset).then(res => {
                                const myImageSource = res;
                                resolve(myImageSource.toBase64String('jpeg', 100));
                            });

                        }).catch(function (err) {
                        console.log('Error -> ' + err.message);
                    });
                })
                .catch(e => {
                    console.log('Error requesting permission');
                });
        });
    }

    public geoLocation() {
        this.geoLocationService.getGeoLocation().then(loc => {
            if (loc) {
                console.log('Current location is: ' + loc.latitude + ',' + loc.longitude);
                this.input.latitude = loc.latitude;
                this.input.longitude = loc.longitude;
            }
        });
    }


    public goBack() {
        this.location.back();
    }
}
