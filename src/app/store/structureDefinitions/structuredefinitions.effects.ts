import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {
  AllResourcesLoaded,
  AllResourcesRequested,
  ResourceLoaded,
  ResourceRequested,
  StructureDefinitionActionTypes
} from './structureDefinitions.actions';
import {StructureDefinitionService} from '../../services/model/structure-definition.service';

import {allResourcesLoaded} from './structuredefinitions.selectors';


@Injectable()
export class StructureDefinitionsEffects {

  constructor(private store: Store<AppState>, private actions$: Actions, private structureDefinitionService: StructureDefinitionService) {
  }

  @Effect()
  loadResources$ = this.actions$
    .pipe(
      ofType<ResourceRequested>(StructureDefinitionActionTypes.ResourceRequested),
      mergeMap(action => this.structureDefinitionService.getStructure(action.payload.resource)),
      map(resource => new ResourceLoaded({resource}))
    );

  @Effect()
  loadAllResources$ = this.actions$
    .pipe(
      ofType<AllResourcesRequested>(StructureDefinitionActionTypes.AllResourcesRequested),
      withLatestFrom(this.store.pipe(select(allResourcesLoaded))),
      filter(([action, isAllResourcesLoaded]) => !isAllResourcesLoaded),
      mergeMap(() => this.structureDefinitionService.getAllStructures()),
      map(resources => new AllResourcesLoaded({resources}))
    );
}
