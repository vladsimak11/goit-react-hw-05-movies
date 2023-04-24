import css from './Home.module.css';
import {fetchTrending} from '../services/fetchTrending';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const [moviesTrend, setMoviesTrend] = useState([]);
  
  useEffect(() => {
    fetchTrending().then(({results}) => setMoviesTrend(results))
  }, []);
  
  return (
    <main className={css.container}>
      <h1>Trending today</h1>
      <ul className={css.list}>
        {
          moviesTrend.map(({title, name, id}) => {
            return (
              <li key={id}>
                <Link to={`movies/${id}`}>{title || name}</Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  );
};