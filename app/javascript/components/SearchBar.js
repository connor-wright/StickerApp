import React from "react";
import SearchBarImg from "./SearchBarImg";
import {SearchImgur} from "./BackendAPI";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', imgs: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick      = this.onClick.bind(this);
  }
  
  onClick(xi) {
    const images = this.state.imgs;
    this.props.setActiveId(images[xi].id);
    this.setState({imgs: 
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
      let AddImgs = (data) => this.setState(() => ({
        //TODO have the backend filter out theses null cases.
        imgs: data.filter(data => data.images).map(image => 
        {
          return {active: false, id: image.images[0].id, url: image.images[0].link};
        })
      }));
      SearchImgur(this.state.value).then(
        result => AddImgs(result.data),
        error => alert("Imgur failed to search"));
    }
    event.preventDefault();
  }
  
  render () {
    const {imgs} = this.state;
    return (
      <div className='SearchBar'>
        <form onSubmit={this.handleSubmit}>
          <label>
            search:
            <input type="text" 
              className='searchInput' 
              value={this.state.value} 
              onChange={this.handleChange} 
            />
          </label>
            <input type="submit" value="Submit" />
        </form>
        {imgs.map((image, xi) =>
          <SearchBarImg 
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