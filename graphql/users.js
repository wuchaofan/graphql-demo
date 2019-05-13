
const graphql = require('graphql');
import {User} from '../db'

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    name: { type: GraphQLString }, 
  })
});


const UserListType = new GraphQLObjectType({
    name: 'users',
    fields: () => ({
      list: { type: new GraphQLList(User) }, 
    })
});

export {
    UserListType,
    UserType
}
  