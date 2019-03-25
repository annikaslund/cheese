import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import Joke from './Joke';

class JokeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [] //{joke: "contents", id: "", upCount: #, downCount: #}
        } 
    }


    changeVote(id, delta) {
        // logic of changing vote +1/-1
    }

    // handles joke up vote click from child (Joke)
    voteUp(id){
        this.setState(st => ({
            jokes: st.jokes.map(joke => {
                return joke.id === id ? {...joke, upCount: joke.upCount + 1} : joke
            })
        }))
    }

    //handles joke down vote click from child (Joke)
    voteDown(id){
        this.setState(st => ({
            jokes: st.jokes.map(joke => {
                return joke.id === id ? {...joke, downCount: joke.downCount - 1} : joke
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
            return {...joke.data, upCount: 0, downCount: 0};
        })
        
        this.setState({
           jokes: newJokes
        })
    }

    // renders a list of 10 jokes 
    render() {
        return (
            <div className="JokeList">
                {this.state.jokes.map(joke => 
                    <Joke key={ uuid() } 
                        jokeText={joke.joke} 
                        total={joke.upCount + joke.downCount} 
                        handleUpClick={() => this.voteUp(joke.id)} 
                        handleDownClick={() => this.voteDown(joke.id)}/>
                    )}
            </div>
        )
    }
}

export default JokeList;