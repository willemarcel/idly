import { setCreate } from '../helper';
import { tableGet } from '../table/regular';
import {
  ancestorProperFind,
  QuadkeysTable,
  quadkeysTableAdd,
  quadkeysTableFindRelated,
  removeAllDescendants,
} from './quadkeysTable';

const mapFromObj = (o: any): QuadkeysTable =>
  Object.keys(o).reduce((prev, k) => {
    prev.set(k, o[k]);
    return prev;
  }, new Map());

const dummyQuadkeyT = (obj: any) => mapFromObj(obj);
// tslint:disable:object-literal-key-quotes

describe('removeAllDescendants', () => {
  const parse = (obj: any, r: any) => {
    const t = mapFromObj(obj);
    removeAllDescendants(t, r);
    return [...t.keys()].sort();
  };

  const expected = (obj: any, removed: string[]) =>
    Object.keys(obj)
      .filter(r => removed.indexOf(r) === -1)
      .sort();
  it('should remove all related', () => {
    const obj = {
      '': setCreate(),
      '12': setCreate(),
      '123': setCreate(),
      '2': setCreate(),
      '210': setCreate(),
      '212': setCreate(),
      '213': setCreate(),
      '3123': setCreate(),
    };

    expect(parse(obj, '1')).toEqual(expected(obj, ['123', '12']));
  });

  it('should not remove self', () => {
    const obj = {
      '': setCreate(),
      '12': setCreate(),
      '123': setCreate(),
      '2': setCreate(),
      '210': setCreate(),
      '212': setCreate(),
      '213': setCreate(),
      '3123': setCreate(),
    };
    expect(parse(obj, '123')).toEqual(expected(obj, []));
  });

  it('should not remove neighbours', () => {
    const obj = {
      '': setCreate(),
      '12': setCreate(),
      '123': setCreate(),
      '2': setCreate(),
      '210': setCreate(),
      '212': setCreate(),
      '2120': setCreate(),
      '21201': setCreate(),
      '213': setCreate(),
      '2130': setCreate(),
      '21301': setCreate(),
      '3123': setCreate(),
    };
    expect(parse(obj, '212')).toEqual(expected(obj, ['2120', '21201']));
  });

  it('should remove everything when removing root', () => {
    const obj = {
      '': setCreate(),
      '12': setCreate(),
      '123': setCreate(),
      '2': setCreate(),
      '210': setCreate(),
      '212': setCreate(),
      '2120': setCreate(),
      '21201': setCreate(),
      '213': setCreate(),
      '2130': setCreate(),
      '21301': setCreate(),
      '3123': setCreate(),
    };
    expect(parse(obj, '')).toEqual(
      expected(obj, [
        '12',
        '123',
        '2',
        '210',
        '212',
        '2120',
        '21201',
        '213',
        '2130',
        '21301',
        '3123',
      ])
    );
  });
});

describe('findAncestor', () => {
  it('should return any one of the ancestors ', () => {
    const table = mapFromObj({
      '': setCreate(),
      '12': setCreate(),
      '123': setCreate(),
      '210': setCreate(),
      '212': setCreate(),
      '2120': setCreate(),
      '21201': setCreate(),
      '213': setCreate(),
      '2130': setCreate(),
      '21301': setCreate(),
      '3123': setCreate(),
    });
    expect(ancestorProperFind(table, '2120121201')).toEqual('212');
  });
  it('should not return empty string as ancestor', () => {
    const table = mapFromObj({
      '': setCreate(),
    });
    expect(ancestorProperFind(table, '2120121201')).toEqual(undefined);
  });
});

describe('quadkeysTableAdd', () => {
  it('should work', () => {
    const t = dummyQuadkeyT({
      '01': setCreate(['n1']),
      '21': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3'], '3');
    expect(t).toEqual(
      dummyQuadkeyT({
        '01': setCreate(['n1']),
        '21': setCreate(['n2']),
        '3': setCreate(['n3']),
      })
    );
  });

  it('should remove any descendant', () => {
    const t = dummyQuadkeyT({
      '01': setCreate(['n1']),
      '21': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3', 'n1'], '0');
    expect(t).toEqual(
      dummyQuadkeyT({
        '0': setCreate(['n3', 'n1']),
        '21': setCreate(['n2']),
      })
    );
  });

  it('should not remove sibbling', () => {
    const t = dummyQuadkeyT({
      '01': setCreate(['n1']),
      '02': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3', 'n1'], '03');
    expect(t).toEqual(
      dummyQuadkeyT({
        '01': setCreate(['n1']),
        '02': setCreate(['n2']),
        '03': setCreate(['n3', 'n1']),
      })
    );
  });

  it('should not change anything if ancestor exists', () => {
    const t = dummyQuadkeyT({
      '01': setCreate(['n1']),
      '02': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3', 'n1', 'n4'], '020');
    expect(t).toEqual(
      dummyQuadkeyT({
        '01': setCreate(['n1']),
        '02': setCreate(['n2']),
      })
    );
  });

  it('should replace the current virgin entities in the existing same quadkey', () => {
    const t = dummyQuadkeyT({
      '': setCreate(),
      '01': setCreate(['n1']),
      '02': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3', 'n1'], '02');
    expect(t).toEqual(
      dummyQuadkeyT({
        '': setCreate(),
        '01': setCreate(['n1']),
        '02': setCreate(['n3', 'n1']),
      })
    );
  });
  it('should handle global quadkey used for modified entities', () => {
    const t = dummyQuadkeyT({
      '01': setCreate(['n1']),
      '02': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n3#0', 'n1#0'], '');
    expect(t).toEqual(
      dummyQuadkeyT({
        '': setCreate(['n3#0', 'n1#0']),
        '01': setCreate(['n1']),
        '02': setCreate(['n2']),
      })
    );
  });

  it('should insert modified entities to already exist root quadkey', () => {
    const t = dummyQuadkeyT({
      '': setCreate(['n3#0', 'n1#0']),
      '01': setCreate(['n1']),
      '02': setCreate(['n2']),
    });
    quadkeysTableAdd(t, ['n1#1'], '');
    expect(t).toEqual(
      dummyQuadkeyT({
        '': setCreate(['n3#0', 'n1#0', 'n1#1']),
        '01': setCreate(['n1']),
        '02': setCreate(['n2']),
      })
    );
  });
});

describe('quadkeysTableFindVirginIds', () => {
  it('should return empty for root quadkey as it only stores modified Ids', () => {
    const t = dummyQuadkeyT({
      '': setCreate(['n1#0']),
      '21': setCreate(['n2']),
      '3': setCreate(['n3']),
    });
    expect(quadkeysTableFindRelated(t, [''])).toEqual(setCreate());
    expect(tableGet('', t)).toEqual(setCreate(['n1#0']));
  });

  it('should return virgin Ids ', () => {
    const t = dummyQuadkeyT({
      '': setCreate(),
      '12': setCreate(['n1', 'n2', 'n5', 'n4', 'n3']),
      '210': setCreate(['r1', 'n6']),
      '212': setCreate(['r2', 'n7']),
    });
    expect(quadkeysTableFindRelated(t, ['21'])).toEqual(
      setCreate(['r1', 'n6', 'r2', 'n7'])
    );
    expect(quadkeysTableFindRelated(t, ['12'])).toEqual(
      setCreate(['n1', 'n2', 'n5', 'n4', 'n3'])
    );
  });
});
