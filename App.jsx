import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = useState( () => generateAllNewDice())
    
    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id:nanoid()
            }))
    }
    

    const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

    if (gameWon) {
        
    }

    function hold(id) {
        setDice(prevDice => { console.log(prevDice);
            return prevDice.map(die => {console.log(die) 
            {
            return (die.id === id ? { ...die, isHeld: !die.isHeld } : die)
        }
        })
    })

    
    }
    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        } else {
            setDice(generateAllNewDice())
        }
    }
    const diceElements = dice.map(dieObj => (<Die key = {dieObj.id}
        value={dieObj.value} 
        isHeld={dieObj.isHeld}
        hold={hold}
        id={dieObj.id}/>))



    return (
            <main>
                {gameWon && <Confetti />}
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                {diceElements}
                </div>
                <button className="roll-dice" onClick={rollDice}>{gameWon ? "New game ": "Roll Dice"}</button>
            </main>
    )
}