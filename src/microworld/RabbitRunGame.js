import React, { Component, forwardRef, useState, useImperativeHandle, useEffect } from "react";



class RabbitRunGame extends Component {
  constructor(props) {
    super(props);
  }


}


const GameInitiator = forwardRef((props, ref) => {
  console.log('game init')
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  useImperativeHandle(ref, () => ({
    getScore() {
      console.log('score')
      return score;
    },

    isGameOver() {
      console.log('over')
      return isGameOver;
    }
  }))

  const gameLoop = () => {
    setScore(score+1);
  }

  useEffect(() => {
      setScore(score +1);
  }, [setScore, score])

  return(
    <>
      <h1>Hi</h1>
    </>
  );


});

export default GameInitiator;