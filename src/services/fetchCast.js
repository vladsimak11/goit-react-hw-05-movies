const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'c2392c054aee28abbedad5531d1dfbd2';

export function fetchCast(movieDetailId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });

  return fetch((`${BASE_URL}${movieDetailId}/credits?${searchParams}`)).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}
