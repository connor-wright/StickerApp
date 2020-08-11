import React from "react";
import PropTypes from "prop-types";
class BoardCust extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

BoardCust.propTypes = {
  greeting: PropTypes.string
};
export default BoardCust;
