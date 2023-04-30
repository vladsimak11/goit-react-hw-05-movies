import css from './Movies.module.css';
import {fetchMovies} from '../services/fetchMovies';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThreeDots } from '../components/Loader/Loader';

const Movies = () => {
  const [searchMovies, setSearchMovies] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [nameMovies, setNameMovie] = useState([]);
  const nameSearchMovies = searchMovies.get("name") ?? "";
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(nameSearchMovies)
      .then(({results}) => {
        console.log(results);
        return setNameMovie(results);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [nameSearchMovies]);

  const visibleMovies = nameMovies.filter(({title}) =>
    title.toLowerCase().includes(nameSearchMovies.toLowerCase())
  );
  console.log(visibleMovies)
  return (
    <div className={css.container}>
      <input
        type="text"
        value={nameSearchMovies}
        onChange={e => setSearchMovies({ name: e.target.value })}
      />

      {isLoading && <ThreeDots />}
      <ul className={css.listMoives}>
        {
          visibleMovies.map(({id, title}) => {
            return (
              <li key={id}><Link to={`${id}`} state={{ from: location }}>{title}</Link></li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Movies;