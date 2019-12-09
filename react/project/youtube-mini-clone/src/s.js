const axios = require('axios');

const search = async (query, maxPage) => {
  const results = [];
  const { nextPageToken , items } = data;
  for (const i = 0; i < 10; i++) {
    const params = {
      key : 'AIzaSyCXndE4mNdeCpXWm-7iSu2kUzWuSsliCmc',
      q : query,
      part : 'snippet',
      maxResults: 10,
      pageToken: nextPageToken
    };
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    results.push(data.items);
  }
}

