import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Tweet} from '../tweet';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TwitterService {

    constructor(private http: HttpClient) {
    }

    media(b64content: any): Observable<Tweet> {

        const req = {
            b64content: b64content
        };

        console.log('posting');
        return this.http.post<Tweet>(`${environment.server}/api/my/media`, req);
    }


    home(since?: string) {
        const params = `?since=${since}`;
        return this.http.get<TwitterResponse>(`${environment.server}/api/my/search` + params);
    }


}

export interface TwitterResponse {
    data: any;
    resp: any;
}
