import { genLngLat } from 'structs/lngLat';
import { memberGen } from 'structs/members';
import { nodeFactory } from 'structs/node';
import { propertiesGen } from 'structs/properties';
import { relationFactory } from 'structs/relation';
import { wayFactory } from 'structs/way';
/**
 * @param parentWays mutates in place
 * @param ways
 */
export function calculateParentWays(parentWays, ways) {
    console.time('calculateParentWays');
    ways.forEach(w => w.nodes.forEach(nodeId => {
        const waySet = parentWays.get(nodeId);
        if (waySet)
            return waySet.add(w.id);
        parentWays.set(nodeId, new Set([w.id]));
    }));
    // const x = parentWays.forEach((way, nodeId) => {
    //   ways.forEach(w => {
    //     w.nodes.forEach((n, i) => {
    //       if (p.has(n)) return p.get(n).add(w.id);
    //       p.set(n, new Set());
    //     })
    //   })
    // })
    console.timeEnd('calculateParentWays');
    return parentWays;
}
const xmlIndex = process.env.NODE_ENV === 'test' ? 0 : 2;
export function parseXML(xml, parentWays = new Map()) {
    if (!xml || !xml.childNodes)
        return;
    const root = xml.childNodes[xmlIndex];
    const children = root.childNodes;
    const entities = [];
    const nodesXML = [];
    const waysXML = [];
    const relationsXML = [];
    const group = {
        node: [],
        way: [],
        relation: []
    };
    for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        const parser = group[child.nodeName];
        if (parser)
            group[child.nodeName].push(child);
    }
    group.relation = group.relation.map(parsers.relation);
    group.way = group.way.map(w => parsers.way(w));
    calculateParentWays(parentWays, group.way);
    group.node = group.node.map(n => parsers.node(n));
    return {
        entities: [...group.node, ...group.way, ...group.relation],
        parentWays
    };
}
function getVisible(attrs) {
    return (!attrs.getNamedItem('visible') ||
        attrs.getNamedItem('visible').value !== 'false');
}
function getMembers(obj) {
    const elems = obj.getElementsByTagName('member');
    const members = new Array(elems.length);
    for (let i = 0, l = elems.length; i < l; i++) {
        const attrs = elems[i].attributes;
        members[i] = memberGen({
            id: attrs.getNamedItem('type').value[0] + attrs.getNamedItem('ref').value,
            type: attrs.getNamedItem('type').value,
            role: attrs.getNamedItem('role').value
        });
    }
    return members;
}
function getNodes(obj) {
    const elems = obj.getElementsByTagName('nd');
    const nodes = new Array(elems.length);
    for (let i = 0, l = elems.length; i < l; i++) {
        nodes[i] = 'n' + elems[i].attributes.getNamedItem('ref').value;
    }
    return nodes;
}
function getTags(obj) {
    const elems = obj.getElementsByTagName('tag');
    const tags = new Map();
    for (let i = 0, l = elems.length; i < l; i++) {
        const attrs = elems[i].attributes;
        tags.set(attrs.getNamedItem('k').value, attrs.getNamedItem('v').value);
    }
    return tags;
}
function getLoc(attrs) {
    const lon = attrs.getNamedItem('lon') && attrs.getNamedItem('lon').value;
    const lat = attrs.getNamedItem('lat') && attrs.getNamedItem('lat').value;
    return genLngLat([parseFloat(lon), parseFloat(lat)]);
}
const parsers = {
    node: function nodeData(obj) {
        const attrs = obj.attributes;
        const id = 'n' + attrs.getNamedItem('id').value;
        return nodeFactory({
            id,
            properties: propertiesGen({
                visible: getVisible(attrs),
                version: attrs.getNamedItem('version').value,
                timestamp: attrs.getNamedItem('timestamp') &&
                    attrs.getNamedItem('timestamp').value,
                changeset: attrs.getNamedItem('changeset') &&
                    attrs.getNamedItem('changeset').value,
                uid: attrs.getNamedItem('uid') && attrs.getNamedItem('uid').value,
                user: attrs.getNamedItem('user') && attrs.getNamedItem('user').value
            }),
            loc: getLoc(attrs),
            tags: getTags(obj)
        });
    },
    way: function wayData(obj) {
        const attrs = obj.attributes;
        return wayFactory({
            id: 'w' + attrs.getNamedItem('id').value,
            properties: propertiesGen({
                visible: getVisible(attrs),
                version: attrs.getNamedItem('version').value,
                changeset: attrs.getNamedItem('changeset') &&
                    attrs.getNamedItem('changeset').value,
                timestamp: attrs.getNamedItem('timestamp') &&
                    attrs.getNamedItem('timestamp').value,
                user: attrs.getNamedItem('user') && attrs.getNamedItem('user').value,
                uid: attrs.getNamedItem('uid') && attrs.getNamedItem('uid').value
            }),
            tags: getTags(obj),
            nodes: getNodes(obj)
        });
    },
    relation: function relationData(obj) {
        const attrs = obj.attributes;
        return relationFactory({
            id: 'r' + attrs.getNamedItem('id').value,
            properties: propertiesGen({
                visible: getVisible(attrs),
                version: attrs.getNamedItem('version').value,
                changeset: attrs.getNamedItem('changeset') &&
                    attrs.getNamedItem('changeset').value,
                timestamp: attrs.getNamedItem('timestamp') &&
                    attrs.getNamedItem('timestamp').value,
                user: attrs.getNamedItem('user') && attrs.getNamedItem('user').value,
                uid: attrs.getNamedItem('uid') && attrs.getNamedItem('uid').value
            }),
            tags: getTags(obj),
            members: getMembers(obj)
        });
    }
};
//# sourceMappingURL=parser.js.map