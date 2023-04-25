import { useState, useEffect, useRef, useCallback } from 'react';
import { TextInput, MovieItem, Select } from './styles/styledContainers';
import { listFunc } from './utils/utils'


type MoviesListObject = {
  id: string;
  title: string;
  genres: string[];
}

const App = () => {
  const [moviesList, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genres, setGenres] = useState<string[]>([])
  const [filterState, setFilterState] = useState('All')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const headers: RequestInit = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': process.env.REACT_APP_AUTHORIZATION || ''
      },
      mode: 'cors',
      cache: 'default',
    };

    (async () => {
      const results = await fetch(`https://code-challenge.spectrumtoolbox.com/api/movies`, headers)
      const movies = await results.json()

      const movieGenres: string[] = ['All']

      movies.data.forEach((elem: MoviesListObject) => {
        elem.genres.forEach((genre) => {
          if (!movieGenres.includes(genre)) {
            movieGenres.push(genre)
          }
        })
      })

      setMovies(movies.data)
      setGenres(movieGenres)
    })()
  }, [])

  const filterFunc = useCallback(() => {
    const reg = new RegExp(inputRef.current?.value || '', 'i')

    const results = moviesList.filter((elem: MoviesListObject) => {

      if (filterState === 'All') {
        return reg.test(elem.title)
      } else {
        return reg.test(elem.title) && elem.genres.includes(filterState)
      }
    })

    setFilteredMovies(results)
  }, [filterState, moviesList])


  useEffect(() => {
    if (filterState !== 'All') {
      filterFunc()
    }
  }, [filterState, filterFunc])


  const handleFilterChange = (e: any) => {
    setFilterState(e.target.value)
  }


  const filterResults = filteredMovies.map(listFunc).length === 0 ? (<MovieItem>No results were found</MovieItem>) : filteredMovies.map(listFunc)


  return (
    <div className="App">
      <TextInput ref={inputRef} placeholder='Search by Title' onChange={filterFunc}/>
      <Select value={filterState} onChange={handleFilterChange}>
        {genres.map((elem, index) => {
          return <option key={index}>{elem}</option>
        })}
      </Select>
      {inputRef?.current?.value.length || filterState !== 'All' ? filterResults : moviesList.map(listFunc)}
    </div>
  );
}

export default App;
