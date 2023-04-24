import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {fetchReviews} from '../services/fetchReviews';
import css from './Reviews.module.css';

export const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchReviews(movieId).then( ({results}) => {
      console.log(results)
      return setReviewsList(results);
    });
  }, [movieId]);

  return (
    <div className={css.additionalInfo}>
      <ul className={css.reviews}>
        {
          reviewsList.map(({author, content}) => {
            return (
              <li key={author}>
                <p><span className={css.author}>Author:</span> <span>{author}</span></p>
                <p className={css.content}>{content}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}