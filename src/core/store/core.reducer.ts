import { Map, Record, Set } from 'immutable';

import { Node } from 'osm/entities/node';
import { Graph, graphFactory } from 'osm/history/graph';
import {
  graphRemoveEntities,
  graphRemoveEntitiesWithId,
  graphSetEntities
} from 'osm/history/helpers';

import { Action } from 'common/actions';

import {
  addToModifiedEntities,
  addToVirginEntities,
  calculateParentWays,
  Entities,
  removeEntities
} from 'core/coreOperations';
import { CORE } from 'core/store/core.actions';
import { Entity } from 'osm/entities/entities';
import { getGeometry } from 'osm/entities/helpers/misc';
import { initAreaKeys, initPresets } from 'osm/presets/presets';

const initialState = {
  graph: graphFactory(),
  modifedGraph: graphFactory(),
  modifedEntities: Set(),
  entities: Set()
  // parentWays: Map()
};

export class CoreState extends Record(initialState) {
  public graph: Graph;
  public entities: Entities;
  public modifedEntities: Entities;
  public modifedGraph: Graph;

  // public parentWays: Map<string, Set<string>>;
  public set(k: string, v: any): CoreState {
    return super.set(k, v) as CoreState;
  }
}

const coreState = new CoreState();
const { collection } = initPresets();
const areaKeys = initAreaKeys(collection);
export function coreReducer(state = coreState, action: Action<any>) {
  switch (action.type) {
    case CORE.newData: {
      console.time(CORE.newData);
      let data: Entity[] = action.data;
      const parentWays = calculateParentWays(data);
      data = data.map(e => {
        return e.setIn(
          ['properties', 'geometry'],
          getGeometry(e, areaKeys, parentWays)
        ) as Entity;
      });
      const newState = state
        .update('graph', (graph: Graph) => graphSetEntities(graph, data))
        .update('entities', (entities: Entities) =>
          addToVirginEntities(entities, Set(data), state.modifedEntities, true)
        );
      console.timeEnd(CORE.newData);
      return newState;
    }
    case CORE.addModified: {
      console.time(CORE.addModified);
      const modifiedEntities: Entities = action.modifedEntities;
      const newState = state
        .update('modifedGraph', (modifedGraph: Graph) =>
          graphSetEntities(modifedGraph, modifiedEntities.toArray())
        )
        .update('modifedEntities', (modifedEntities: Entities) => {
          return addToModifiedEntities(modifedEntities, modifiedEntities);
        });
      console.timeEnd(CORE.addModified);
      return newState;
    }
    case CORE.removeIds: {
      const modifiedEntitiesId: Set<string> = action.modifedEntitiesId;
      if (modifiedEntitiesId.size === 0) return state;
      /**
       * @REVISIT not sure about
       * entities.subtrsct using state.graph.getIn(['node'
       * or the replacement removeEntities(entities, modifiedEntitiesId)
       */
      console.time(CORE.removeIds);
      const newState = state
        .update(
          'entities',
          (entities: Set<Node>) =>
            entities.subtract(
              modifiedEntitiesId.map(m => state.graph.getIn(['node', m]))
            )
          // removeEntities(entities, modifiedEntitiesId)
        )
        .update(
          'graph',
          (graph: Graph) =>
            graphRemoveEntitiesWithId(graph, modifiedEntitiesId.toArray())
          // removeEntities(entities, modifiedEntitiesId)
        )
        .update('modifedEntities', (entities: Set<Node>) =>
          removeEntities(entities, modifiedEntitiesId)
        );

      console.timeEnd(CORE.removeIds);
      return newState;
    }
    default:
      return state;
  }
}