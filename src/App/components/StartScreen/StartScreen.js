import React, { Component } from 'react';
import ButtonSound from './audio/button-sound.mp3';
import styles from './StartScreen.scss';

class StartScreen extends Component {
  audio = React.createRef();

  handleClick = () => {
    this.audio.current.play();
  }

  render () {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Car Races</h1>
        <button className={styles.playButton} onClick={this.handleClick}>Play</button>
        <audio id="audio" src={ButtonSound} ref={this.audio} />
      </div>
    );
  }
}

export { StartScreen };