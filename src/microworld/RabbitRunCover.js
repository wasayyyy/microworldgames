import React, { useEffect, useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate  } from "react-router-dom";
import RabbitRunGame from "./RabbitRunGame";


const RabbitRun = (props) => {
  const gameOverRef = useRef(null);
  const gameScoreRef = useRef(null);
  const navigation = useNavigate();
  const [showCover, setShowcover] = useState(true);
  const [gameInstance, setGameInstance] = useState(false);
  const [showGameContent, setShowGameContent] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);


  const isValidAddress = () => {
    if (localStorage.xrpAddress) {
        return props.ledger.isValidAddress(localStorage.xrpAddress);
    }

    return false;
  }

  const redirectToAuth = () => {
    localStorage.setItem('href', "/microworldgames/RabbitRun");
    navigation('/microworldgames/Auth', { state: { name:'Xyz' }});
  }

  useEffect(() => {
    if (!isValidAddress()) {
      redirectToAuth();
    } else if(!gameInstance) {
      //setGameInstance(true);
    }
    
    if (!showCover){
      setShowGameOver(true);
      console.log(gameScoreRef.current.getScore())
    }
  }, [gameScoreRef]);

  return (
    <>
      <div className="App-header">
        {showCover &&
        <StartCover
          show={showCover}
          onHide={() => {
            setShowcover(false)
            setShowGameContent(true)
          }}
         />}

         {showGameContent &&
         <GameComponents
          show={showGameContent}
          gameOver={showGameOver}
          onHide={()=> setShowGameContent(false)}
          onGameover={()=>setShowGameOver(true)}
         />
         }

         {showGameOver && 
         <GameOver
         />}

         {gameInstance && !showCover &&
         <RabbitRunGame
         ref={gameScoreRef}
         />}
      </div>
    </>
  );
}


const StartCover = (props) => {
  const onClick = () => {
    props.onHide();
  }

  return(
    <>
        <header className="masthead">
            <Container>
                <div className="masthead-heading">MicroWorld Games!</div>
                <div className="masthead-subheading text-uppercase">Welcome to Rabbit Run Game</div>
                <Button onClick={onClick} className="btn btn-primary btn-xl text-uppercase">Click to Start</Button>
            </Container>
        </header>
    </>
  );
}

const GameComponents = (props) => {
  return(
    <>
      <div id="world"></div>
        <div className="dist">
          <div className="label">distance</div>
          <div className="distValue">000</div>
        </div>
        <div className="instructions">
          Click to JUMP
          <span className="lightInstructions">
             — Grab the carrots and avoid the hedgehogs
          </span>
        </div>
    </>
  );
}

const GameOver = (props) => {
  return(
    <>
      <div className="gameoverInstructions">
        Game Over
      </div>
    </>
  );
}

export default RabbitRun;