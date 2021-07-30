import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { count } from 'rxjs-compat/operator/count';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  count = 1;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  increment() {
    console.log('hi' + this.count);
    this.count++;
    this.countChanged.emit(this.count);
  }
  decrement() {
    this.count--;
    this.countChanged.emit(this.count);
  }

}
