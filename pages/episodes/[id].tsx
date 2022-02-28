import React from 'react'
import Image from 'next/image'
import {Episode, useGetEpisodesQuery} from '../../generated'
import {Character} from "../../types"
import { useGetCharacterQuery } from '../../generated'
import {useRouter} from 'next/router'
import EpisodeList from '../../components/EpisodeList'

const EpisodePage = () => {
  const router = useRouter()
  const {id} = router.query
  const {data, error, loading} = useGetEpisodesQuery({variables: {episodeID: id as string}})

  if(loading) return <div></div>
  if(error) return <div>{error.message}</div>

  return (
  <div>
    {data?.episode?.name}
  </div>
  )
}

export default EpisodePage