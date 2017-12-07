import { PLUGIN_NAME } from '../../constants';

export default [
  {
    selectable: true,
    priority: 2,
    layer: {
      id: 'highwayUnclassified',
      type: 'line',
      source: undefined,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#dcd9b9',
        'line-opacity': 0.85,
        'line-width': 4
      },
      filter: [
        'all',
        ['in', `${PLUGIN_NAME}--tagsClassType`, 'tag-highway-unclassified']
      ]
    }
  }
];