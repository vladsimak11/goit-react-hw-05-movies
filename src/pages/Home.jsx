import css from './Home.module.css';
import {fetchTrending} from '../services/fetchTrending';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const [moviesTrend, setMoviesTrend] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchTrending().then(({results}) => {
      // console.log(results);
      return setMoviesTrend(results)
    });
  }, []);
  
  return (
    <main className={css.container}>
      <h1 className={css.trendHeader}>Trending today</h1>
    
      <ul className={css.trendList}>
        {
          moviesTrend.map(({title, name, id, backdrop_path}) => {
            return (
              <li className={css.trendItem} key={id}>
                <img className={css.trendImg}  src={`https://image.tmdb.org/t/p/original/${
                backdrop_path
              }`} alt={title} />
                <Link to={`movies/${id}`} state={{ from: location }}>{title || name}</Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  );
};