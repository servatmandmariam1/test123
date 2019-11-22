import React from "react";
import ItemCard from "./ItemCard.jsx";

class ItemContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { items: this.props.items }
  }

  render() {

    let data = null;
    if (this.props.items === undefined) {
      data = <p>The list is undefined</p>;
    } else if (this.props.items === null || this.props.items.length === 0) {
      data = <p>The list is empty</p>;
    } else {
      // console.log(this.state.items);

      data = this.props.items.map((item, index) =>
          <ItemCard key={item.id.toString()} item={item} deleteItem={this.props.deleteItem}
                    editItem={this.props.editItem} markItemAsTodoDone={this.props.markItemAsTodoDone}
                    tags={this.props.tags} index={index} style={{margin: '10px'}} />
      );
    }

    return (
        <section  className="to-do-items-container">
                <section className="grid" >
                  {data}
                </section>
        

        </section>
    );
  }
}

export default ItemContainer;
