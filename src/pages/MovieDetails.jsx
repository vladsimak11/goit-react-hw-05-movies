import { useParams } from "react-router-dom";
import css from './MovieDetails.module.css';
import { useState, useEffect } from "react";
import {fetchTrending} from '../services/fetchTrending';

export const MovieDetails = () => {
  const [moviesId, setMoviesId] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchTrending().then(({results}) => setMoviesId(results));
  }, []);

  return (
    <> 
      <div className={css.container}>
        {
          moviesId.find(({id}) => {
            return (
                id === movieId && <div key={id}>{id}</div>
            )
          })
        }
      </div>
    </>
  )
}