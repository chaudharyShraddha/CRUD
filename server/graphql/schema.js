const { buildSchema } = require('graphql');


module.exports = buildSchema(`
scalar Upload

type books{
    _id: String
    title: String
    author: String
    description: String
    published_year: String
    publisher: String
    updated_date: String 
}

type CommonResponse{
    _id: String
    status: String
    message: String
}

input addBookInput{
    title: String
    author: String
    description: String
    published_year: String
    publisher: String
}

type RootQuery {
    getAllBooks: [books]
    getbookById(id: String!): books
}

type RootMutation {
    addBook(title: String,author: String,description: String,published_year: String,publisher: String): CommonResponse
    updateBook(id:String,title: String,author: String,description: String,published_year: String,publisher: String): CommonResponse
    removeBook(id: String!): CommonResponse
}

schema {
    query: RootQuery
    mutation: RootMutation
  }
`);