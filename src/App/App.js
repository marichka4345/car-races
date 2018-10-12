import React, { Component } from 'react';
import { Loader } from './components/Loader/';
import { Game } from './components/StartScreen/components/Game/Game';
import '../styles/index.scss';

export class App extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => { this.setState({ isLoading: false }) }, 3000);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div>
        {
          // isLoading
          // ? <Loader />
          // : <Game />

          <Game />
        }
      </div>
    );
  }
}