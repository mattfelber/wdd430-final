import { StarIcon } from '@heroicons/react/20/solid';

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}
