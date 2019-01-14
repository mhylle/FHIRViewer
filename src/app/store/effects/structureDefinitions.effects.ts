import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as structureDefinitionActions from '../actions/structureDefinition.action';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ResourceService} from '../../services/model/resource.service';


@Injectable()
export class StructureDefinitionsEffects {

  @Effect()
  loadStructureDefinitions$: Observable<Observable<any>> = this.actions$.pipe(
    ofType(structureDefinitionActions.LOAD_STRUCTURE_DEFINITIONS),
    mergeMap(() => this.resourceService.bundle.pipe(
      map((structureDefinitions) => new structureDefinitionActions.LoadStructureDefinitionsSuccessAction(structureDefinitions)
      )),
      catchError(() => of({type: 'retrieval of structureDefinitions failed'}))
    )
  );

  constructor(private resourceService: ResourceService,
              private actions$: Actions) {
  }
}
