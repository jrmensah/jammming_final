const spotifyAuthorizeURIBase = 'https://accounts.spotify.com.authorize'
const spotifyAPIURIBase = 'https://api.spotify.com/v1'
const clientId = '66e9f0dfa91d4bcfabdd957097b3c4e0'
const redirectURI = 'https://localhost:3000'

let accessToken

const Spotify ={
  getAccessToken(){
    if(accessToken){
      return accessToken

    }

    //Implicit Grant Flow, returning a user's access token in URL
    const accessTokenMatch = window.location.href.match
    (/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match
    (/expires_in=([^&]*)/);

    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else{
        const spotifyAuthorizeURI = `${spotifyAuthorizURIBase}?client_id=${clientId}&
        &respose_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = spotifyAuthorizeURI;
    }

  },

  search(searchTerm){
    const accessToken = Spotify.getAccessToken();
    const searchRequest = `${spotifyAPIURIBase}search?type=track&q=${searchTerm}`
    return fetch(searchRequest, {
      headers: {
        Authorization: 'Bearer ${accessToken}'
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
        if(!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
    });
  },

  savePlaylist(playlistName, trackUris){
    if (!playlistName || !trackUris.length){
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`}
    let userId

    return fetch(`${spotifyAPIURIBase}me`, {headers: headers}
    ).then(response => response.json()
  ).then(jsonResponse => {
    userId = jsonResponse.id;
    return fetch(`${spotifyAPIURIBase}users/${userId}/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({uris: trackUris})
    });
  });
});
  }

}
export default Spotify;
