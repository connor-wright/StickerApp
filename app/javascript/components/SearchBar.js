import React from "react";
import Photo from "./Photo";
import update from "immutability-helper";

//TODO clean this up
function getImage(url) {
  return {active: false, url: url};
}
  
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', stickers: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick      = this.onClick.bind(this);
  }
  
  
  onClick(xi) {
    const images = update(this.state.stickers, {
      [xi] : {active: {$set: true}}
    });
    this.setState({stickers: images});
    console.log(this.state.stickers);
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.value)
    {
      let AddStickers = (photos) => this.setState(() => ({
        stickers: photos.map(photo => 
        {
          return getImage(photo.src.small);
        })
      }));
      fetch('/v1/pexels_api/search/' + this.state.value)
      .then(res => res.json())
      .then(result => {
        AddStickers(result.photos);
      });
    }
    event.preventDefault();
  }
  
  render () {
    const {stickers} = this.state;
    return (
      <div className='SearchBar'>
        <form onSubmit={this.handleSubmit}>
          <label>
            search:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
            <input type="submit" value="Submit" />
          </form>
          {stickers.map((image, xi) =>
            <Photo 
              url={image.url}
              xi={xi}
              key={xi}
              active={image.active}
              onClick={this.onClick}/>)}
      </div>
    );
  }
}

export default SearchBar;