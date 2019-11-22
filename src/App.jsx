import React from "react";
import PropTypes from "prop-types";
import './styles.scss';
import './tag.scss';

import Dialog from "./components/Dialog.jsx";
import TagInput from "./components/TagInput.jsx"
import ItemContainer from "./components/ItemContainer.jsx";

import { getItems, setItems, addItem, editItem, deleteItem, markItemAsTodoDone,
         sortItems, searchItems, filterByDate, filterByTags, getTags, setTags, deleteTag,
         removeDeletedTagFromItems } from './utils/helper.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false,
      visualList: false,
      itemToEdit: null,
      list: getItems(),
      byDateSelectFilter: "",
      availableTags: getTags(),
    };
  }

  findindex = (arr, id)=>{
  const idx = arr.findIndex ( (obj) => {
    if (obj.id === id){
      return idx;
      }
      else {
        return null;
      }
    })
  }

  onTagMarked(id){
    let marked_id = this.state.availableTags.findIndex( (obj ) => obj.id === id);
    let list = this.state.availableTags;
    list[marked_id].marked = !list[marked_id].marked;
    setTags(list);
    this.setState({
      availableTags: getTags(),
      visualList:filterByTags(list),
    });
  }

  deleteItem = id => {
    this.setState({ list: deleteItem(id), visualList: false });
  };
  markItemAsTodoDone = id => {
    this.setState({ list: markItemAsTodoDone(id), visualList: false });
  };
  editItem = item => {
    this.setState({ dialog: true, itemToEdit: item });
  };

  closeDialog = () => {
    this.setState({ dialog: false, itemToEdit: null });
  };

  callbackFromDialog = item => {
    this.setState({ dialog: false, itemToEdit: null, visualList: false });
    if (item.id === -1) {
      this.setState({ list: addItem(item) });
    } else {
      this.setState({ list: editItem(item) });
    }
  };
  callbackFromTagInput = allTags => {
    // console.log(allTags);
    this.setState( {
      availableTags: allTags,
    })
  }
  onAddClicked = () => { this.setState({ dialog: true, }); }
  onSortClicked = () => { this.setState({ visualList: sortItems(this.state.list), }); }
  onFilterChange = (event) => { this.setState({ byDateSelectFilter: event.target.value, visualList: filterByDate(event.target.value), }) }
  onSearchChange = (event) => { this.timeoutSearch(event.target.value, this.state.list); }
  timeoutSearch = (value, list) => {
    setTimeout(() => {
      this.setState({ visualList: searchItems(value, list), });
    }, 500);
  }

  onDeleteTagClicked = (id, name) => {
    const tags = deleteTag(id);
    const list = removeDeletedTagFromItems(name);

    this.setState({
      availableTags: tags,
      list: list,
    });
  }

  render() {
    const { dialog, visualList, itemToEdit, list, availableTags } = this.state;

    let allTags = null;
    if (availableTags === null) {
      allTags=  <p> No tags</p>
    } else {
      allTags = availableTags.map( (item) => {
      return (
      <div key={item.id}>
        <div className="delete-tag" onClick={()=>this.onDeleteTagClicked(item.id, item.name)}>X</div>
        <div className="tag-on-modal" onClick = {()=>this.onTagMarked(item.id)} className = {`item positive tag-element ${item.marked ? `marked` : ` `}`} id={item.id} >
          {item.name}
        </div>
      </div>
      );
    });
  }
    return (

        <>
          <ul className="control-panel">
            <li><button className="item positive" onClick={this.onAddClicked}>Add Item</button></li>
            <li><button className="item positive" onClick={this.onSortClicked}>Sort</button></li>
            <li>
              <select className="item positive" onChange={this.onFilterChange}>
                <option defaultValue="select">Choose deadline</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">Week</option>
                <option value="month">During the month</option>
              </select>
            </li>
            <li><input className="item search" type="text" name="search" placeholder="Search"
                       onChange={this.onSearchChange} /></li>
          </ul>
          {allTags && <div className="tag-container">{allTags}</div>}
          {dialog && <Dialog close={this.closeDialog} parent={this.callbackFromDialog} item={itemToEdit} availableTags={this.state.availableTags} />}
            <TagInput parent = {this.callbackFromTagInput}/>
            <ItemContainer items={visualList ? visualList : list} deleteItem={this.deleteItem}
                           editItem={this.editItem} markItemAsTodoDone={this.markItemAsTodoDone}
                           tags={availableTags} />
        </>

    );
  }
}

export default App;
