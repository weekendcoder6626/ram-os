import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowState, WindowType } from '../resources';
import { WindowService } from '../services/window.service';

const assetsFolder = '../../assets/icons/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('inOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('out => in', animate('0.9s')),
      transition('in => out', animate('0.8s')),
    ]),
  ]
})
export class HomeComponent implements AfterViewInit {
  
  states = WindowState;

  bootSubject = new BehaviorSubject<boolean>(false);
  boot$: Observable<boolean> = this.bootSubject.asObservable();

  get boot(): boolean {

    return this.bootSubject.value;
  }

  set boot(value: boolean) {

    this.bootSubject.next(value);
  }

  bootState: 'in' | 'out' = 'out';
  homeState: 'in' | 'out' = 'out';

  windows$!: Observable<{type: WindowType, state: WindowState}[]>;

  windows: {
    title: string,
    type: WindowType,
    iconPath: string,
    exists: boolean,
  }[] = [
    {
      title: 'Recycling Bin',
      type: WindowType.RECYCLING_BIN,
      exists: false,
      iconPath: assetsFolder + 'recycle-bin.svg'
    },
    {
      title: 'About Me',
      type: WindowType.ABOUT_ME,
      exists: false,
      iconPath: assetsFolder + 'about-me.svg'
    },
    {
      title: 'About Work',
      type: WindowType.ABOUT_WORK,
      exists: false,
      iconPath: assetsFolder + 'about-work.svg'
    },
    {
      title: 'Hire Me',
      type: WindowType.HIRE_ME,
      exists: false,
      iconPath: assetsFolder + 'hire-me.svg'
    },
    {
      title: 'Contact Me',
      type: WindowType.CONTACT_ME,
      exists: false,
      iconPath: assetsFolder + 'contact-me.svg'
    },
    {
      title: 'Command Prompt',
      type: WindowType.COMMAND_PROMPT,
      exists: false,
      iconPath: assetsFolder + 'cmd.svg'
    },
  ]

  constructor(private windowService: WindowService) { 

    this.windows$ = this.windowService.windows$;
  }

  ngAfterViewInit(): void {
      
    if(!this.boot) {

      this.homeState = 'in';
    }
  }

  deskEnd(e: any) {

    console.log(
      'deskEnd',
    );
    // if(e.fromState === 'void') {

    //   this.homeState = 'out';
    // }
  }

  bootEnd(e: any) {

    if(e.fromState === 'void') {

      this.bootState = 'in';

      setTimeout(() => {
        this.bootState = 'out';
      }, 2000)
      // this.boot = false;
    } else if(e.fromState === 'in') {

      console.log('bootEnd');
      this.boot = false;
      this.homeState = 'in';
    }
  }

  iconPath(windowType: WindowType) {

    return this.windows.find(w => w.type === windowType)!.iconPath;
  }

  title(windowType: WindowType) {

    return this.windows.find(w => w.type === windowType)!.title;
  }

  windowDetails(window: {type: WindowType, state: WindowState}) {

    return {
      title: this.windows.find(w => w.type === window.type)!.title,
      type: window.type,
    }
  }

  createWindow(windowType: WindowType) {

    this.windowService.addWindow(windowType);
  }
  
  onMinimize(windowType: WindowType) {
    console.log(windowType);
    this.windowService.toggleMinimize(windowType);
  }

}
