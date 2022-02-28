import React from 'react'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import type {Episode} from '../../generated'

import {Character} from "../../types"
import { useGetCharacterQuery } from '../../generated'
import {useRouter} from 'next/router'
import EpisodeList from '../../components/EpisodeList'

const CharacterPage = () => {
  const router = useRouter()
  const {id} = router.query
  const {data, error, loading} = useGetCharacterQuery({variables: {userID: id as string}})

  if(loading) return <div></div>
  if(error) return <div>{error.message}</div>

  return (
  <div className="bg-gray-200">
  
  <div className="max-w-5xl px-5 py-24 mx-auto ">

    <div className="grid grid-cols-2 mx-auto ">
      <div className="">
        <Image className="object-cover object-center border border-gray-200 shadow-lg rounded-3xl" src={data?.character?.image as string} width={400} height={400} >

        </Image>
      </div>
      <div className="rounded-lg shadow-md bg-gray-50">
  <h1 className="px-3 py-4 mb-1 text-3xl font-medium text-gray-900 title-font">{data?.character?.name}</h1>
  <div className="flex flex-col max-w-md mb-4">
    <p className="p-4 ">
    <span className="font-semibold text-gray-700">Gender: </span>{data?.character?.gender}
    </p>
    <p className="p-4">
    <span className="font-semibold text-gray-700">Species: </span>{data?.character?.species}
    </p>
    <p className="p-4">
    <span className="font-semibold text-gray-700">Status: </span>{data?.character?.status}
    </p>
    <p className="p-4">
    <span className="font-semibold text-gray-700">Origin: </span>{data?.character?.origin?.name}
    </p>
  
  </div>
      </div>

    </div>

  
  <div className="col-span-2 mt-12">
  <EpisodeList episodes={data?.character?.episode as Episode[]}></EpisodeList>
  </div>
  </div>

  </div>
  )
}

// export const getInitialProps: GetServerSideProps = async (context) => {
//     const characterID = context
//     console.log(context)
//     return { 
//       props: {
//         characterID:characterID
//       }
//     }
//   }

//   export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
//     const character = await res.json();
  
//     return { 
//       props: {
//         character,
//       }
//     }
//   }


export default CharacterPage