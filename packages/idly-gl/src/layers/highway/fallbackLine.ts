import { HIGHWAY } from '../priorities';

export default [
  {
    selectable: true,
    priority: HIGHWAY.MINUS_2,
    layer: {
      id: 'FallbackLineLayer',
      source: undefined,
      type: 'line',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#eee',
        'line-width': 2,
      },
      filter: ['all', ['==', '$type', 'LineString']],
    },
  },
];