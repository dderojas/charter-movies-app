import { CollapsibleMovieContainer } from "../components"
import { ImageContainer, MovieItem, Details} from '../styles/styledContainers'

type MoviesListObject = {
  id: string;
  title: string;
  genres: string[];
}

const doesImageExist = (id: string) => {
  try {
    return require(`../movieHeroImages/${id}.jpeg`)
  } catch(e) {
    return require(`../movieHeroImages/defaultImage.jpeg`)
  }
}

const listFunc = (elem: MoviesListObject, index: number) => (
    <CollapsibleMovieContainer key={index} open={false}>
      <ImageContainer src={doesImageExist(elem.id)} alt=""/>
      <MovieItem>
        {elem.title}
      </MovieItem>
      <Details>Genres: {elem.genres.map((item, index) => <MovieItem key={index}>{item}</MovieItem>)}</Details>
    </CollapsibleMovieContainer>
)

export {
  doesImageExist,
  listFunc
}