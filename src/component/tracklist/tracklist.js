
import React from ‘react';
import './TrackList.css'’
import Track from ‘../Track/Track’

class TrackList extends React.Component{
    render() {
      return(
        <div class="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track
                  key={track.id}
                  track={track}
                  onAdd={this.props.onAdd}
                  isRemoval={this.props.isRemoval}
                  onRemove={this.props.onremove}
                  />
        })
      }
    <!-- You will add a map method that renders a set of Track components  -->
        </div>
      )
    }
}

export default TrackList;
