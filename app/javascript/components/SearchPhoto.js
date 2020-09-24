import React from "react";
class SearchPhoto extends React.Component {
  render () {
    const {url, onClick, xi, active} = this.props;
    const style = active? {border: '2px solid blue'} : {};
    return (
      <img style={style} src={url} onClick={() => onClick(xi)}/>
    );
  }
}

export default SearchPhoto;
