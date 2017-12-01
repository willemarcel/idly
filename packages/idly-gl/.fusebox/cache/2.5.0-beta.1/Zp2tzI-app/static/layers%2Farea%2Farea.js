module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar constants_1 = require(\"../../constants\");\nvar helper_1 = require(\"./helper\");\nexports.default = [\n    {\n        selectable: false,\n        priority: 0.1,\n        layer: {\n            id: 'AreaLayer',\n            type: 'line',\n            source: undefined,\n            layout: {\n                'line-join': 'round',\n                'line-cap': 'round'\n            },\n            paint: {\n                'line-color': '#551A8B',\n                'line-width': 2,\n                'line-opacity': 1\n            },\n            filter: [\n                'all',\n                ['==', '$type', 'Polygon'],\n                /**\n                 * @REVISIT buildings or any small really look ugly with that gl offset artifact\n                 *  going for a fill layer for now.\n                 */\n                ['!=', constants_1.PLUGIN_NAME + \"--tagsClass\", 'tag-building']\n            ]\n        }\n    },\n    {\n        selectable: false,\n        priority: 0.1,\n        layer: {\n            id: 'AreaLayerCasing',\n            type: 'line',\n            source: undefined,\n            layout: {\n                'line-join': 'round',\n                'line-cap': 'round'\n            },\n            paint: helper_1.areaPaintStyle,\n            filter: [\n                'all',\n                ['==', '$type', 'Polygon'],\n                ['!=', constants_1.PLUGIN_NAME + \"--tagsClass\", 'tag-building']\n            ]\n        }\n    }\n];\n",
dependencies: ["../../constants","./helper"],
sourceMap: "{\"version\":3,\"file\":\"layers/area/area.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/layers/area/area.ts\"],\"names\":[],\"mappings\":\";;AAAA,+CAA8C;AAC9C,qCAA0C;AAE1C,kBAAe;IACb;QACE,UAAU,EAAE,KAAK;QACjB,QAAQ,EAAE,GAAG;QACb,KAAK,EAAE;YACL,EAAE,EAAE,WAAW;YACf,IAAI,EAAE,MAAM;YACZ,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,WAAW,EAAE,OAAO;gBACpB,UAAU,EAAE,OAAO;aACpB;YACD,KAAK,EAAE;gBACL,YAAY,EAAE,SAAS;gBACvB,YAAY,EAAE,CAAC;gBACf,cAAc,EAAE,CAAC;aAClB;YACD,MAAM,EAAE;gBACN,KAAK;gBACL,CAAC,IAAI,EAAE,OAAO,EAAE,SAAS,CAAC;gBAC1B;;;mBAGG;gBACH,CAAC,IAAI,EAAE,GAAG,uBAAW,aAAa,EAAE,cAAc,CAAC;aACpD;SACF;KACF;IACD;QACE,UAAU,EAAE,KAAK;QACjB,QAAQ,EAAE,GAAG;QACb,KAAK,EAAE;YACL,EAAE,EAAE,iBAAiB;YACrB,IAAI,EAAE,MAAM;YACZ,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,WAAW,EAAE,OAAO;gBACpB,UAAU,EAAE,OAAO;aACpB;YACD,KAAK,EAAE,uBAAc;YACrB,MAAM,EAAE;gBACN,KAAK;gBACL,CAAC,IAAI,EAAE,OAAO,EAAE,SAAS,CAAC;gBAC1B,CAAC,IAAI,EAAE,GAAG,uBAAW,aAAa,EAAE,cAAc,CAAC;aACpD;SACF;KACF;CACF,CAAC\",\"sourcesContent\":[\"import { PLUGIN_NAME } from '../../constants';\\nimport { areaPaintStyle } from './helper';\\n\\nexport default [\\n  {\\n    selectable: false,\\n    priority: 0.1,\\n    layer: {\\n      id: 'AreaLayer',\\n      type: 'line',\\n      source: undefined,\\n      layout: {\\n        'line-join': 'round',\\n        'line-cap': 'round'\\n      },\\n      paint: {\\n        'line-color': '#551A8B',\\n        'line-width': 2,\\n        'line-opacity': 1\\n      },\\n      filter: [\\n        'all',\\n        ['==', '$type', 'Polygon'],\\n        /**\\n         * @REVISIT buildings or any small really look ugly with that gl offset artifact\\n         *  going for a fill layer for now.\\n         */\\n        ['!=', `${PLUGIN_NAME}--tagsClass`, 'tag-building']\\n      ]\\n    }\\n  },\\n  {\\n    selectable: false,\\n    priority: 0.1,\\n    layer: {\\n      id: 'AreaLayerCasing',\\n      type: 'line',\\n      source: undefined,\\n      layout: {\\n        'line-join': 'round',\\n        'line-cap': 'round'\\n      },\\n      paint: areaPaintStyle,\\n      filter: [\\n        'all',\\n        ['==', '$type', 'Polygon'],\\n        ['!=', `${PLUGIN_NAME}--tagsClass`, 'tag-building']\\n      ]\\n    }\\n  }\\n];\\n\"]}",
headerContent: undefined,
mtime: 1512124245000,
devLibsRequired : undefined,
_ : {}
}
