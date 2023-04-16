import axios from 'axios';

export const tmdb_client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '4d89b6cf9a10a09f0edf6877ca50bc44',
    language: 'en-US',
  },
});
