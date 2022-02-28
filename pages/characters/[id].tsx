import React from 'react'
import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import type {Episode} from '../../generated'

import {Character} from "../../types"
import { useGetCharacterQuery } from '../../generated'
import {useRouter} from 'next/router'
import EpisodeList from '../../components/EpisodeList'
import Link from 'next/link'

const CharacterPage = () => {
  const router = useRouter()
  const {id} = router.query
  const {data, error, loading} = useGetCharacterQuery({variables: {userID: id as string}})

  if(loading) return <div></div>
  if(error) return <div>{error.message}</div>

  return (
 
 
 
 
    <div className="grid max-w-5xl grid-cols-1 px-5 py-24 mx-auto md:grid-cols-2 ">


    <div className="col-span-1 mb-24 text-left">
            
                  <ul>
                    <li
                   
                      className="m-6"
                    >
                      <div className="secondary-t">
                        <div className="flex flex-col w-full ">
                        <Link  href="/">
                        <span  className="max-w-xs mt-6 font-semibold uppercase hover:underline hover:cursor-pointer spacing-wide">Go back</span> 
    
                        </Link>
                        <span className="mt-6 font-normal text-gray-400 uppercase spacing-wide">
                          Character Overview
                        </span>
                       
                        </div>
                        
                        <div className="flex items-center justify-between mt-6 font-bold ">
                          
                          <div>
                            <span className="text-4xl uppercase ">{data?.character?.name}</span>{" "}
                            <br></br>
                            <span className="text-lg font-semibold ">
                             {data?.character?.species}
                            </span>
                          </div>
                          
                        </div>
                      </div>
                    </li>
                    <li
                   
                      className="m-6 mt-12"
                    >
                      <div>
                        <span className="font-normal text-gray-400 uppercase spacing-wide">
                          Gender
                        </span>
                        <div className="mt-2 text-lg font-normal ">
                          <ul>
                            <li>
                              {data?.character?.gender}
                            </li>
                            
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li
                     
                      className="m-6 mt-12"
                    >
                      <div>
                        <span className="font-normal text-gray-400 uppercase spacing-wide">
                          Origin
                        </span>
                        <div className="flex flex-wrap mt-2 text-lg font-normal ">
                          {data?.character?.origin?.name}
                        </div>
                      </div>
                    </li>

                    <li
                     
                      className="m-6 mt-12"
                    >
                      <div>
                        <span className="font-normal text-gray-400 uppercase spacing-wide">
                          location
                        </span>
                        <div className="flex flex-wrap mt-2 text-lg font-normal ">
                          {data?.character?.location?.name}
                        </div>
                      </div>
                    </li>
                    <li
                     
                      className="m-6 mt-12"
                    >
                      <div>
                        <span className="font-normal text-gray-400 uppercase spacing-wide">
                          status
                        </span>
                        <div className="flex flex-wrap mt-2 text-lg font-normal ">
                          {data?.character?.status}
                        </div>
                      </div>
                    </li>
                    
                  </ul>
                  
                </div>
      <div className="flex items-center justify-center h-full mb-12 md:mb-0">
        <Image className="object-cover object-center mx-auto border border-gray-200 shadow-lg rounded-3xl" width="400" height="400"src={data?.character?.image as string} />

                  
      </div>

        <div className="col-span-1 md:col-span-2">
        <EpisodeList episodes={data?.character?.episode as Episode[]}></EpisodeList>

        </div>
      </div>

      
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
//  <div className="">
  
//   <div className="max-w-5xl px-5 py-24 mx-auto ">

//     <div className="grid grid-cols-2 mx-auto ">
//       <div className="">
//         <Image className="object-cover object-center border border-gray-200 shadow-lg rounded-3xl" src={data?.character?.image as string} width={400} height={400} >

//         </Image>
//       </div>
//       <div className="rounded-lg shadow-md bg-gray-50">
//   <h1 className="px-3 py-4 mb-1 text-3xl font-medium text-gray-900 title-font">{data?.character?.name}</h1>
//   <div className="flex flex-col max-w-md mb-4">
//     <p className="p-4 ">
//     <span className="font-semibold text-gray-700">Gender: </span>{data?.character?.gender}
//     </p>
//     <p className="p-4">
//     <span className="font-semibold text-gray-700">Species: </span>{data?.character?.species}
//     </p>
//     <p className="p-4">
//     <span className="font-semibold text-gray-700">Status: </span>{data?.character?.status}
//     </p>
//     <p className="p-4">
//     <span className="font-semibold text-gray-700">Origin: </span>{data?.character?.origin?.name}
//     </p>
  
//   </div>
//       </div>

//     </div>

  
//   <div className="col-span-2 mt-12">
//   <EpisodeList episodes={data?.character?.episode as Episode[]}></EpisodeList>
//   </div>
//   </div>

//   </div>
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