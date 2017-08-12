import { fromJS } from 'immutable';

import { LayerSpec } from 'map/utils/layerFactory';
import { simpleLayerHOC } from 'map/utils/simpleLayer.hoc';

const displayName = (sourceName: string) => sourceName + 'highwaySecondary';

export const highwaySecondary = (sourceName: string) =>
  simpleLayerHOC({
    displayName: displayName(sourceName),
    selectable: true,
    layer: LayerSpec({
      priority: 2,
      id: displayName(sourceName),
      type: 'line',
      source: sourceName,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#F3F312',
        'line-opacity': 0.85,
        'line-width': 5
      },
      filter: fromJS([
        'all',
        [
          'in',
          'tagsClassType',
          'tag-highway-secondary',
          'tag-highway-secondary_link'
        ]
      ])
    })
  });