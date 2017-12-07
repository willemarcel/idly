module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar constants_1 = require(\"../constants\");\nvar x = [\n    {\n        selectable: true,\n        priority: 3,\n        layer: {\n            minzoom: 17,\n            id: 'PointsWithoutLabelsLayer',\n            source: undefined,\n            type: 'circle',\n            layout: {},\n            paint: {\n                'circle-radius': 6,\n                'circle-color': '#eeeeee',\n                'circle-stroke-width': 0.5\n            },\n            filter: [\n                'all',\n                ['!has', constants_1.PLUGIN_NAME + \"--icon\"],\n                ['==', '$type', 'Point'],\n                /**\n                 * @REVISIT this vertex problem\n                 */\n                ['!in', constants_1.PLUGIN_NAME + \"--geometry\", 'vertex'] // OsmGeometry.VERTEX\n            ]\n        }\n    }\n];\n",
dependencies: ["../constants"],
sourceMap: "{\"version\":3,\"file\":\"layers/pointsWithoutLabel.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/layers/pointsWithoutLabel.ts\"],\"names\":[],\"mappings\":\";;AAAA,4CAA2C;AAE3C,IAAI,CAAC,GAAG;IACN;QACE,UAAU,EAAE,IAAI;QAChB,QAAQ,EAAE,CAAC;QACX,KAAK,EAAE;YACL,OAAO,EAAE,EAAE;YACX,EAAE,EAAE,0BAA0B;YAC9B,MAAM,EAAE,SAAS;YACjB,IAAI,EAAE,QAAQ;YACd,MAAM,EAAE,EAAE;YACV,KAAK,EAAE;gBACL,eAAe,EAAE,CAAC;gBAClB,cAAc,EAAE,SAAS;gBACzB,qBAAqB,EAAE,GAAG;aAC3B;YACD,MAAM,EAAE;gBACN,KAAK;gBACL,CAAC,MAAM,EAAE,GAAG,uBAAW,QAAQ,CAAC;gBAChC,CAAC,IAAI,EAAE,OAAO,EAAE,OAAO,CAAC;gBACxB;;mBAEG;gBACH,CAAC,KAAK,EAAE,GAAG,uBAAW,YAAY,EAAE,QAAQ,CAAC,CAAC,qBAAqB;aACpE;SACF;KACF;CACF,CAAC\",\"sourcesContent\":[\"import { PLUGIN_NAME } from '../constants';\\n\\nvar x = [\\n  {\\n    selectable: true,\\n    priority: 3,\\n    layer: {\\n      minzoom: 17,\\n      id: 'PointsWithoutLabelsLayer',\\n      source: undefined,\\n      type: 'circle',\\n      layout: {},\\n      paint: {\\n        'circle-radius': 6,\\n        'circle-color': '#eeeeee',\\n        'circle-stroke-width': 0.5\\n      },\\n      filter: [\\n        'all',\\n        ['!has', `${PLUGIN_NAME}--icon`],\\n        ['==', '$type', 'Point'],\\n        /**\\n         * @REVISIT this vertex problem\\n         */\\n        ['!in', `${PLUGIN_NAME}--geometry`, 'vertex'] // OsmGeometry.VERTEX\\n      ]\\n    }\\n  }\\n];\\n\"]}",
headerContent: undefined,
mtime: 1512130301000,
devLibsRequired : undefined,
_ : {}
}