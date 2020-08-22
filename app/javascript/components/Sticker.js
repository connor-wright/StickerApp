import React from "react";
import PropTypes from "prop-types";
class Sticker extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      url: props.url
    };
  }
  
  render () {
    return (
        <img src={this.state.url}/>
    );
  }
}

export default Sticker;
