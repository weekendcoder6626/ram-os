import { DragDropModule } from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgModule } from "@angular/core";

const mods = [
    DragDropModule,
    MatProgressSpinnerModule
]

@NgModule({
    imports: mods,
    exports: mods,
})
export class MaterialModule { }