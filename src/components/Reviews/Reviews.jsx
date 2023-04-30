import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchReviews } from '../../services/fetchReviews';
import css from './Reviews.module.css';
import { ThreeDots } from '../Loader/Loader';
import { NoReviews } from 'components/Error/NoReviews';

export const Reviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchReviews(movieId)
      .then(({ results }) => {
        // console.log(results);
        return setReviewsList(results);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div className={css.additionalInfo}>
      {isLoading && <ThreeDots />}
      {reviewsList == false && <NoReviews />}
      <ul className={css.reviews}>
        {reviewsList.map(({ author, content }) => {
          return (
            <li key={author}>
              <p>
                <span className={css.author}>Author:</span>{' '}
                <span>{author}</span>
              </p>
              <p className={css.content}>{content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
