import React from 'react';
import PropTypes from 'prop-types';



class ItemCard extends React.Component {
    constructor(props) { super(props); }

    onDeleteItemClicked = () => { this.props.deleteItem(this.props.item.id); }
    onMarkItemClicked = () => { this.props.markItemAsTodoDone(this.props.item.id); }
    onEditItemClicked = () => { this.props.editItem(this.props.item); }

    render() {
        const { title, description, priority, deadline, isDone, tags, attachedImage, } = this.props.item;

        const outputTags = tags.map (item => {
          return(
            <div className = " tag-element " id={item.id} key = {item.id} value={item.tag}>{item.tag}</div>
          );
        });

        return (

                    <div className="item"
                           
                    >
                        <p className={`title ${isDone ? `line-through` : ``}`}>{title}</p>
                        <p className={`text ${isDone ? `line-through` : ``}`}>{description ? description : `-`}</p>
                        <p className={`text ${isDone ? `line-through` : ``}`}>
                            Priority:
                            <span className={`priority-${priority}`}>{` ${priority}`}</span>
                        </p>
                        <p className={`text ${isDone ? `line-through` : ``}`}>{deadline ? deadline : `-`}</p>
                        <div className="choosen-tags">{outputTags}</div>
                        <section className="buttons">
                            <input type="button" className="input negative" value="Delete"
                                   onClick={this.onDeleteItemClicked} />
                            <input type="button" className="input positive" value="Edit"
                                   onClick={this.onEditItemClicked} />
                            <input type="button" className="input positive" value={isDone ? `Mark as ToDo` : `Mark as Done`}
                                   onClick={this.onMarkItemClicked} />
                            {attachedImage && <a href={attachedImage} download className="input positive">Download</a>}
                        </section>
                    </div>
                )}
    }


ItemCard.propTypes = {
    deleteItem: PropTypes.func,
    editItem: PropTypes.func,
    markAsTodoDone: PropTypes.func,
    item: PropTypes.object,
};

ItemCard.defaultProps = {};

export default ItemCard;