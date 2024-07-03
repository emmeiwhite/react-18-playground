import { useState } from 'react'

export default function StarRating({ handleUserRating, length }) {
  const [rating, setRating] = useState(0) // State to store the current rating

  function handleClick(index) {
    setRating(index + 1)
    handleUserRating(rating)
  }

  function renderStars() {
    return Array.from({ length }, (_, i) => (
      <Star
        key={i}
        handleClick={() => handleClick(i)}
        rating={rating}
        totalFill={i < rating}
      />
    ))
  }
  return (
    <div className="flex gap-3">
      {renderStars()}
      <h3 className="text-3xl">{rating}</h3>
    </div>
  )
}

function Star({ handleClick, totalFill }) {
  let ratingCSS = totalFill && 'bg-yellow-200'
  return (
    <div
      className={`w-10 h-10 bg-gray-400 star-shape cursor-pointer ${ratingCSS}`}
      onClick={handleClick}
      onMouseEnter={handleClick}
      onMouseLeave={handleClick}
    ></div>
  )
}
