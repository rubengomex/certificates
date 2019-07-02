import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

const Company = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      // eslint-disable-next-line no-use-before-define
      type: new GraphQLList(User),
      resolve: async parent => {
        console.log(parent)
        const company = await axios
          .get(`http://localhost:3000/companies/${parent.id}/users`)
          .then(({ data }) => data)

        return company
      }
    }
  })
})

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: Company,
      resolve: async parent => {
        const company = await axios
          .get(`http://localhost:3000/companies/${parent.companyId}`)
          .then(({ data }) => data)

        return company
      }
    }
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: async (parent, { firstName, age }) => {
        const user = await axios
          .post('http://localhost:3000/users', { firstName, age })
          .then(({ data }) => data)

        return user
      }
    },
    editUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve: async (parent, {
        id, firstName, age, companyId
      }) => {
        const user = await axios
          .patch(`http://localhost:3000/users/${id}`, {
            firstName,
            age,
            companyId
          })
          .then(({ data }) => data)

        return user
      }
    },
    deleteUser: {
      type: User,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: async (parent, { id }) => {
        const user = await axios
          .delete(`http://localhost:3000/users/${id}`)
          .then(({ data }) => data)

        return user
      }
    }
  }
})

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: User,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const user = await axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(({ data }) => data)

        return user
      }
    },
    company: {
      type: Company,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        const company = await axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(({ data }) => data)

        return company
      }
    }
  }
})

export default new GraphQLSchema({ query, mutation })
