import { useState } from 'react';
import styled from 'styled-components';

const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 0.5px solid #f2f2f2;
  background-color: white;
  padding-left: 20px;
`
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