// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let initialData = Array(9).fill('');
const TicTacToe = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (index) => {
        if (lock || data[index]) return;

        const newData = [...data];
        newData[index] = count % 2 === 0 ? 'X' : 'O';
        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (currentData) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombinations) {
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `${winner} Wins!`;
    };

    const reset = () => {
        setData(initialData);
        setLock(false);
        setCount(0);
        titleRef.current.innerHTML = `Tic Tac Toe Game in <span>React</span>`;
    };

    return (
        <div className='cont'>
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
            <div className="board">
                {data.map((cell, index) => (
                    <div key={index} className="boxes" onClick={() => toggle(index)}>
                        {cell && <img src={cell === 'X' ? cross_icon : circle_icon} alt={cell} />}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
