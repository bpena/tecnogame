import { MainService } from './../../services/main.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-config',
    templateUrl: 'config.page.html',
    styleUrls: ['config.page.scss'],
})
export class ConfigPage {
    config: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router,
        private mainService: MainService) {
        this.mainService.config.subscribe(values => {
            this.config = this.formBuilder.group({
                sessionTime: new FormControl(values.sessionTime, Validators.compose([
                    Validators.max(600),
                    Validators.min(10),
                    Validators.required
                ])),
                slideQty: new FormControl(values.slideQty, Validators.compose([
                    Validators.max(50),
                    Validators.min(5),
                    Validators.required
                ])),
                words: new FormControl(values.words, Validators.required)
            });
        })
    }

    startGame() {
        this.mainService.updateConfigValues(this.config.value);
        this.router.navigateByUrl('/board')
    }
}
