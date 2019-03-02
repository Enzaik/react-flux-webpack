// AppRoot.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ListStore from '../stores/ListStore';
import UserStore from '../stores/UserStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

// Sub components
import NewItemForm from './NewItemForm.jsx';
import NewItemFormtst from './NewItemFormtst.jsx';
// Method to retrieve state from Stores
let getListState = () => {
  return {
    items: ListStore.getItems()
  }; 
}

class AppRoot extends React.Component {
  
  // Method to setState based upon Store changes
  _onChange() {
    this.setState(getListState());
  }

  constructor() {
    super();
    this.state = getListState();
  }

  // Add change listeners to stores
  componentDidMount() {
    ListStore.addChangeListener(this._onChange.bind(this));
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange.bind(this));
  }

  removeItem(e){

    let id = e.target.dataset.id;
    
    AppDispatcher.dispatch({
      action: 'remove-item',
      id: id
    });
  }
    
      removeUser(e){

    let id = e.target.dataset.id;
    
    AppDispatcher.dispatch({
      action: 'remove-user',
      id: id
    });
  }

  render(){
      
    let _this = this;

    let items = ListStore.getItems();
    let users = UserStore.getUsers();
    
    let itemHtml = items.map(( listItem ) => {
      return <li key={ listItem.id }>
          { listItem.name } <button onClick={ _this.removeItem } data-id={ listItem.id }>×</button>
        </li>;
    });
          let userHtml = users.map(( listUser ) => {
      return <li key={ listUser.id }>
          { listUser.name } <button onClick={ _this.removeUser } data-id={ listUser.id }>×</button>
        </li>;
    });

    return (

      <div id='bigcont'>
<div id='real'>
{ userHtml }
</div>
    <div id='list'>
        <ul>
          { itemHtml }
        </ul>
</div>
        <NewItemForm />
      </div>
    );
  }
}

export default AppRoot;
