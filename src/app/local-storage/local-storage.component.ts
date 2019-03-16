import {Component, OnInit} from '@angular/core';
import {StorageService} from '../service/storage.service';
import {ObservableArray} from 'tns-core-modules/data/observable-array';
import {UserData} from '../user-data';

@Component({
    selector: 'app-local-storage',
    templateUrl: './local-storage.component.html',
    styleUrls: ['./local-storage.component.css']
})
export class LocalStorageComponent implements OnInit {
    private userData: UserData[];


    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.userData = [];
        const storedUserData = this.storage.getItem('userData');
        if (storedUserData) {
            this.userData = JSON.parse(storedUserData);
        }
    }

}
