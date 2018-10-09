import React, { Component } from 'react';
import { Loader } from './components/Loader/';
import { StartScreen } from './components/StartScreen/';
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
          isLoading
          ? <Loader />
          : <StartScreen />
        }
      </div>
    );
  }
}