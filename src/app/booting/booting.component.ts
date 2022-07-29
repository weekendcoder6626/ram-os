import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booting',
  templateUrl: './booting.component.html',
  styleUrls: ['./booting.component.css']
})
export class BootingComponent implements OnInit {

  value = 0;
  color = 'aqua';


  interval!: any;

  constructor() { }

  ngOnInit(): void {

    this.firstInterval()
  }

  firstInterval() {

    this.interval = setInterval(() => {
      if(this.value === 50) {
        this.clear();
        this.color='tomato';
        this.secondInterval();
      };
      this.value = this.value + 1;
    }, 10);

  }

  secondInterval() {

    this.interval = setInterval(() => {
      if(this.value === 60) {
        this.clear()
        setTimeout(() => {
          this.color='aqua';
          this.thirdInterval();
        }, 30)
        // this.thirdInterval();
      };
      this.value = this.value + 1;
    }, 60);
  }

  thirdInterval() {

    this.interval = setInterval(() => {
      if(this.value === 100) {
        this.clear()
      };
      this.value = this.value + 1;
    }, 10);
  }

  clear() {

    if(this.interval) clearInterval(this.interval);
  }

}
