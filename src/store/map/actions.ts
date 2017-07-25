import { LngLatBounds } from 'mapbox-gl';
import { Entities } from 'osm/entities/entities';
import { action, Action } from 'store/actions';

export const OSM_TILES = {
  get: 'OSM_TILES.get',
  saveTile: 'OSM_TILES.saveTile'
};

export const MAP = {
  updateSources: 'Map.updateSources',
  hideEntities: 'Map.hideEntities'
};
export type GetOSMTilesAction = Action<{
  xys: number[][];
  zoom: number;
}>;

export type UpdateSourcesAction = Action<{
  dirtyMapAccess: (map: any) => void;
  data: Entities;
  sourceId: string;
}>;

export const getOSMTiles = (
  xys: number[][],
  zoom: number = 16
): GetOSMTilesAction => action(OSM_TILES.get, { xys, zoom });

export const updateSources = (
  data: Entities,
  dirtyMapAccess: (map: any) => void,
  sourceId: string
): UpdateSourcesAction =>
  action(MAP.updateSources, { data, dirtyMapAccess, sourceId });

export const hideEntities = (
  data: Entities,
  dirtyMapAccess: (map: any) => void,
  sourceId: string
): UpdateSourcesAction =>
  action(MAP.hideEntities, { data, dirtyMapAccess, sourceId });