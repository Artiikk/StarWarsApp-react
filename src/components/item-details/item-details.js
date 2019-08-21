import React, { Component } from "react";

import Spinner from "../spinner";

import "./item-details.css";

const Record = ({ item, field, label }) => {
  return(
    <li className="list-group-item">
      <span className="term">{ label }</span>
      <span>{ item[field] }</span>
    </li>
  );
};
export { Record };

export default class ItemDetails extends Component {

  state = {
    item: {},
    loading: true,
    image: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  componentDidMount() {
    this.updateItem();
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) return;

    getData(itemId)
    .then((item) => {
      this.setState({
        item: item,
        image: getImageUrl(item),
        loading: false
      });
    });
  }

  render() {
    const { item, loading, image } = this.state;
    const { name } = item;

    const mapper = (
      React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { item });
      })
    );

    const content = loading ? <Spinner /> : mapper;

    return (
      <div className="item-details card">
        <img
          className="item-image"
          src={image}
          alt="" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {content}
          </ul>
        </div>
      </div>
    );
  }
}
