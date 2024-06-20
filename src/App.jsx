import { Children, useState } from 'react'

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
  }
]

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9
  }
]

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  return (
    <>
      {/* <Navigation movies={movies} /> */}

      <Navigation>
        <NumResults movies={movies} />
      </Navigation>
      <Main movies={movies} />
    </>
  )
}

// Structural Component
function Navigation({ children }) {
  return (
    <nav className="grid grid-cols-3 items-center h-[7.2rem] py-0 px-[3.2rem] bg-primary rounded-[0.9rem]">
      <Logo />
      <Search />
      {/* <NumResults movies={movies} /> */}
      {children}
    </nav>
  )
}

// Structural Component | For Layours
function Logo() {
  return (
    <div className="flex items-center gap-[0.8rem] text-3xl sm:text-4xl">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

// Stateful Component
function Search() {
  const [query, setQuery] = useState('')
  return (
    <input
      className="justify-self-center border-none px-[1.6rem] py-[1.1rem] text-[1.8rem] rounded-[0.7rem] w-[40rem] transition-all duration-300 text-custom-text bg-primary-light placeholder-custom-text-dark focus:outline-none focus:shadow-[0_2.4rem_2.4rem_rgba(0,0,0,0.1)] focus:transform focus:-translate-y-0.5"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}

// Structural Component
function NumResults({ movies }) {
  return (
    <p className="justify-self-end text-[1.8rem]">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

// Main Structural Component
function Main({ movies }) {
  return (
    <main className="mt-[2.4rem] flex gap-[2.4rem] justify-center h-[calc(100vh-7.2rem-3*2.4rem)]">
      <MoviesList movies={movies} />
      <MoviesWatched />
    </main>
  )
}

// Left Side | MoviesList
function MoviesList({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true)

  return (
    <div className="w-[42rem] max-w-[42rem] bg-custom-background-500 rounded-[0.9rem] relative overflow-y-auto">
      <button
        className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] w-[2.4rem] rounded-full border-none text-text text-[1.4rem] font-bold cursor-pointer z-50 flex items-center justify-center bg-custom-background-900"
        onClick={() => setIsOpen1(open => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>

      {isOpen1 && <Movies movies={movies} />}
    </div>
  )
}

function Movies({ movies }) {
  return (
    <ul className="py-[0.8rem] px-0 list-none overflow-y-auto">
      {movies?.map(movie => (
        <Movie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  )
}

// Stateless Presentational component
function Movie({ movie }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[4rem_1fr] grid-rows-[1.6rem auto] text-[1.6rem] bg-custom-background-500 py-[1.6rem] px-[3.2rem] border-b-[1px_solid_custom-background-100] cursor-pointer transition-all duration-300 hover:bg-custom-background-100 gap-x-[1rem]"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full h-auto grid-row-1 col-span-1 row-span-3"
      />
      <div className="grid col-span-1  ">
        <h3 className="text-[1.8rem]">{movie.Title}</h3>
        <div className="flex items-center gap-[0.8rem]">
          <span>🗓</span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </li>
  )
}

// Right Side | MoviesWatched
function MoviesWatched() {
  const [isOpen2, setIsOpen2] = useState(true)
  const [watched, setWatched] = useState(tempWatchedData)

  return (
    <div className="w-[42rem] max-w-[42rem] bg-custom-background-500 rounded-[0.9rem] relative overflow-y-auto">
      <button
        className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] w-[2.4rem] rounded-full border-none text-text text-[1.4rem] font-bold cursor-pointer z-50 flex items-center justify-center bg-custom-background-900"
        onClick={() => setIsOpen2(open => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  )
}

// Stateless presentational component | We are using derived state here
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating))
  const avgUserRating = average(watched.map(movie => movie.userRating))
  const avgRuntime = average(watched.map(movie => movie.runtime))
  return (
    <div className="bg-custom-background-100 rounded-[0.9rem] shadow-md p-[2.2rem_3.2rem_1.8rem_3.2rem]">
      <h2 className="uppercase text-[1.6rem] mb-[0.6rem]">Movies you watched</h2>
      <div className="flex items-center gap-[2.4rem] text-[1.6rem] font-semibold">
        <p className="flex items-center gap-[0.8rem]">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

// Presentational Component
function WatchedList({ watched }) {
  return (
    <ul className="list py-[0.8rem] px-0 list-none">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  )
}

// Presentational Component | Stateless
function WatchedMovie({ movie }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] text-[1.6rem]  bg-custom-background-500 py-[1.6rem] px-[3.2rem] border-b-[1px_solid_custom-background-100] cursor-pointer transition-all duration-300 hover:bg-custom-background-100 gap-x-[1rem]"
    >
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="w-full h-full row-start-1 row-span-full"
      />
      <h3 className="grid-row-2 col-span-1 text-3xl">{movie.Title}</h3>
      <div className="flex gap-8">
        <p className="flex items-center gap-[0.8rem]">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}
