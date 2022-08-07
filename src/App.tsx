import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { CollapsibleMovieContainer } from './components'


type MoviesListObject = {
  id: string;
  title: string;
  genres: string[];
}

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-style: solid;
  border-width: 1px;
  border-color: #999999;
  object-fit: cover;
`
const MovieItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  padding-bottom: 20px;
`

const TextInput = styled.input`
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid #999999;
  margin-left: 10px;
  width: 90%;
  padding: 20px;
  font-size: 20px;
  &:focus {
    border-color: black;
  }
`

const App = () => {
  const [moviesList, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genres, setGenres] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const headers: RequestInit = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Api-Key q3MNxtfep8Gt'
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
  
  const handleChange = () => {
    const reg = new RegExp(inputRef.current?.value || '', 'i')

    const results = moviesList.filter((elem: MoviesListObject) => 
      reg.test(elem.title))

    setFilteredMovies(results)
  }

  const listFunc = (elem: MoviesListObject, index: number) => {
    
    return (
      <CollapsibleMovieContainer key={index} open>
        <ImageContainer src={doesImageExist(elem.id)} alt=""/>
        <MovieItem>
          {elem.title}
        </MovieItem>
      </CollapsibleMovieContainer>
    )
}

  // check to see if this is the best way
  const doesImageExist = (id: string) => {
    try {
      return require(`./movieHeroImages/${id}.jpeg`)
    } catch(e) {
      return require(`./movieHeroImages/defaultImage.jpeg`)
    }
  }

  return (
    <div className="App">
      <TextInput ref={inputRef} placeholder='Search by Title' onChange={handleChange}/>
      <select>
        {genres.map((elem, index) => {
          return <option key={index}>{elem}</option>
        })}
      </select>
      {inputRef?.current?.value.length ? filteredMovies.map(listFunc) : moviesList.map(listFunc)}
    </div>
  );
}

export default App;
