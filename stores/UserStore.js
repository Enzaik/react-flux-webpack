// ListStore.js
import {EventEmitter} from 'events';
import _ from 'lodash';

let UserStore = _.extend({}, EventEmitter.prototype, {

  // Mock default data
  items: [ 
    {
      name: 'Ernesto',
      id: 0
    },
    { 
      name: 'Alejandro',
      id: 1
    }
  ],

  // Get all items
  getUsers: function(){
    return this.items;
  },

  // Add item
  addUser: function(new_item){
    this.items.push(new_item);
  },

  // Remove item
  removeUser: function(item_id){
    
    let items = this.items;
    
    _.remove(items,(item) => {
      return item_id == item.id;
    });
    
    this.items = items;

  },

  // Emit Change event
  emitChange: function(){
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback){
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

export default UserStore;
