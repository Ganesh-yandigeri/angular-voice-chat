import { Component, ViewChild } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'voice-rec';

  @ViewChild(CounterComponent) child: CounterComponent;

  increment() {
    this.child.increment();
  }

  decrement() {
    this.child.decrement();
  }
}
