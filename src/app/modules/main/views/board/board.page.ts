import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { timer, Subscriber, Subscription } from 'rxjs';

@Component({
    selector: 'app-board',
    templateUrl: './board.page.html',
    styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
    _timer = timer(1000, 1000);
    _subscribe: Subscription;
    time: number = 10;

    image: any;

    badCounter: number = 0;
    goodCounter: number = 0;

    constructor(private mainService: MainService) { }

    ngOnInit() {
        this.startTimer();
        this.mainService.image.subscribe(img => this.image = img);
    }

    private startTimer() {
        this.time = 10;
        this._subscribe = this._timer.subscribe(() => this.tick());
    }

    private stopTimer() {
        this._subscribe.unsubscribe();
    }

    private restartTimer() {
        this.stopTimer();
        this.startTimer();
    }

    private tick() {
        this.time--;
        if (this.time === 0) {
            this.time = 10;
            this.nextImage();
        }
    }

    onGood() {
        this.goodCounter++;
        this.nextImage();
        this.restartTimer();
    }

    onBad() {
        this.badCounter++;
        this.nextImage();
        this.restartTimer();
    }

    private nextImage() {
        this.mainService.updateImage();
    }
}
