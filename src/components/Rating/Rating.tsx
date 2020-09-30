import React from 'react';
import classNames from 'classnames';
import { ReactComponent as Star } from 'assets/img/star.svg';

import './Rating.scss';

type RatingType = {
    rating?: string;
    className?: string;
}

const Rating: React.FC<RatingType> = ({ rating, className }) => {
    const ratingClasses = classNames("rating", className);
    return (
        <div className={ratingClasses}>
            <Star />
            <div className="rating__number"><span className="rating__number__current">{rating}</span>/10</div>
        </div>)
}

export default Rating;