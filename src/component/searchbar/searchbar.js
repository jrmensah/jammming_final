import React from 'react';
import './SearchBar.css';

class SearchBar extends React component{
  constructor(props){
    super(props)
    this.state ={
      searchTerm: ''
    }
    this.search = this.search.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
  }
  //Search in Spotify
  search(){
    this.props.onSearch(this.state.searchTerm);
  }

  //Search term changes
  handleSearchTermChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  //Rendering
  render()
    return(
      <div class="SearchBar">
        <input placeholder="Enter A Song, Album or Artist" onChange={this.handleSearchTermChange} />
        <a onclick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
