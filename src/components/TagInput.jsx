import React, {Component} from "react";
import { getTags, addTag } from  '../utils/helper.js';

export default class TagInput extends Component {
  constructor(props){
    super(props);

    this.state = {
      tagname: '',
      allTags: null,
    };
  }
  handleChange = (e)=> {
    this.state = {
      tagname : e.target.value
    };
  }

  onSubmit = () => {
   let newTag  = {};
   newTag.name = this.state.tagname;
   newTag.id = this.state.tagname;
   newTag.marked = false;

   let AvailableTags = getTags();
   const newTags = addTag(newTag);
  //  console.log(AvailableTags);
   this.setState({
    allTags:AvailableTags
   }, () => {
    //  console.log(this.state.allTags);
     this.props.parent(newTags);
   });
}
  render(){
    return(
      <div className="tag-input-container">
        <input type='text' placeholder="tag.." onChange={this.handleChange}/>
        <input value = " Add tag" type="submit" onClick = {this.onSubmit}/>
      </div>
    )
  }
}