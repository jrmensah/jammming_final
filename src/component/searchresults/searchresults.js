
import React from ‘react’;
import './SearchResults.css'

import TrackList from ‘../TrackList/TrackList’

/* Render results of track search for SearchResults */

class SearchResults extends React.Component{
	render{
			return(
					<div class=”SearchResults” >
						<h2>Search Results</h2>
							<!-- Add a track list -- >
								<trackList tracks={this.props.searchResults} onAdd{this.props.onAdd} />
					</div>
		);
	}
}

export default SearchResults;
