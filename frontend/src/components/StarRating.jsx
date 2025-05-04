import { IconStar, IconStarFilled } from '@tabler/icons-react';

const StarRating = ({ rating, onRatingChange, name }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          className="focus:outline-none transition-colors"
        >
          {star <= rating ? (
            <IconStarFilled className="w-8 h-8 text-yellow-400" />
          ) : (
            <IconStar className="w-8 h-8 text-gray-400 hover:text-yellow-400" />
          )}
        </button>
      ))}
      <input type="hidden" name={name} value={rating} />
    </div>
  );
};

export default StarRating;