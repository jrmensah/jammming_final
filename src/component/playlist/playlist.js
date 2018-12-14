

import React from ‘react';
import './Playlist.css':

import TrackList from '../TrackList/Tracklist'

/*Playlist holds all tracks for user to save to SPOTIFY
Playlist*/

class Playlist extends React.Component{
	constructor(props){
		super(props)
		this.handleNameChange = this.handleNameChange.bind(this)
	}

	/*Handling Name Changes*/
	handleNameChange(event){
		this.props.onNameChange(event.target.value)
	}
render(event){
	return(
		<div class="Playlist">
	  <input defaultValue= {‘New Playlist’} onChange={this.handleNameChange} />

  /* Add and Remove from tracklist */
	<TrackList tracks={this.props.playlistTracks}
						 isRemoval={true}
						 onRemove={this.props.onRemove} />

  <a className="Playlist-save"> onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
)
}
}

export default Playlist;
