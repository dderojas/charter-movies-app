import styled from 'styled-components';

const ImageContainer = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-style: solid;
  border-width: 1px;
  border-color: #999999;
  object-fit: cover;
`
const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 0.5px solid #f2f2f2;
  background-color: white;
  padding-left: 20px;
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

const Select = styled.select`
  font-size: 24px;
  padding: 20px;
  margin-bottom: 20px;
  color: white;
  background-color: #808080;
`

const Details = styled.span`
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 0.5px solid #f2f2f2;
  background-color: #e6e6e6;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 20px;
  color: black;
`

export {
  ImageContainer,
  MovieItem,
  TextInput,
  Select,
  MovieContainer,
  Details
}