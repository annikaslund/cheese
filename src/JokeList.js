import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [] //{joke: "contents", id: "", upCount: #, downCount: #}
        } 
        //this.voteUp = this.voteUp.bind(this);
        //this.voteDown = this.voteDown.bind(this);
    }

    //handles joke up vote click from child (Joke)
    // voteUp(){

    // }

    //handles joke down vote click from child (Joke)
    // voteDown(){

    // }

    // runs after first render 
    // makes API calls to dadjokez
    async componentDidMount() {
        const URL = "https://icanhazdadjoke.com/search?limit=10";
        const header = {headers: {"Accept": "application/json"}};
        let response = await axios.get(URL, header);
        let jokes = response.data.results;
        let newJokes = jokes.map(joke => {
            return {...joke, upCount: 0, downCount: 0};
        })

        this.setState({
           jokes: newJokes
        })
    }

    render() {
        return (
            <div className="JokeList">
                
            </div>
        )
    }
}

export default JokeList;