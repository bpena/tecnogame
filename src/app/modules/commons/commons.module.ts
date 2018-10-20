import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToTimePipe } from './pipes/seconds-to-time.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [SecondsToTimePipe],
    exports: [SecondsToTimePipe]
})
export class CommonsModule { }
