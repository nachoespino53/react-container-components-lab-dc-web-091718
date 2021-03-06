import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'f98593a095b44546bf4073744b540da0';
// const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/all.json?'
//             + `api-key=${NYT_API_KEY}`;
const searchURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
+ `api-key=${NYT_API_KEY}&query=`;


export default class SearchableMovieReviewsContainer extends Component {

    constructor () {
        super();
        this.state = {
            searchTerm: '',
            reviews: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(searchURL+this.state.searchTerm).then(res => res.json()).then(json => this.setState({reviews:json.results}));
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }


    render () {
        return (
             <div className="searchable-movie-reviews"> 
                 <form onSubmit={this.handleSubmit}>
                     <label> Search </label>
                     <input type="text" id="search-input" onChange={this.handleChange} />
                     <input type="submit" />
                 </form>
                { this.state.reviews.length !== 0 && <h2>Movie Review By Search:</h2> }
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}