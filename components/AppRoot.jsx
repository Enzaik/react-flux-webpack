// AppRoot.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ListStore from '../stores/ListStore';
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

  render(){
      
    let _this = this;

    let items = ListStore.getItems();
    
    let itemHtml = items.map(( listItem ) => {
      return <li key={ listItem.id }>
          { listItem.name } <button onClick={ _this.removeItem } data-id={ listItem.id }>×</button>
        </li>;
    });

    return (

      <div id='bigcont'>
<div id='real'>
<NewItemFormtst />
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
