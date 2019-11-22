import React,{Component} from 'react';

export default class TagSelect extends Component{
  render(){
    const {tags} = this.props;
    const elements = tags.map( ( item ) => {
      return (
        <>
        <option value ={item} className ="option"><p>{item.name}</p> </option>
        </>
      );
    });
    return(
      
      <select className="select">
      <option className="option" value="">Choose S</option>
      {elements}
    </select>
    )
  }
}
