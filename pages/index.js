import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [money, setMoney] = useState({
    Amount: 0,
    ThiefCount: 0,
    Step: 10,
    Sign: '$',
    MaxTime: 100,
  });
  const [position, setPosition] = useState({
    left: '20vw',
    top: '50vh'
  });
  const [thiefButton, setThiefButton] = useState({
    Show: false
  });
  const [actionTime, setActionTime] = useState({
    CountDown: 100
  });
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    let left = parseInt((Math.random() * 90)) + 'vw';
    let top = parseInt(10 + (Math.random() * 80)) + 'vh';
    setPosition({left, top});
  }, [money]);

  const startTimer = () => {
    let count = money.MaxTime;
    let countInterval = setInterval(() => {
      count = count - 1;
      if(count >= 0){
        setActionTime({CountDown: count});
      }
      else {
        clearInterval(countInterval);
        setGameEnd(true);
      }
    }, 1000);
  };

  const handleThiefDisplay = () => {
    setThiefButton({Show: true});
    startTimer();
  };

  const handleReset = () => {
    setMoney({
      Amount: 0,
      ThiefCount: 0,
      Step: 10,
      Sign: '$',
      MaxTime: 100,
    })
    startTimer();
    setGameEnd(false);
  }

  const handleThief = (money) => {
    let step = money.Step;

    if((money.Amount / money.Step) > 10) {
      step = money.Step + money.Step;
    }

    let newMoney = {
      Amount: money.Amount + money.Step,
      Step: step,
      Sign: money.Sign,
      MaxTime: money.MaxTime,
      ThiefCount: money.ThiefCount + 1
    }

    setMoney(newMoney);
  };

  const banner = () => {
    return (
      <div className={styles.FlexCenter} >
        <div className={styles.TextCenter}>
          <h1>Catch the Theives</h1>
          <p>Thief can appear anywhere on screen. <br />
            To catch, click on them and collect the prize <br /> 
            Catch as many thief as you can before time runs out.</p>
          <button className={styles.Start} onClick={handleThiefDisplay}> Start </button>
        </div>
      </div>
    );
  };

  const gameWindow = () => {
    return (
      <div>
        <div className={styles.Info}>
          Prize Money: <b>{money.Sign} {money.Amount}</b> &nbsp; &nbsp; Time Left: <b>{actionTime.CountDown}</b> seconds
        </div>
        <button 
          className={styles.Thief} 
          onMouseDown={() => handleThief(money)}
          style={{left:position.left, top: position.top}}
        > 
          Thief 
        </button>
      </div>
    );
  };

  const endWindow = () => {
    return (
      <div className={styles.FlexCenter}>
        <div className={styles.TextCenter}>
          <p>
            Congrats you have collected {<b>{money.Sign}{money.Amount}</b>} by catching <b>{money.ThiefCount}</b> Thieves.<br />
            Keep up the good work
          </p>
          <button className={styles.Start} onClick={handleReset}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Catch The Thief</title>
        <meta name="description" content="Catch the button" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!thiefButton.Show && banner()}
      {thiefButton.Show && !gameEnd && gameWindow()}
      {gameEnd && endWindow()} 
    </div>
  )
}
