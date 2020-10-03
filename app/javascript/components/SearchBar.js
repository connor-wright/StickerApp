import React from "react";
import "./APIInterface";
import SearchPhoto from "./SearchPhoto";
import {SearchImgs} from "./APIInterface"

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', stickers: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick      = this.onClick.bind(this);
  }
  
  onClick(xi) {
    const images = this.state.stickers;
    this.props.setActiveId(images[xi].id);
    this.setState({stickers: 
      images.map((image, index) => 
        ({
          active: index == xi? true: false, id: image.id, url: image.url
        })
      )
    });
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
          return {active: false, id: photo.id, url: photo.src.small};
        })
      }));
      SearchImgs(this.state.value).then((result) => AddStickers(result.photos));
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
            <input type="text" data-testid='searchInput' value={this.state.value} onChange={this.handleChange} />
          </label>
            <input type="submit" value="Submit" />
          </form>
          {stickers.map((image, xi) =>
            <SearchPhoto 
              data-testid='searchPhoto'
              setActiveId={this.props.setActiveId}
              url={image.url}
              xi={xi}
              key={xi}
              active={image.active}
              onClick={this.onClick}/>
          )}
      </div>
    );
  }
}

export default SearchBar;