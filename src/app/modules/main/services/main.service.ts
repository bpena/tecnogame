import { Image } from './../models/image';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private currentImage: number;
    private images: Image[] = [
        { url: "assets/img/card-saopaolo.png", text: "São Paulo" },
        { url: "assets/img/card-amsterdam.png", text: "Amsterdam" },
        { url: "assets/img/card-sf.png", text: "San Francisco" },
        { url: "assets/img/card-madison.png", text: "Madison" }
    ];

    private image$: BehaviorSubject<Image>;

    constructor() {
        this.currentImage = 0;
        this.image$ = new BehaviorSubject<Image>(this.images[this.currentImage]);
    }

    get image() {
        return this.image$;
    }

    updateImage() {
        this.currentImage = this.currentImage < this.images.length - 1 ? this.currentImage + 1 : 0;
        this.image$.next(this.images[this.currentImage]); 
    }
}
