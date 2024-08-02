import React, { useState } from 'react'
import './TicTacToe.css'

const TicTacToe = () => {
    const [turn, setTurn] = useState('X')
    const [board, setBoard] = useState(Array(9).fill(Array(9).fill('')));
    const [winner, setWinner] = useState('')
    const [targetBoard, setTargetBoard] = useState(9)
    const [bigBoard, setBigBoard] = useState(Array(9).fill())

    const checkForBoardWin = (cells) => {
        let winningCombos = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
        ]

        for (var i = 0; i <winningCombos.length; i++) {
            let pattern = winningCombos[i]
            console.log(cells[pattern[0]] + cells[pattern[1]] + cells[pattern[2]])
            if (cells[pattern[0]] === cells[pattern[1]] && cells[pattern[1]] === cells[pattern[2]] && cells[pattern[0]] !== '' && cells[pattern[0]] !== undefined) {
                console.log("winner")
                return true;
            }
        } 
        return false;
    }

    const resetGame = () => {
        setBoard(Array(9).fill(Array(9).fill('')))
        setWinner('')
        setTargetBoard(9)
        setBigBoard(Array(9).fill())
    }

    const boardToBoardName = (boardNum) => {
        switch (boardNum){
            case 0:
                return "Top-Left";
            case 1:
                return "Top-Middle";
            case 2:
                return "Top-Right";
            case 3:
                return "Middle-Left";
            case 4:
                return "Middle-Middle";
            case 5:
                return "Middle-Right";
            case 6:
                return "Bottom-Left";
            case 7:
                return "Bottom-Middle";
            case 8:
                return "Bottom-Right";
            default:
                return "Any";
        }
    }

    const toggleTurn = () => {
        if (turn === 'X') {
            setTurn('O')
        } else {
            setTurn('X')
        }
    }

    const handleClick = (boardNum, num) => {
        if (board[boardNum][num] !== '' || winner !== '') { //If square already filled or game over
            return;
        }

        if (boardNum !== targetBoard && targetBoard !== 9) { //If not sent to this board and cant do any board
            return;
        }

        let cells = new Array(board.length)
        for (let sBoard in board){
            cells[sBoard] = [...board[sBoard]]
        }

        cells[boardNum][num] = turn //Set square to symbol
        let bigCells = [...bigBoard];

        if (checkForBoardWin(cells[boardNum])){ //Check for small board win
            bigCells[boardNum] = turn
            console.log(bigCells)
            setBigBoard(bigCells)
            if (checkForBoardWin(bigCells)){ //Check for big board win
                setWinner(turn)
            }
        }
        setBoard(cells)

        if (bigCells[num] === undefined){
            setTargetBoard(num);
        } else { setTargetBoard(9) }
        toggleTurn();
    }

    const Cell = ({ boardNum, num }) => {
        return <td onClick={() => handleClick(boardNum, num)}>{board[boardNum][num]}</td>
    }

    const Board = ({ boardNum }) => {
        return (
            <td className="bigCell">
                {bigBoard[boardNum] && (
                    <>
                        <div className='overlay'>
                            <p>{bigBoard[boardNum]}</p>
                        </div>
                    </>
                )}
                
                <table className='smallBoard'>
                    <tbody>    
                        <tr>
                            <Cell boardNum={boardNum} num={0} />
                            <Cell boardNum={boardNum} num={1} />
                            <Cell boardNum={boardNum} num={2} />
                        </tr>
                        <tr>
                            <Cell boardNum={boardNum} num={3} />
                            <Cell boardNum={boardNum} num={4} />
                            <Cell boardNum={boardNum} num={5} />
                        </tr>
                        <tr>
                            <Cell boardNum={boardNum} num={6} />
                            <Cell boardNum={boardNum} num={7} />
                            <Cell boardNum={boardNum} num={8} />
                        </tr>
                    </tbody>
                </table>
            </td>
        )

    }

    return (
        <div>
            <h1>Ultimate Tic-Tac-Toe</h1>
            <h3>Turn: {turn}</h3>
            <h4>Must Play In {boardToBoardName(targetBoard)} Board</h4>
            <table className='bigBoard'>
                <tbody>
                    <tr>
                        <Board boardNum={0} />
                        <Board boardNum={1} />
                        <Board boardNum={2} />
                    </tr>
                    <tr>
                        <Board boardNum={3} />
                        <Board boardNum={4} />
                        <Board boardNum={5} />
                    </tr>
                    <tr>
                        <Board boardNum={6} />
                        <Board boardNum={7} />
                        <Board boardNum={8} />
                    </tr>
                </tbody>
            </table>
            {winner && (
                <>
                    <p>{winner} is the winner!</p>
                    <button onClick={() => resetGame()}>Play Again!</button>
                </>
            )}
        </div>
    )
}

export default TicTacToe
