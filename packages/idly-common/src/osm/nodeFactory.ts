import { deepFreeze } from '../misc/deepFreeze';
import { attributesGen } from '../osm/attributesGen';
import { genLngLat } from '../osm/genLngLat';
import {
  Attributes,
  EntityId,
  EntityType,
  LngLat,
  Node,
  Tags
} from '../osm/structures';
import { tagsFactory } from './tagsFactory';

export function nodeFactory({
  id,
  tags = tagsFactory([]),
  loc = genLngLat([0, 0]),
  attributes = attributesGen({})
}: {
  id: EntityId;
  tags?: Tags;
  loc?: LngLat;
  attributes?: Attributes;
}): Node {
  return deepFreeze<Node>({
    id,
    tags,
    type: EntityType.NODE,
    loc,
    attributes
  });
}
