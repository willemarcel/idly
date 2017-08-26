import { attributesGen } from "../osm/attributesGen";
import { Attributes, EntityId, EntityType, Tags, Way } from "../osm/structures";

export function wayFactory({
  id,
  tags = new Map(),
  attributes = attributesGen({}),
  nodes = [],
}: {
  id: EntityId;
  tags?: Tags;
  attributes?: Attributes;
  nodes?: EntityId[];
}): Way {
  return {
    id,
    type: EntityType.WAY,
    tags,
    attributes,
    nodes,
  };
}