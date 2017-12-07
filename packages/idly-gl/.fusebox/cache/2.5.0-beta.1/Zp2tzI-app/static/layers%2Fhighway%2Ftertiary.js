module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar constants_1 = require(\"../../constants\");\nexports.default = [\n    {\n        selectable: true,\n        priority: 2,\n        layer: {\n            id: 'highwayTertiary',\n            type: 'line',\n            source: undefined,\n            layout: {\n                'line-join': 'round',\n                'line-cap': 'round'\n            },\n            paint: {\n                'line-color': '#FFF9B3',\n                'line-opacity': 0.85,\n                'line-width': 5\n            },\n            filter: [\n                'all',\n                [\n                    'in',\n                    constants_1.PLUGIN_NAME + \"--tagsClassType\",\n                    'tag-highway-tertiary',\n                    'tag-highway-tertiary_link'\n                ]\n            ]\n        }\n    },\n    {\n        selectable: true,\n        priority: -2,\n        layer: {\n            id: 'highwayTertiaryCasing',\n            type: 'line',\n            source: undefined,\n            layout: {\n                'line-join': 'round',\n                'line-cap': 'round'\n            },\n            paint: {\n                'line-color': '#70372f',\n                'line-opacity': 1,\n                'line-width': 10\n            },\n            filter: [\n                'all',\n                [\n                    'in',\n                    constants_1.PLUGIN_NAME + \"--tagsClassType\",\n                    'tag-highway-tertiary',\n                    'tag-highway-tertiary_link'\n                ]\n            ]\n        }\n    }\n];\n",
dependencies: ["../../constants"],
sourceMap: "{\"version\":3,\"file\":\"layers/highway/tertiary.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/layers/highway/tertiary.ts\"],\"names\":[],\"mappings\":\";;AAAA,+CAA8C;AAE9C,kBAAe;IACb;QACE,UAAU,EAAE,IAAI;QAChB,QAAQ,EAAE,CAAC;QACX,KAAK,EAAE;YACL,EAAE,EAAE,iBAAiB;YACrB,IAAI,EAAE,MAAM;YACZ,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,WAAW,EAAE,OAAO;gBACpB,UAAU,EAAE,OAAO;aACpB;YACD,KAAK,EAAE;gBACL,YAAY,EAAE,SAAS;gBACvB,cAAc,EAAE,IAAI;gBACpB,YAAY,EAAE,CAAC;aAChB;YACD,MAAM,EAAE;gBACN,KAAK;gBACL;oBACE,IAAI;oBACJ,GAAG,uBAAW,iBAAiB;oBAC/B,sBAAsB;oBACtB,2BAA2B;iBAC5B;aACF;SACF;KACF;IACD;QACE,UAAU,EAAE,IAAI;QAChB,QAAQ,EAAE,CAAC,CAAC;QACZ,KAAK,EAAE;YACL,EAAE,EAAE,uBAAuB;YAC3B,IAAI,EAAE,MAAM;YACZ,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,WAAW,EAAE,OAAO;gBACpB,UAAU,EAAE,OAAO;aACpB;YACD,KAAK,EAAE;gBACL,YAAY,EAAE,SAAS;gBACvB,cAAc,EAAE,CAAC;gBACjB,YAAY,EAAE,EAAE;aACjB;YACD,MAAM,EAAE;gBACN,KAAK;gBACL;oBACE,IAAI;oBACJ,GAAG,uBAAW,iBAAiB;oBAC/B,sBAAsB;oBACtB,2BAA2B;iBAC5B;aACF;SACF;KACF;CACF,CAAC\",\"sourcesContent\":[\"import { PLUGIN_NAME } from '../../constants';\\n\\nexport default [\\n  {\\n    selectable: true,\\n    priority: 2,\\n    layer: {\\n      id: 'highwayTertiary',\\n      type: 'line',\\n      source: undefined,\\n      layout: {\\n        'line-join': 'round',\\n        'line-cap': 'round'\\n      },\\n      paint: {\\n        'line-color': '#FFF9B3',\\n        'line-opacity': 0.85,\\n        'line-width': 5\\n      },\\n      filter: [\\n        'all',\\n        [\\n          'in',\\n          `${PLUGIN_NAME}--tagsClassType`,\\n          'tag-highway-tertiary',\\n          'tag-highway-tertiary_link'\\n        ]\\n      ]\\n    }\\n  },\\n  {\\n    selectable: true,\\n    priority: -2,\\n    layer: {\\n      id: 'highwayTertiaryCasing',\\n      type: 'line',\\n      source: undefined,\\n      layout: {\\n        'line-join': 'round',\\n        'line-cap': 'round'\\n      },\\n      paint: {\\n        'line-color': '#70372f',\\n        'line-opacity': 1,\\n        'line-width': 10\\n      },\\n      filter: [\\n        'all',\\n        [\\n          'in',\\n          `${PLUGIN_NAME}--tagsClassType`,\\n          'tag-highway-tertiary',\\n          'tag-highway-tertiary_link'\\n        ]\\n      ]\\n    }\\n  }\\n];\\n\"]}",
headerContent: undefined,
mtime: 1512123511000,
devLibsRequired : undefined,
_ : {}
}