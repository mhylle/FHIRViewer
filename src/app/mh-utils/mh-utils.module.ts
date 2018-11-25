import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepeatPipe} from './repeat.pipe';

@NgModule({
  declarations: [RepeatPipe],
  imports: [
    CommonModule
  ],
  exports: [RepeatPipe]
})
export class MhUtilsModule {
}
