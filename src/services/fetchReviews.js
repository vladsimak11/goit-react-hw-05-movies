const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'c2392c054aee28abbedad5531d1dfbd2';

export function fetchReviews(movieDetailId) {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: 1
  });

  return fetch((`${BASE_URL}${movieDetailId}/reviews?${searchParams}`)).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}
