import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {fetchCast} from '../services/fetchCast';
import css from './Cast.module.css';

export const Cast = () => {
  const [castList, setCastList] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchCast(movieId).then( ({cast}) => {
      // console.log(cast);
      return setCastList(cast);
    });
  }, [movieId]);

  return (
    <div className={css.additionalInfo}>
      <ul className={css.castList}>
        {
          castList.map(({character, name, profile_path}) => {
            return (
              <li key={character}>
                <p><img width='150'src={`https://image.tmdb.org/t/p/original/${profile_path}`} alt={name} /></p>
                <p>{character}</p>
                <p>{name}</p>
              </li>
            )
          })         
        }
      </ul>
    </div>
  )
}