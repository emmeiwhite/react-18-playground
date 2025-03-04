import { useEffect, useRef, useState } from 'react'
import Modal from './components/Modal'
import Success from './components/Success'
import Failure from './components/Failure'
import StarRating from './components/StarRating'

// const tempMovieData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
//   },
//   {
//     imdbID: 'tt0133093',
//     Title: 'The Matrix',
//     Year: '1999',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
//   },
//   {
//     imdbID: 'tt6751668',
//     Title: 'Parasite',
//     Year: '2019',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
//   }
// ]

// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9
//   }
// ]

const KEY = '10a55471'
const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
  const [movies, setMovies] = useState([])
  // const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [query, setQuery] = useState('Spirited Away')

  // Other way to set our state directly from the data present in the localStorage
  const [watched, setWatched] = useState(function () {
    const storedData = localStorage.getItem('watchedMovies')
    return JSON.parse(storedData)
  })

  const handleSelectedId = id => {
    // Setting up the id as well as handling up double click when the id is already selected and user clicks on the same id again (i-e., same movie from the left list again)
    setSelectedId(prevId => {
      return id === prevId ? null : id
    })
  }

  // function handleAddWatched(movie) {
  //   setWatched(prevWatched => {
  //     const isWatched = prevWatched.find(moviePrev => moviePrev.imdbID === movie.imdbID)
  //     if (isWatched) {
  //       return prevWatched
  //     }
  //     const newWatched = [...prevWatched, movie]

  //     // Updating localStorage with the new list of watched movies
  //     localStorage.setItem('watched', JSON.stringify(newWatched))
  //     return newWatched
  //   })
  // }

  function handleAddWatched(movie) {
    console.log('Adding movie:', movie)

    setWatched(prevWatched => {
      console.log('Previous watched movies:', prevWatched)

      const isWatched = prevWatched.find(moviePrev => moviePrev.imdbID === movie.imdbID)
      if (isWatched) {
        console.log('Movie already watched:', movie)
        return prevWatched
      }

      const newWatched = [...prevWatched, movie]
      console.log('New watched movies:', newWatched)

      // Updating localStorage with the new list of watched movies
      localStorage.setItem('watchedMovies', JSON.stringify(newWatched))
      console.log('Updated localStorage:', localStorage.getItem('watchedMovies'))

      return newWatched
    })
  }

  function removeWatchedMovie(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  const removeSelectedId = () => {
    setSelectedId(null)
  }

  let url = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`

  const fetchMovies = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(url)
      // console.log(response)
      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      if (data.Response === 'False') throw new Error('Movie not found')
      setMovies(data.Search)
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
      // console.error('Error fetching movies:', error.message)
    }
  }

  // Setting localStorage here and run it everytime watched is a new state
  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watched))
  }, [watched])

  useEffect(() => {
    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }
    fetchMovies()
  }, [query])
  // A SideEffect being done directly in the component | Not a good idea to do so

  return (
    <>
      {/* <Navigation movies={movies} /> */}

      <Navigation
        query={query}
        setQuery={setQuery}
      >
        <NumResults movies={movies} />
      </Navigation>

      <Main
        movies={movies}
        isLoading={isLoading}
        error={error}
        handleSelectedId={handleSelectedId}
        selectedId={selectedId}
        removeSelectedId={removeSelectedId}
        watchedMovies={watched}
        setWatched={setWatched}
        removeWatchedMovie={removeWatchedMovie}
      />

      {/* <Modal>
        <Success />
        <Failure />
      </Modal> */}

      {/* <StarRating /> */}
    </>
  )
}

// Structural Component
function Navigation({ children, query, setQuery }) {
  return (
    <nav className="grid grid-cols-3 items-center h-[7.2rem] py-0 px-[3.2rem] bg-primary rounded-[0.9rem] text-white">
      <Logo />
      <Search
        query={query}
        setQuery={setQuery}
      />
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
function Search({ query, setQuery }) {
  const inputElem = useRef(null)
  // useEffect is not a good option to update the DOM directly if required at times.
  // instead we use the hook called useRef.
  /* ---
  useEffect(() => {
    const el = document.querySelector('.search')
    el.focus()
    el.style.border = '1px solid orange'
  }, [])
 --- */

  useEffect(() => {
    const domInput = inputElem.current
    function callback(e) {
      if (e.code === 'Enter') {
        domInput.focus()
        domInput.style.border = '1px solid orange'

        if (document.activeElement === inputElem.current) {
          return
        }
        setQuery('')
      }
    }

    // Scenario: We want to make sure that when we hit the Enter keypress the search gets focus

    document.addEventListener('keydown', callback)

    // Clean up is important
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [])
  return (
    <input
      className="justify-self-center border-none px-[1.6rem] py-[1.1rem] text-[1.8rem] rounded-[0.7rem] w-[40rem] transition-all duration-300 text-custom-text bg-primary-light placeholder-custom-text-dark focus:outline-none focus:shadow-[0_2.4rem_2.4rem_rgba(0,0,0,0.1)] focus:transform focus:-translate-y-0.5 search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputElem}
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
function Main({
  movies,
  isLoading,
  error,
  handleSelectedId,
  selectedId,
  removeSelectedId,
  watchedMovies,
  setWatched,
  removeWatchedMovie
}) {
  return (
    <main className="mt-[2.4rem] flex gap-[2.4rem] justify-center h-[calc(100vh-7.2rem-3*2.4rem)]">
      <MoviesList
        movies={movies}
        isLoading={isLoading}
        error={error}
        handleSelectedId={handleSelectedId}
      />

      <MoviesWatched
        selectedId={selectedId}
        removeSelectedId={removeSelectedId}
        watchedMovies={watchedMovies}
        setWatched={setWatched}
        removeWatchedMovie={removeWatchedMovie}
      />
    </main>
  )
}

// 1. Left Side | MoviesList
function MoviesList({ movies, isLoading, error, handleSelectedId }) {
  const [isOpen1, setIsOpen1] = useState(true)

  return (
    <div className="w-[42rem] max-w-[42rem] bg-custom-text-dark rounded-[0.9rem] relative overflow-y-auto">
      <button
        className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] w-[2.4rem] rounded-full border-none text-white text-[1.4rem] font-bold cursor-pointer z-50 flex items-center justify-center bg-custom-background-100"
        onClick={() => setIsOpen1(open => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>

      {isOpen1 && (
        <Movies
          movies={movies}
          isLoading={isLoading}
          error={error}
          handleSelectedId={handleSelectedId}
        />
      )}
    </div>
  )
}

function Movies({ movies, isLoading, error, handleSelectedId }) {
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <ListOfMovies
          movies={movies}
          handleSelectedId={handleSelectedId}
        />
      )}
      {error && <h3 className="text-3xl text-center mt-8">{error}</h3>}
    </>
  )
}

function Loader() {
  return <h3 className="text-3xl text-center mt-8">Loading...</h3>
}

function ListOfMovies({ movies, handleSelectedId }) {
  return (
    <ul className="py-[0.8rem] px-0 list-none overflow-y-auto">
      {movies?.map(movie => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSelectedId={handleSelectedId}
        />
      ))}
    </ul>
  )
}
// Stateless Presentational component
function Movie({ movie, handleSelectedId }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[4rem_1fr] grid-rows-[1.6rem auto] text-[1.6rem] bg-custom-text py-[1.6rem] px-[3.2rem] border-b-[1px_solid_custom-background-100] cursor-pointer transition-all duration-300 hover:bg-primary-light hover:text-white gap-x-[1rem]"
      onClick={() => {
        handleSelectedId(movie.imdbID)
      }}
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

// 2. Right Side | MoviesWatched
function MoviesWatched({
  selectedId,
  removeSelectedId,
  watchedMovies,
  setWatched,
  removeWatchedMovie
}) {
  const [isOpen2, setIsOpen2] = useState(true)

  return (
    <div className="w-[42rem] max-w-[42rem] bg-custom-text-dark rounded-[0.9rem] relative overflow-y-auto">
      <button
        className="absolute top-[0.8rem] right-[0.8rem] h-[2.4rem] w-[2.4rem] rounded-full border-none text-white text-[1.4rem] font-bold cursor-pointer z-50 flex items-center justify-center bg-custom-background-100"
        onClick={() => setIsOpen2(open => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>

      {selectedId ? (
        <MovieDetail
          selectedId={selectedId}
          removeSelectedId={removeSelectedId}
          watched={watchedMovies}
          setWatched={setWatched}
        />
      ) : (
        <MovieDetailsWrapper
          isOpen2={isOpen2}
          watched={watchedMovies}
          removeWatchedMovie={removeWatchedMovie}
        />
      )}
    </div>
  )
}

function MovieDetailsWrapper({ isOpen2, watched, removeWatchedMovie }) {
  return (
    <>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList
            watched={watched}
            removeWatchedMovie={removeWatchedMovie}
          />
        </>
      )}
    </>
  )
}
// Stateless presentational component | We are using derived state here
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => Number(movie.imdbRating)))
  const avgUserRating = average(watched.map(movie => Number(movie.userRating)))
  const avgRuntime = average(watched.map(movie => Number(movie.runtime)))
  console.log(avgRuntime)
  return (
    <div className=" rounded-[0.9rem] shadow-md p-[2.2rem_3.2rem_1.8rem_3.2rem] hover:bg-primary-light hover:text-white cursor-pointer">
      <h2 className="uppercase text-[1.6rem] mb-[0.6rem] ">Movies you watched</h2>
      <div className="flex items-center gap-[2.4rem] text-[1.6rem] font-semibold">
        <p className="flex items-center gap-[0.8rem]">
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="flex items-center gap-[0.8rem]">
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
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
function WatchedList({ watched, removeWatchedMovie }) {
  return (
    <ul className="list py-[0.8rem] px-0 list-none">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          removeWatchedMovie={removeWatchedMovie}
        />
      ))}
    </ul>
  )
}

// Presentational Component | Stateless
function WatchedMovie({ movie, removeWatchedMovie }) {
  return (
    <li
      key={movie.imdbID}
      className="relative grid grid-cols-[6rem_1fr] grid-rows-[auto_auto] text-[1.6rem]  bg-custom-text py-[1.6rem] px-[3.2rem] border-b-[1px_solid_custom-background-100] cursor-pointer transition-all duration-300 hover:bg-primary-light hover:text-white  gap-x-[1rem]"
    >
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="w-full h-full row-start-1 row-span-full"
      />
      <h3 className="grid-row-2 col-span-1 text-3xl">{movie.title}</h3>
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

        <button onClick={() => removeWatchedMovie(movie.imdbID)}>❌</button>
      </div>
    </li>
  )
}

// 3. WatchedMovies also have another toggling component, SelectedMovieDetail
function MovieDetail({ selectedId, removeSelectedId, watched, setWatched, removeWatchedMovie }) {
  const [movieDetail, setMovieDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  let url = `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`

  async function getMovieDetail() {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Something went wrong while fetching data')
      }

      const data = await response.json()
      console.log(data)
      setMovieDetail(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  // We must not forget that useEffect is rendered only after the Browser Paint, which happens after the COMMIT PHASE not after re-rendering of Virtual DOM
  useEffect(() => {
    getMovieDetail()
  }, [selectedId])
  return (
    <div className="">
      <header>
        <button
          className="absolute top-[0.8rem] left-[0.8rem] h-[2.4rem] w-[2.4rem] rounded-full border-none text-white text-[1.4rem] font-bold cursor-pointer z-50 flex items-center justify-center bg-custom-background-100"
          onClick={removeSelectedId}
        >
          &larr;
        </button>
      </header>

      {movieDetail?.Title && (
        <MovieDetailInfo
          movie={movieDetail}
          loading={loading}
          removeSelectedId={removeSelectedId}
          watched={watched}
          setWatched={setWatched}
          selectedId={selectedId}
          removeWatchedMovie={removeWatchedMovie}
        />
      )}
    </div>
  )
}

function MovieDetailInfo({ movie, loading, removeSelectedId, watched, setWatched, selectedId }) {
  const [userRating, setUserRating] = useState(0)

  console.log('***************')
  console.log(movie.runtime)
  const {
    Title: title,
    Year: year,
    Rated: rated,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Writer: writer,
    Actors: actors,
    Plot: plot,
    Language: language,
    Country: country,
    Awards: awards,
    Poster: poster,
    Ratings: ratings,
    Metascore: metascore,
    imdbRating: imdbRating,
    imdbVotes: imdbVotes,
    imdbID: imdbID,
    Type: type,
    DVD: dvd,
    BoxOffice: boxOffice,
    Production: production,
    Website: website,
    Response: response
  } = movie

  function handleUserRating(userRatingStars) {
    setUserRating(userRatingStars)
  }

  // Handle the watched elements, basically we'll add new watched items to the list
  function handleAddWatched(movie) {
    setWatched(prevWatched => {
      let isWatched = watched.find(moviePrev => moviePrev.imdbID === movie.imdbID)
      if (isWatched) {
        return watched
      }

      const newWatched = [...prevWatched, movie]

      // This can be done in the effect as well
      // localStorage.setItem('watchedMovies', JSON.stringify(newWatched))

      return newWatched
    })
  }

  // A side-effect | Adding title
  useEffect(() => {
    if (!title) return
    document.title = `${title}`

    // Clean up function | When component unmounts and also on state update I believe
    return () => {
      document.title = 'Movies App'
    }
  }, [title])

  let isMovieWatched = watched.map(movie => movie.imdbID).includes(selectedId)
  let userRatingOfMovie = watched.find(movie => movie.imdbID === selectedId)

  function handleWatchedAddList() {
    console.log('Checking the runtime:', runtime)
    const movieWatched = {
      imdbID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(' ').at(0) || 0),
      userRating: userRating,
      isWatched: true
    }
    handleAddWatched(movieWatched)
    removeSelectedId()
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="grid grid-cols-[140px_1fr]">
        <img
          src={poster}
          alt={`Poster of ${title} movie`}
          className="w-full"
        />
        <div className="details-overview ">
          <h2>{title}</h2>

          <div className="text-xl">
            <p>
              {released} &bull; {runtime}
            </p>

            <p className="my-5">{genre}</p>
            <p>
              <span>🌟</span>
              {imdbRating} IMDb Rating
            </p>
          </div>
        </div>
      </div>

      <section className="p-6 mt-5">
        {!isMovieWatched ? (
          <>
            <StarRating
              handleUserRating={handleUserRating}
              length={10}
            />

            {userRating > 0 && (
              <button
                className="px-3 py-2 text-white text-[1.4rem] font-bold cursor-pointer  bg-blue-700 rounded-md mt-4"
                onClick={handleWatchedAddList}
              >
                + Add To List
              </button>
            )}
          </>
        ) : (
          <p>
            You have already watched this with the rating{' '}
            <strong>{userRatingOfMovie.userRating}</strong> 🌟
          </p>
        )}

        <p className="text-2xl text-emerald-900 text mt-6">
          <em>{plot}</em>
        </p>
        <p className="my-4  text-xl text-orange-900 font-semibold shadow-sm ">Starring {actors}</p>
        <p className="font-bold text-2xl">Directed by {director}</p>
      </section>
    </>
  )
}
