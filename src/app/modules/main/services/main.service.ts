import { Config } from './../models/config';
import { Slide } from '../models/slide';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    private currentImage: number;
    private currentWord: number;
    private currentSlide: Slide;
    private images: string[] = [
        "assets/img/card-saopaolo.png",
        "assets/img/card-amsterdam.png",
        "assets/img/card-sf.png",
        "assets/img/card-madison.png"
    ];
    private configValues: Config = {
        sessionTime: 300,
        slideQty: 25,
        words: `São Paulo
Amsterdam
San Francisco
Madison`
    }
    private words: string[];
    private _validWords: string[];

    private image$: BehaviorSubject<Slide>;
    private config$: BehaviorSubject<Config>;

    constructor() {
        this._validWords = [];
        this.currentImage = 0;
        this.currentWord = 0;

        this.restartWords();
        this.currentSlide = { url: this.images[this.currentImage], text: this.words[this.currentWord] }
        
        this.image$ = new BehaviorSubject<Slide>(this.currentSlide);
        this.config$ = new BehaviorSubject<Config>(this.configValues);
    }

    restartWords() {
        this.words = this.configValues.words.split(/[\n|,]+/);
    }

    get validWords() {
        return this._validWords;
    } 

    get image() {
        return this.image$;
    }

    updateSlide() {
        this.currentImage = this.currentImage < this.images.length - 1 ? this.currentImage + 1 : 0;
        this.currentWord = this.currentWord < this.words.length - 1 ? this.currentWord + 1 : 0;
        this.currentSlide = { url: this.images[this.currentImage], text: this.words[this.currentWord] }
        this.image$.next(this.currentSlide); 
    }

    validAnswer() {
        this._validWords.push(this.currentSlide.text);
        this.words.splice(this.currentWord, 1);
    }

    get config() {
        return this.config$;
    }

    updateConfigValues(configValues: Config) {
        this.configValues = configValues;
        this.restartWords();
        this.config$.next(this.configValues);
    }
}
