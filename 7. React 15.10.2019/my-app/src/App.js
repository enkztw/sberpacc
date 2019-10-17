import React from 'react';
import './App.css';

const MyButton = (props) => {
  const style = {
    backgroundColor: 'blue',
    color: '#fff',
    padding: '20px'
  }
  return <button style={style} onClick={props.handler} className='my-button'>{props.str}</button>
}

/**
 * Как высчитываются очки
 * 
 *.----------.------.-------.----------.
 *|          | Rock | Paper | Scissors |
 *:----------+------+-------+----------:
 *| Rock     |    0 |     0 |        1 |
 *:----------+------+-------+----------:
 *| Paper    |    1 |     0 |        0 |
 *:----------+------+-------+----------:
 *| Scissors |    0 |     1 |        0 |
 *'----------'------'-------'----------'
 * */

const truthTable = [
    [0,0,1],
    [1,0,0],
    [0,1,0]
]

const checkWinner = (playerChoice, computerChoice) => {
    const playerScore = truthTable[playerChoice][computerChoice];
    const computerScore = truthTable[computerChoice][playerChoice];
    if (playerScore > computerScore) {
        return 'Ты';
    } else if (computerScore > playerScore) {
        return 'Комп';
    } else if (playerScore === computerScore) {
        return 'Никто';
    }
}

const buttons = [{str: 'камень', type: 'rock', score: 0}, {str: 'бумага', type: 'paper', score: 1}, {str: 'ножницы', type: 'scissors', score: 2}]

export default class App extends React.Component {

    state = {
        compChoice: '',
        userChoice: '',
        winner: ''
    }
    
    getRandomNum = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
  }

    onClickHandler = (score) => {
      const compChoice = this.getRandomNum(0, 2);
      const userChoice = score;
      this.setState({
        compChoice,
        userChoice,
      })
    }


  render() {
    const compChoiceName = (this.state.compChoice !== ``) && buttons[this.state.compChoice].str;
    const userChoiceName = (this.state.userChoice !== ``) && buttons[this.state.userChoice].str;
    const winner = (this.state.userChoice !== `` && this.state.compChoice !== ``) && checkWinner(this.state.userChoice, this.state.compChoice);
    return (
        <div className="App">
          <header className="App-header">
              <p>Камень, Ножницы, Бумага!</p>
          </header>
            <div>
                {buttons.map((button) => <MyButton {...button} handler={() => this.onClickHandler(button.score)} />)}
            </div>
            <div>
            <p>Комп выбрал: {compChoiceName}</p>
            <p>А твой выбор: {userChoiceName}</p>
            <p>Победитель: {winner}</p>
            </div>
        </div>
    );
  }
}
