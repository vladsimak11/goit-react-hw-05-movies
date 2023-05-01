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

  const handleSumbit = (e) => {
    e.preventDefault();
    setSearchMovies({name: e.target.elements.text.value});
    e.target.elements.text.value = '';
  }

  const visibleMovies = nameMovies.filter(({title}) =>
    title.toLowerCase().includes(nameSearchMovies.toLowerCase())
  );
  console.log(searchMovies);
  return (
    <div className={css.container}>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name='text'         
        />
        <button type='submit' className={css.button}>Search</button>
      </form>

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