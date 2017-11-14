import { weakCache } from '../misc/weakCache';
import { nodeFactory } from './nodeFactory';
import { relationFactory } from './relationFactory';
import { Entity, EntityType, Node, Relation, Way } from './structures';
import { wayFactory } from './wayFactory';

export let entityToString = (entity: any): string => {
  let toStringify;
  // get a stable object, needed to remove the
  // possibility of unordered object keys.Which is
  // needed for json.stringify equality/caching
  switch (entity.type) {
    case EntityType.NODE: {
      toStringify = nodeFactory(entity, false);
      break;
    }
    case EntityType.WAY: {
      toStringify = wayFactory(entity, false);
      break;
    }
    case EntityType.RELATION: {
      toStringify = relationFactory(entity, false);
      break;
    }
  }
  return JSON.stringify(toStringify);
};

// don't use this is you dont know what you are doing
export let unsafeEntityToString = (entity: Entity): string =>
  JSON.stringify(entity);