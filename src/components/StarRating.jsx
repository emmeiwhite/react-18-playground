import { useState } from 'react'

export default function StarRating() {
  const [rating, setRating] = useState(0) // State to store the current rating

  function handleClick(index) {
    setRating(index + 1)
  }

  function renderStars() {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        handleClick={() => handleClick(i)}
        rating={rating}
        totalFill={i < rating}
      />
    ))
  }
  return <div className="flex gap-3">{renderStars()}</div>
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
