import mongoose from 'mongoose'

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql'

const Lyric = mongoose.model('lyric')

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      // eslint-disable-next-line global-require
      type: require('./song_type').default,
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate('song')
          .then(lyric => {
            console.log(lyric)
            return lyric.song
          })
      }
    }
  })
})

export default LyricType
