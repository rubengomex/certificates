import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

import mongoose from 'mongoose'
import SongType from './song_type'
import LyricType from './lyric_type'

const Song = mongoose.model('song')
const Lyric = mongoose.model('lyric')
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parent, { title }) {
        return new Song({ title }).save()
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parent, { content, songId }) {
        return Song.addLyric(songId, content)
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Lyric.like(id)
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Song.remove({ _id: id })
      }
    }
  }
})

export default mutation
