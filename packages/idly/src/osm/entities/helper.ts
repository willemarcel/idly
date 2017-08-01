import { Map } from 'immutable';

import { Entity } from 'osm/entities/entities';
import { Node } from 'osm/entities/node';
import { Relation } from 'osm/entities/relation';
import { Way } from 'osm/entities/way';

// export const POINT = 'point';
// export const VERTEX = 'vertex';
// export const AREA = 'area';
// export const LINE = 'line';
// export const RELATION = 'relation';

// type POINT = 'point';
export enum Geometries {
  POINT = 'point',
  VERTEX = 'vertex',
  AREA = 'area',
  LINE = 'line',
  RELATION = 'relation'
}

export function getGeometry(entity: Entity): Geometries {
  if (entity instanceof Node) {
    return isPoi(entity) ? Geometries.POINT : Geometries.VERTEX;
  } else if (entity instanceof Way) {
    return isArea(entity) ? Geometries.AREA : Geometries.LINE;
  } else if (entity instanceof Relation) {
    return isMultipolygon(entity) ? Geometries.AREA : Geometries.RELATION;
  } else {
    throw new Error('unknown type of entity');
  }
}

function isPoi(entity: Node) {
  return true;
}

function isArea(
  entity: Way,
  areaKeys: Map<string, Map<string, boolean>> = Map()
) {
  if (entity.tags.get('area') === 'yes') return true;
  if (!isClosed(entity) || entity.tags.get('area') === 'no') return false;
  const keys = entity.tags.keySeq();
  let found = false;
  entity.tags.forEach((v, key) => {
    if (areaKeys.has(key) && !areaKeys.get(key).has(v)) {
      found = true;
      return false;
    }
  });
  return found;
}

function isMultipolygon(entity: Relation) {
  return false;
}

export function isOnAddressLine(entity: Entity) {
  return false;
  //   return resolver.transient(this, 'isOnAddressLine', function() {
  //     return (
  //       resolver.parentWays(this).filter(function(parent) {
  //         return (
  //           parent.tags.hasOwnProperty('addr:interpolation') &&
  //           parent.geometry(resolver) === 'line'
  //         );
  //       }).length > 0
  //     );
  //   });
}

function isClosed(entity: Entity) {
  return false;
}