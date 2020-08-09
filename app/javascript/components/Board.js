import React from "react"
import PropTypes from "prop-types"
class Board extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

Board.propTypes = {
  greeting: PropTypes.string
};
export default Board
