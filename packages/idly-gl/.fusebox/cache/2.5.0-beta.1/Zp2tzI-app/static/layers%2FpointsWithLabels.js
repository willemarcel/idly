module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar constants_1 = require(\"../constants\");\nexports.default = [\n    {\n        selectable: true,\n        priority: 3,\n        layer: {\n            minzoom: 17,\n            id: 'PointsWithLabelsLayer',\n            type: 'symbol',\n            source: undefined,\n            layout: {\n                'icon-image': \"{\" + constants_1.PLUGIN_NAME + \"--icon}-11\",\n                'icon-allow-overlap': true,\n                'text-field': \"{\" + constants_1.PLUGIN_NAME + \"--name}\",\n                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],\n                'text-size': 12,\n                'text-transform': 'uppercase',\n                'text-letter-spacing': 0.05,\n                'text-offset': [0, 1.5],\n                'text-optional': true,\n                'text-anchor': 'top',\n                'text-allow-overlap': false\n            },\n            paint: {\n                'text-halo-color': '#ffffff',\n                'text-halo-width': 1.5,\n                'text-halo-blur': 0.5\n            },\n            filter: [\n                'all',\n                ['has', constants_1.PLUGIN_NAME + \"--icon\"],\n                ['==', '$type', 'Point'],\n                ['!in', constants_1.PLUGIN_NAME + \"--geometry\", 'vertex'] // OsmGeometry.VERTEX\n            ]\n        }\n    }\n];\n",
dependencies: ["../constants"],
sourceMap: "{\"version\":3,\"file\":\"layers/pointsWithLabels.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/layers/pointsWithLabels.ts\"],\"names\":[],\"mappings\":\";;AAAA,4CAA2C;AAE3C,kBAAe;IACb;QACE,UAAU,EAAE,IAAI;QAChB,QAAQ,EAAE,CAAC;QACX,KAAK,EAAE;YACL,OAAO,EAAE,EAAE;YACX,EAAE,EAAE,uBAAuB;YAC3B,IAAI,EAAE,QAAQ;YACd,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,YAAY,EAAE,IAAI,uBAAW,YAAY;gBACzC,oBAAoB,EAAE,IAAI;gBAC1B,YAAY,EAAE,IAAI,uBAAW,SAAS;gBACtC,WAAW,EAAE,CAAC,gBAAgB,EAAE,uBAAuB,CAAC;gBACxD,WAAW,EAAE,EAAE;gBACf,gBAAgB,EAAE,WAAW;gBAC7B,qBAAqB,EAAE,IAAI;gBAC3B,aAAa,EAAE,CAAC,CAAC,EAAE,GAAG,CAAC;gBACvB,eAAe,EAAE,IAAI;gBACrB,aAAa,EAAE,KAAK;gBACpB,oBAAoB,EAAE,KAAK;aAC5B;YACD,KAAK,EAAE;gBACL,iBAAiB,EAAE,SAAS;gBAC5B,iBAAiB,EAAE,GAAG;gBACtB,gBAAgB,EAAE,GAAG;aACtB;YACD,MAAM,EAAE;gBACN,KAAK;gBACL,CAAC,KAAK,EAAE,GAAG,uBAAW,QAAQ,CAAC;gBAC/B,CAAC,IAAI,EAAE,OAAO,EAAE,OAAO,CAAC;gBACxB,CAAC,KAAK,EAAE,GAAG,uBAAW,YAAY,EAAE,QAAQ,CAAC,CAAC,qBAAqB;aACpE;SACF;KACF;CACF,CAAC\",\"sourcesContent\":[\"import { PLUGIN_NAME } from '../constants';\\n\\nexport default [\\n  {\\n    selectable: true,\\n    priority: 3,\\n    layer: {\\n      minzoom: 17,\\n      id: 'PointsWithLabelsLayer',\\n      type: 'symbol',\\n      source: undefined,\\n      layout: {\\n        'icon-image': `{${PLUGIN_NAME}--icon}-11`,\\n        'icon-allow-overlap': true,\\n        'text-field': `{${PLUGIN_NAME}--name}`,\\n        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],\\n        'text-size': 12,\\n        'text-transform': 'uppercase',\\n        'text-letter-spacing': 0.05,\\n        'text-offset': [0, 1.5],\\n        'text-optional': true,\\n        'text-anchor': 'top',\\n        'text-allow-overlap': false\\n      },\\n      paint: {\\n        'text-halo-color': '#ffffff',\\n        'text-halo-width': 1.5,\\n        'text-halo-blur': 0.5\\n      },\\n      filter: [\\n        'all',\\n        ['has', `${PLUGIN_NAME}--icon`],\\n        ['==', '$type', 'Point'],\\n        ['!in', `${PLUGIN_NAME}--geometry`, 'vertex'] // OsmGeometry.VERTEX\\n      ]\\n    }\\n  }\\n];\\n\"]}",
headerContent: undefined,
mtime: 1512127010000,
devLibsRequired : undefined,
_ : {}
}
