import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify.js'

/*All components are contained*/

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist'
      playlistTracks: []
    }

    //Bindings
       this.addTrack = this.addTrack.bind(this);
       this.removeTrack = this.removeTrack.bind(this);
       this.updatePlaylistName = this.updatePlaylistName.bind(this);
       this.savePlayList = this.savePlayList.bind(this);
       this.search = this.search.bind(this);
   };


   //Add tracks checks if the current song is in the playlistTracks state. if id is new, add the song to the end of the playlist.
   addTrack(track) {
       if(this.state.playlistTracks.findIndex(_track => _track.id === track.id) === -1) {
           let tracks = this.state.playlistTracks
           tracks.push(track)
           this.setState({playlistTracks: tracks})
       }
   }

   //Removes tracks.
   removeTrack(track) {
       const trackIndx = this.state.playlistTracks.findIndex(_track => _track.id === track.id);
       if(trackIndx > -1) {
           let tracks = this.state.playlistTracks
           tracks.splice(trackIndx, 1)
           this.setState({playlistTracks: tracks})
       }
   }

   updatePlaylistName(name) {
       this.setState({playlistName: name})
   }

   savePlayList() {
       const trackURIs = this.state.playlistTracks.map(track => track.uri);
       Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
           this.setState(
               {
                   playlistName: 'New Playlist',
                   playlistTracks: []
               })
       })
   }

   search(searchTerm) {
       Spotify.search(searchTerm).then(tracks => {
           this.setState({
               searchResults: tracks
           })
       });
   }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
