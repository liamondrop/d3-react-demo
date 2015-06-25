import _ from 'underscore';
import Collection from 'ampersand-rest-collection';

export default Collection.extend({
  url: './public/models/data.json',

  getData(...keys) {
    if (keys.length) {
      return this.pick(...keys);
    } else {
      return this.serialize();
    }
  },

  pick(...keys) {
    return this.map(d => {
      return _.pick(d, 'date', ...keys); // always return the date prop
    });
  }
});
