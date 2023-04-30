const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'c2392c054aee28abbedad5531d1dfbd2';

export function fetchMovies(queryValue) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    query: queryValue,
    language: 'en-US',
    page: 1,
  });

  return fetch((`${BASE_URL}?${searchParams}`)).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}

