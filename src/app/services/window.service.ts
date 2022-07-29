import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { WindowAction, WindowState, WindowType } from "../resources";

@Injectable({
    providedIn: "root"
})
export class WindowService {

    private windowAction = new Subject<{action: WindowAction, type: WindowType} | null>();
    private windows = new BehaviorSubject<{type: WindowType, state: WindowState}[]>([]);

    constructor() { }

    get windows$() {

        return this.windows.asObservable();
    }

    get windowAction$() {

        return this.windowAction.asObservable();
    }

    get windowsArray(): {type: WindowType, state: WindowState}[] {

        return this.windows.getValue();
    }

    subscribeToWindows(callback: (windows: {type: WindowType, state: WindowState}[]) => void) {

        this.windows.subscribe(windows => {

            callback(windows);
        });
    }

    addWindow(windowType: WindowType) {

        const windows = this.windows.getValue();

        if (windows.map((win) => win.type).includes(windowType)) return;

        windows.push({type: windowType, state: WindowState.MAXIMIZED});

        this.windows.next(windows);
    }

    removeWindow(type: WindowType) {

        const windows = this.windows.getValue();

        const idx = windows.map((win) => win.type).indexOf(type);

        if (idx === -1) return;

        windows.splice(idx, 1);

        this.windows.next(windows);

        this.windowAction.next({action: WindowAction.CLOSE, type});
    }

    subscribeToWindowAction(callback: (action: {action: WindowAction, type: WindowType}) => void) {

        this.windowAction.subscribe(action => {

            if (!action) return;

            callback(action);
        });
    }

    toggleMinimize(type: WindowType) {

        const windows = this.windows.getValue();

        const idx = windows.map((win) => win.type).indexOf(type);

        if (idx === -1) return;

        windows[idx].state = windows[idx].state === WindowState.MINIMIZED ? WindowState.MAXIMIZED : WindowState.MINIMIZED;

        this.windows.next(windows);

        this.windowAction.next({action: WindowAction.MINIMIZE, type});
    }
}