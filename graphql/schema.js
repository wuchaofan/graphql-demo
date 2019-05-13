const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql');
import {User} from '../db'
import {UserListType, UserType} from './users'

const RootQuery = new GraphQLObjectType({
  name: 'UserQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return User.findById(args.id)
      }
    },
    users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
            return User.find()
        }
    }
  }
})

const UserList = new GraphQLObjectType({
    name: 'UserListQueryType',
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          return User.find()
        }
      }
    }
})

const UserQuery = new GraphQLSchema({
    query: RootQuery
});

const UserListQuery = new GraphQLSchema({
    query: UserList
});

export {
    UserQuery,
    UserListQuery
}