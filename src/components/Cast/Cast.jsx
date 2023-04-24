import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCast } from '../../services/fetchCast';
import css from './Cast.module.css';
import { ThreeDots } from '../Loader/Loader';

export const Cast = () => {
  const [castList, setCastList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchCast(movieId)
      .then(({ cast }) => {
        // console.log(cast);
        return setCastList(cast);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div className={css.additionalInfo}>
      {isLoading && <ThreeDots />}
      <ul className={css.castList}>
        {castList.map(({ character, name, profile_path }) => {
          return (
            <li key={character}>
              <p>
                <img
                  width="150"
                  src={`https://image.tmdb.org/t/p/original/${profile_path}`}
                  alt={name}
                />
              </p>
              <p>{character}</p>
              <p>{name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
