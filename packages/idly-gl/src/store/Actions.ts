import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GetDerived } from '../../../idly-worker/lib/operations/getDerived/type';
import { bindThis } from '../helpers/helpers';
import { LayerOpacity, layerOpacity } from '../helpers/layerOpacity';
import { MainTabs, RecursiveRecord, Store } from './index';
import { EntityType } from 'idly-common/lib/osm/structures';

export class Actions {
  private subject: BehaviorSubject<Store>;

  constructor(subject: BehaviorSubject<Store>) {
    this.subject = subject;
  }

  get store(): Store {
    return this.subject.getValue();
  }

  @bindThis
  public selectId(id = this.store.selectEntity.hoverId) {
    if (id === this.store.selectEntity.selectedId) {
      return;
    }
    this.subject.next({
      ...this.store,
      selectEntity: {
        ...this.store.selectEntity,
        selectedId: id,
      },
    });
  }

  @bindThis
  public modifyHoverId(id?: string) {
    if (id === this.store.selectEntity.hoverId) {
      return;
    }
    this.subject.next({
      ...this.store,
      selectEntity: { ...this.store.selectEntity, hoverId: id },
    });
  }

  @bindThis
  public modifyMainTab(mainTab: MainTabs) {
    this.subject.next({
      ...this.store,
      mainTab: { ...this.store.mainTab, active: mainTab },
    });
  }

  @bindThis
  public addEntityTree(derived?: GetDerived['response']['derived']) {
    if (!derived) {
      return;
    }

    const parentWays: RecursiveRecord = derived.parentWays.reduce(
      (prev, cur) => {
        prev[cur] = cur;
        return prev;
      },
      {} as RecursiveRecord
    );

    const parentRelations: RecursiveRecord = derived.parentRelations.reduce(
      (prev, cur) => {
        prev[cur] = cur;
        return prev;
      },
      {} as RecursiveRecord
    );
    const entity = derived.entity;

    let children: RecursiveRecord = {};
    if (entity.type === EntityType.RELATION) {
      children = entity.members.reduce(
        (prev, cur) => {
          prev[cur.id] = cur.id;
          return prev;
        },
        {} as RecursiveRecord
      );
    } else if (entity.type === EntityType.WAY) {
      children = entity.nodes.reduce(
        (prev, cur) => {
          prev[cur] = cur;
          return prev;
        },
        {} as RecursiveRecord
      );
    }

    this.subject.next({
      ...this.store,
      entityTree: {
        parentRelations,
        parentWays,
        entity: derived.entity,
        children,
      },
    });
  }

  public addEntityTreeExpand(
    id?: string,
    derived?: GetDerived['response']['derived'],
    parent?: RecursiveRecord
  ) {
    const entityTree = this.store.entityTree;

    if (!entityTree || !id || !parent || !parent[id]) {
      return;
    }
    if (!derived) {
      // signals not available
      parent[id] = undefined;
      this.subject.next({
        ...this.store,
        entityTree: {
          ...entityTree,
        },
      });
      return;
    }

    const parentWays: RecursiveRecord = derived.parentWays.reduce(
      (prev, cur) => {
        prev[cur] = cur;
        return prev;
      },
      {} as RecursiveRecord
    );

    const parentRelations: RecursiveRecord = derived.parentRelations.reduce(
      (prev, cur) => {
        prev[cur] = cur;
        return prev;
      },
      {} as RecursiveRecord
    );

    const entity = derived.entity;
    let children: RecursiveRecord = {};
    if (entity.type === EntityType.RELATION) {
      children = entity.members.reduce(
        (prev, cur) => {
          prev[cur.id] = cur.id;
          return prev;
        },
        {} as RecursiveRecord
      );
    } else if (entity.type === EntityType.WAY) {
      children = entity.nodes.reduce(
        (prev, cur) => {
          prev[cur] = cur;
          return prev;
        },
        {} as RecursiveRecord
      );
    }

    parent[id] = {
      children,
      parentRelations,
      parentWays,
      entity: derived.entity,
    };

    this.subject.next({
      ...this.store,
      entityTree: {
        ...entityTree,
      },
    });
  }

  public addEntityTreeCollapse(
    derived: GetDerived['response']['derived'],
    parent: RecursiveRecord
  ) {
    const entityTree = this.store.entityTree;

    if (!entityTree || !derived || !parent || !parent[derived.entity.id]) {
      return;
    }

    parent[derived.entity.id] = derived.entity.id;

    this.subject.next({
      ...this.store,
      entityTree: {
        ...entityTree,
      },
    });
  }

  @bindThis
  public modifyQuadkeys(d: Store['map']['quadkeys']) {
    if (d.every(q => this.store.map.quadkeys.indexOf(q) > -1)) {
      return;
    }
    this.subject.next({
      ...this.store,
      map: { ...this.store.map, quadkeys: d, loading: true },
    });
  }

  @bindThis
  public modifyFC(d: Store['map']['featureCollection']) {
    this.subject.next({
      ...this.store,
      map: { ...this.store.map, featureCollection: d, loading: false },
    });
  }

  @bindThis
  public modifyLayerHide(id: any) {
    if (!id) {
      return;
    }
    const layers = this.store.map.layers.map(
      // this includes the *-casing layers
      l => (l.layer.id.includes(id) ? { ...l, hide: !l.hide } : l)
    );

    this.subject.next({
      ...this.store,
      selectEntity: {
        ...this.store.selectEntity,
        hoverId: undefined,
        selectedId: undefined,
      },
      map: { ...this.store.map, layers },
    });
  }

  /**
   * BUG: When doing modifyLayeropacity & layerhide
   * the placeholder layers are removed and added again
   * hence all the stuff (hover, select..) in between these layers moves out (goes under)
   *
   * dirty fix remove any select ? hover
   */

  @bindThis
  public modifyLayerOpacity() {
    let next: LayerOpacity;
    const current = this.store.map.layerOpacity;

    if (current === LayerOpacity.High) {
      next = LayerOpacity.Medium;
    } else if (current === LayerOpacity.Medium) {
      next = LayerOpacity.Low;
    } else {
      next = LayerOpacity.High;
    }

    this.subject.next({
      ...this.store,
      selectEntity: {
        ...this.store.selectEntity,
        hoverId: undefined,
        selectedId: undefined,
      },
      map: {
        ...this.store.map,
        layerOpacity: next,
        layers: layerOpacity(
          next,
          this.store.map.layerOpacity,
          this.store.map.layers
        ),
      },
    });
  }
}