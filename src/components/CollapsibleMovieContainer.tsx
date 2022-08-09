import { useState } from 'react';
import { MovieContainer } from '../styles/styledContainers';

type Props = {
  children: JSX.Element[]
  open: Boolean
}


const CollapsibleMovieContainer = ({ children, open }: Props) => {
  const [isOpen, setOpen] = useState(open)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <MovieContainer onClick={handleClick}>
      {children[0]}
      {children[1]}
      {isOpen && children[2]}
    </MovieContainer>
  )
}

export default CollapsibleMovieContainer;