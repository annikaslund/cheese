import React, { Component } from 'react';

class Joke extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
        
    // }
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