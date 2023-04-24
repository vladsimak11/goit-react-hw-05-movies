import { useParams, Link, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';
import { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../services/fetchMovieDetails';
import { ThreeDots } from '../components/Loader/Loader';

export const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchMovieDetails(movieId)
      .then(data => {
        console.log(data);
        return setMovieDetail(data);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  const {
    title,
    name,
    overview,
    release_date,
    backdrop_path,
    poster_path,
    vote_average,
  } = movieDetail;

  return (
    <>
      {isLoading && <ThreeDots />}
      <div className={css.container}>
        <div className={css.movieInfo}>
          <div>
            <img
              width="400"
              src={`https://image.tmdb.org/t/p/original/${
                backdrop_path || poster_path
              }`}
              alt={title || name}
            />
          </div>

          <div className={css.movieText}>
            <p className={css.title}>{title || name}</p>
            <p>
              <span className={css.header}>Overview:</span> {overview}
            </p>
            <p>
              <span className={css.header}>Release date:</span> {release_date}
            </p>
            <p>
              <span className={css.header}>Vote average: </span>
              {vote_average}
            </p>
          </div>
        </div>
        <div>
          <p>Additional information:</p>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
