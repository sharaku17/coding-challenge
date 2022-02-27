import React from 'react'
import type { GetServerSideProps } from 'next'
import {Character} from "../../types"

const CharacterPage = ({character}:{character:Character}) => {
  return (
    <div className="text-3xl ">{character.name}</div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character = await res.json();
  
    return { 
      props: {
        character,
      }
    }
  }



export default CharacterPage