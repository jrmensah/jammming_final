import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify.js';

/*All components for App */

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }

    //Jammming Bindings
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

    //Add tracks

    addTrack(track){
      if(this.state.playlistTracks.findIndex(_track => _track.id ===
         track.id) === -1){
           let tracks = this.state.playlistTracks
           tracks.push(track)
           this.setState({playlistTracks: tracks})

      }
    }

    //Remove tracks
    removeTrack(track){
      const trackIndex = this.state.playlistTracks.findIndex(_track => _track.id ===
      track.id);
        if(trackIndex > -1){
          let tracks = this.state.playlistTracks
          tracks.splice(trackIndex, 1)
          this.setState({playlistTracks: tracks})
        }
    }

    // Update Playlist Name
    updatePlaylistName(name) {
      this.setState({playlistName: name})
    }
    //Save Playlist
    savePlaylist(){
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(()=> {
        this.setState(
          {
            playlistName: 'New Playlist',
            playlistTracks: []

          })
      })
    }

    //Search for tracks
    search(searchTerm){
      Spotify.search(searchTerm).then(tracks =>{
        this.setState({
          searchResults: tracks
        })
      });
    }

    //Render tracks and playlist
  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar onSearch={this.search} />
              <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
                <Playlist playlistName={this.state.playlistName}
                          playlistTracks={this.state.playlistTracks}
                          onRemove={this.removeTrack}
                          onNameChange={this.updatePlaylistName}
                          onSave={this.savePlaylist}

                          />
                          </div>
                  </div>        
      </div>
    );
  }
}

export default App;
