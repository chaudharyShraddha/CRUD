import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_BOOK = gql`
    query getbookById($id: String!) {
        getbookById(id: $id) {
            _id
            title
            author
            description
            published_year
            publisher
            updated_date
        }
    }
`;

const DELETE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id:$id) {
      status
      message
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_BOOK} variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                console.log("data me",data);
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
        
                return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading mt-5">
                            <Link to="/" className="btn btn-info mb-5" style={{width: "180px"}}>Book List</Link>
                                <h3 className="panel-title">
                                {data.getbookById.title}<hr/>
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>Author:</dt>
                                    <dd>{data.getbookById.author}</dd>
                                    <dt>Description:</dt>
                                    <dd>{data.getbookById.description}</dd>
                                    <dt>Published Year:</dt>
                                    <dd>{data.getbookById.published_year}</dd>
                                    <dt>Publisher:</dt>
                                    <dd>{data.getbookById.publisher}</dd>
                                    <dt>Updated:</dt>
                                    <dd>{data.getbookById.updated_date}</dd>
                                </dl>
                                <Mutation mutation={DELETE_BOOK} key={data.getbookById._id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeBook, { loading, error }) => (
                                        <div className="mt-2">
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeBook({ variables: { id: data.getbookById._id } });
                                                }}>
                                                <Link to={`/edit/${data.getbookById._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;