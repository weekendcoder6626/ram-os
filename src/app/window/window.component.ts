import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { WindowAction, WindowType } from '../resources';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '400px',
        width: '700px',
      })),
      state('closed', style({
        height: '0px',
        width: '0px',
      })),
      transition('open => closed', animate('0.1s')),
      transition('closed => open', animate('0.08s')),
    ]),
  ]
})
export class WindowComponent implements AfterViewInit, AfterContentInit{
  
  @Input() windowDetails: {title: string, type: WindowType} = {title: '', type: WindowType.ABOUT_ME};
  
  @ViewChild('winroot') window!: any;
  @ViewChild('transbox') transbox!: any;

  initTransitionState: 'open' | 'closed' = 'closed';

  transitionState: 'open' | 'closed' = 'closed';
 
  constructor(private windowService: WindowService) { }

  get title(): string {

    return this.windowDetails.title;
  }

  ngAfterContentInit(): void {
    
  }
  ngAfterViewInit(): void {
      
    this.windowService.subscribeToWindowAction((data) => {

      if(data.type !== this.windowDetails.type) return;

      switch(data.action) {

        case WindowAction.MINIMIZE: {
          this.onToggleMinimize();
          break;
        }
      }
    
    });
  }

  initiateTransition() {


    this.transbox.nativeElement.classList.remove('minimized');

    if(this.initTransitionState === 'closed') {

      // this.window.nativeElement.classList.remove('minimized');
      this.transitionState = 'open';
    
    } else {  

      // this.window.nativeElement.classList.add('minimized');
      this.transitionState = 'closed';
    }

  }

  onTransitionEnd(event: any) {

    if(event.fromState === 'void') {

      this.initiateTransition();
      return;
    }

    if(this.initTransitionState === 'closed' && event.fromState === 'closed') {

      this.transbox.nativeElement.classList.add('minimized');
      this.window.nativeElement.classList.remove('minimized');
      console.log(this.window.nativeElement.classList);

    } else if(this.initTransitionState === 'open' && event.fromState === 'open') {

      this.transbox.nativeElement.classList.add('minimized');
      this.window.nativeElement.classList.add('minimized');
    }
  }

  onClose() {

    this.windowService.removeWindow(this.windowDetails.type);
  }

  onToggleMinimizeClick() {

    this.windowService.toggleMinimize(this.windowDetails.type);
  }

  onToggleMinimize() {


    if(!this.window) return;

    if (!this.window.nativeElement.classList.contains('minimized')) {

      this.window.nativeElement.classList.add('minimized');
      this.initTransitionState = 'open';
      this.initiateTransition();

    } else {

      // this.window.nativeElement.classList.remove('minimized');
      this.initTransitionState = 'closed';
      this.initiateTransition();
    }
  
  }

}
