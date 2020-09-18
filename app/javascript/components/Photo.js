import React from "react";
class Photo extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      url: props.url,
      xi: props.xi,
      onClick: props.onClick,
      active: props.active
      //may need photo id and artist
    };
  }
  
  render () {
    
    const {url, onClick, xi, active} = this.state;
    const style = active? {border: '10px solid'} : {};
    console.log(active);
    return (
      <img style={style} src={url} onClick={() => onClick(xi)}/>
    );
  }
}

export default Photo;
