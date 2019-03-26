import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';

class JokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [], //{joke: "contents", id: "", total: #}
            loading: true
        } 
        this.changeVote = this.changeVote.bind(this);
    }

    changeVote(id, delta) {
        // logic of changing vote +1/-1 (delta)
        this.setState(st => ({
            jokes: st.jokes.map(joke => {
                return joke.id === id ? {...joke, total: joke.total + delta} : joke
            })
        }))
    }

    // runs after first render 
    // makes API calls to dadjokez
    async componentDidMount() {
        const URL = "https://icanhazdadjoke.com/";
        const header = {headers: {"Accept": "application/json"}};

        let promises = [];

        for (let i = 0; i < 10; i++){
            let promise = axios.get(URL, header);
            promises.push(promise);
        }

        let jokes = await Promise.all(promises);
        let newJokes = jokes.map(joke => {
            return {...joke.data, total: 0};
        })
        
        this.setState({
           jokes: newJokes,
           loading: false
        })
    }

    // renders a list of 10 jokes 
    render() {
        let jokeArr = this.state.jokes.map(joke => 
            <Joke key={ uuid() } 
                jokeText={joke.joke} 
                total={joke.total} 
                handleUpClick={() => this.changeVote(joke.id, +1)}
                handleDownClick={() => this.changeVote(joke.id, -1)}
                />
            )
        return (
            <div className="JokeList">
            { this.state.loading === true ? "loading..." : jokeArr }
            </div>
        )
    }
}

export default JokeList;