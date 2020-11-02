import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_BOOKS = gql`
query getAllBooks {
  getAllBooks {
      _id
      title
      author
  }
}
`;

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {
        ({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          console.log("data",data);
          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h2 className="panel-title mt-5">
                    LIST OF BOOKS
                  </h2>
                  <Link to="/create" className="btn btn-dark mb-3" style={{width: "100px"}}>Add Book</Link>
                </div>
                <div className="panel-body mt-3">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.getAllBooks.map((book, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${book._id}`}>{book.title}</Link></td>
                          <td>{book.author}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
