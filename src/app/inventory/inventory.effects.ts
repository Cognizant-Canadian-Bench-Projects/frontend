import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { InventoryActions } from "./action-types";

@Injectable()
export class InventoryEffect {

    constructor(private actions$: Actions){}

}
