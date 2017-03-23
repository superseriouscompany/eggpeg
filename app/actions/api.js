const baseUrl = __DEV__ ?
  'https://superserious.ngrok.io' :
  'https://eggpeg.superserious.co';

export default {
  leaderboard: {
    load: function() {
      return fetch(`${baseUrl}/leaderboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return response.json();
      }).then(function(json) {
        return json.scores;
      })
    },
    update: function(score, name) {
      return fetch(`${baseUrl}/leaderboard`, {
        method: 'POST',
        body: JSON.stringify({ score: score, name: name }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function(response) {
        if( !response.ok ) { throw new Error('' + response.status); }
        return true;
      })
    }
  }
}
