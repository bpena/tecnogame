import { Slide } from './../../models/slide';
import { Router } from '@angular/router';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { timer, Subscriber, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-board',
    templateUrl: './board.page.html',
    styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
    _timer = timer(1000, 1000);
    _subscribe: Subscription;
    _time: number = 300;
    time: number = 300;
    stopped = true;
    showingResult = false;

    slide: Slide;

    badCounter: number = 0;
    goodCounter: number = 0;
    validWords: string[] = [];

    constructor(private mainService: MainService, private router: Router) { }

    ngOnInit() {
        this.mainService.config.subscribe(configValues => {
            this._time = configValues.sessionTime;
            this.time = configValues.sessionTime;
        });
        this.mainService.image.subscribe(slide => {
            this.slide = slide;
            if (isNullOrUndefined(this.slide.text)) {
                this.endGame();
            }
        });
    }

    private endGame() {
        this.validWords = this.mainService.validWords;
        this.stopTimer();
        this.showingResult = true;
        this.mainService.restartWords();
    }

    private startTimer() {
        this.time = this._time;
        this.stopped = false;
        this.goodCounter = 0;
        this.showingResult = false;
        this.validWords = [];
        this.nextSlide();
        this._subscribe = this._timer.subscribe(() => this.tick());
    }

    private stopTimer() {
        this.stopped = true;
        if (!isNullOrUndefined(this._subscribe)) {
            this._subscribe.unsubscribe();
        }
    }

    private tick() {
        this.time--;
        if (this.time === 0) {
            this.endGame();
        }
    }

    onGood() {
        this.goodCounter++;
        this.mainService.validAnswer();
        this.nextSlide();
    }

    onBad() {
        this.badCounter++;
        this.nextSlide();
    }

    private nextSlide() {
        this.mainService.updateSlide();
    }

    openConfig() {
        this.stopTimer();
        this.router.navigateByUrl('/config');
    }
}
