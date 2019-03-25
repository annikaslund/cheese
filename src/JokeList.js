import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [] //{joke: "contents", id: "", upCount: #, downCount: #}
        } 

        this.voteUp = this.voteUp.bind(this);
        //this.voteDown = this.voteDown.bind(this);
    }

    // handles joke up vote click from child (Joke)
    voteUp(id){
        const updateJokeCount = this.state.jokes.map( joke => {
            if (joke.id === id){
                return {...joke, upCount: joke.upCount + 1}
            }
            return joke;
        })

        this.setState({ jokes: updateJokeCount })
    }

    //handles joke down vote click from child (Joke)
    voteDown(id){
        const updateJokeCount = this.state.jokes.map( joke => {
            if (joke.id === id){
                return {...joke, downCount: joke.downCount - 1}
            }
            return joke;
        })

        this.setState({ jokes: updateJokeCount })
    }

    // runs after first render 
    // makes API calls to dadjokez
    async componentDidMount() {
        const URL = "https://icanhazdadjoke.com/";
        const header = {headers: {"Accept": "application/json"}};

        let responses = [];

        for (let i = 0; i < 10; i++){
            let response = axios.get(URL, header);
            responses.push(response);
        }

        let jokes = await Promise.all(responses);
        let newJokes = jokes.map(joke => {
            return {...joke.data, upCount: 0, downCount: 0};
        })
        
        this.setState({
           jokes: newJokes
        })
    }

    render() {
        return (
            <div className="JokeList">
                {this.state.jokes.map(joke => <Joke jokeText={joke.joke} total={joke.upCount + joke.downCount} handleUpClick={() => this.voteUp(joke.id)} handleDownClick={() => this.voteDown(joke.id)}/>)}
            </div>
        )
    }
}

export default JokeList;