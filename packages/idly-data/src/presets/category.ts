import _clone from 'lodash-es/clone';
import _keys from 'lodash-es/keys';
import _omit from 'lodash-es/omit';

import { t as stubT } from './t';

import { presetCollection } from './collection';

export function presetCategory(id, category, all, t = stubT) {
  category = _clone(category);

  category.id = id;

  category.members = presetCollection(
    category.members.map(function(id) {
      return all.item(id);
    })
  );

  category.matchGeometry = function(geometry) {
    return category.geometry.indexOf(geometry) >= 0;
  };

  category.matchScore = function() {
    return -1;
  };

  category.name = function() {
    return t('presets.categories.' + id + '.name', { default: id });
  };

  category.terms = function() {
    return [];
  };

  return category;
}
