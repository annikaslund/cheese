import React, { Component } from 'react';

class Joke extends Component {
    // if count total has changed, will only re-render that Joke
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.total !== nextProps.total
    }

    // renders a joke containing joke text, buttons for upvoting and downvoting, and the net total of votes.
    render(){
        return (
            <div className="Joke">
                {this.props.jokeText}
                <button onClick={this.props.handleUpClick}>Up</button>
                {this.props.total}
                <button onClick={this.props.handleDownClick}>Down</button>
            </div>
        );
    }
}

export default Joke;