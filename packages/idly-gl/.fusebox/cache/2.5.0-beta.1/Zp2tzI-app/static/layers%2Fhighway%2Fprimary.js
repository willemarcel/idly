module.exports = { contents: "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar constants_1 = require(\"../../constants\");\nexports.default = [\n    {\n        selectable: true,\n        priority: 2,\n        layer: {\n            id: 'highwayPrimary',\n            type: 'line',\n            source: undefined,\n            layout: {\n                'line-join': 'round',\n                'line-cap': 'round'\n            },\n            paint: {\n                'line-color': '#F99806',\n                'line-opacity': 1,\n                'line-width': 6\n            },\n            filter: [\n                'all',\n                [\n                    'in',\n                    constants_1.PLUGIN_NAME + \"--tagsClassType\",\n                    'tag-highway-primary',\n                    'tag-highway-primary_link'\n                ]\n            ]\n        }\n    }\n];\n",
dependencies: ["../../constants"],
sourceMap: "{\"version\":3,\"file\":\"layers/highway/primary.js\",\"sourceRoot\":\"\",\"sources\":[\"/src/layers/highway/primary.ts\"],\"names\":[],\"mappings\":\";;AAAA,+CAA8C;AAE9C,kBAAe;IACb;QACE,UAAU,EAAE,IAAI;QAChB,QAAQ,EAAE,CAAC;QACX,KAAK,EAAE;YACL,EAAE,EAAE,gBAAgB;YACpB,IAAI,EAAE,MAAM;YACZ,MAAM,EAAE,SAAS;YACjB,MAAM,EAAE;gBACN,WAAW,EAAE,OAAO;gBACpB,UAAU,EAAE,OAAO;aACpB;YACD,KAAK,EAAE;gBACL,YAAY,EAAE,SAAS;gBACvB,cAAc,EAAE,CAAC;gBACjB,YAAY,EAAE,CAAC;aAChB;YACD,MAAM,EAAE;gBACN,KAAK;gBACL;oBACE,IAAI;oBACJ,GAAG,uBAAW,iBAAiB;oBAC/B,qBAAqB;oBACrB,0BAA0B;iBAC3B;aACF;SACF;KACF;CACF,CAAC\",\"sourcesContent\":[\"import { PLUGIN_NAME } from '../../constants';\\n\\nexport default [\\n  {\\n    selectable: true,\\n    priority: 2,\\n    layer: {\\n      id: 'highwayPrimary',\\n      type: 'line',\\n      source: undefined,\\n      layout: {\\n        'line-join': 'round',\\n        'line-cap': 'round'\\n      },\\n      paint: {\\n        'line-color': '#F99806',\\n        'line-opacity': 1,\\n        'line-width': 6\\n      },\\n      filter: [\\n        'all',\\n        [\\n          'in',\\n          `${PLUGIN_NAME}--tagsClassType`,\\n          'tag-highway-primary',\\n          'tag-highway-primary_link'\\n        ]\\n      ]\\n    }\\n  }\\n];\\n\"]}",
headerContent: undefined,
mtime: 1512123475000,
devLibsRequired : undefined,
_ : {}
}