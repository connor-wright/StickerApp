import React from "react";
import Sticker from "./Sticker";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', stickers: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          return <img src={photo.src.small}/>;
        })
      }));
      fetch('/v1/pexels_api/search/' + this.state.value)
      .then(res => res.json())
      .then(result => {
        console.log('picture');
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
          {stickers}
      </div>
    );
  }
}

export default SearchBar;