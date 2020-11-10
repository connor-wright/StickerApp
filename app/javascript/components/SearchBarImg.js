import React from "react";
class SearchBarImg extends React.Component {
  render () {
    const {url, onClick, xi, active} = this.props;
    const sizingStyle = {width: '100%', height: 'auto'};
    const style = active? {border: '2px solid blue', ...sizingStyle } : sizingStyle;
    return (
      <img style={style} src={url} onClick={() => onClick(xi)}/>
    );
  }
}

export default SearchBarImg;
