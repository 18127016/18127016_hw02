import Board from "../Board"
import React, {useState } from "react"


function findWinLine(numStep,row,col){
    let lines=[]
    
    for (let i = 0; i < row; i++) {
        
        for (let j = 0; j < col; j++) {
            //vertical
            if((i+numStep)<=row){
                let stepI=i;
                let stepJ=j;
                let line=Array(numStep);
                for (let index = 0; index <numStep; index++) {
                    line[index]=(stepI++)*col+stepJ;    
                }
                lines.push(line.slice())
            }
            //horizontal
            if(j+numStep<=col){
                let step=j;
                let line=Array(numStep);
                for (let index = 0; index <numStep; index++) {
                    line[index]=i*col+step++;    
                }
                lines.push(line.slice())
            }
            //diagonal line
            if(i+numStep<=row&&j+numStep<= col){
                let stepI=i;
                let stepJ=j;
                let line=Array(numStep);
                for (let index = 0; index <numStep; index++) {
                    line[index]=(stepI++)*col+stepJ++;
                }
                lines.push(line.slice())
              
            }
            if(i+numStep<=row && j-(numStep-1)>=0){
                let stepI=i;
                let stepJ=j;
                let line=Array(numStep);
                for (let index = 0; index <numStep; index++) {
                    line[index]=(stepI++)*col+stepJ--;
                }
                lines.push(line.slice())
            }
             
        }
        
    }
    return lines;
}
function calculateWinner(squares,lines){
    for (let i = 0; i < lines.length; i++) {
      const win=lines[i];
      let squaresWin=win.map(e=>squares[e])

      if(squaresWin.every((val,i,arr)=>val===arr[0]&&val)){
          return {winner: squaresWin[0],winLine:win}
      }
    }
    return null;
}

const Game =({col,row,numStep})=>{
    const [history,setHistory]=useState([{
            squares:Array(row*col).fill(null),
            winLine:Array(numStep).fill(null),
            winner:"",
            colH:Number(-1),
            rowH:Number(-1),
    }])
    const [stepNumber,setStepNumber]=useState(0)
    const [xIsNext,setXIsNext]=useState(true)
    const [isDesc,setIsDesc]=useState(true)
    const lines=findWinLine(numStep,row,col)

    const handleClick=(i)=>{
        const newHistory=history.slice(0,stepNumber+1);
        const current = newHistory[newHistory.length-1]
        const squares=current.squares.slice();
        
        if(current.winner.length>0||squares[i]){
            return;
        }
        console.log(i)
        squares[i]=xIsNext?"X":"O"
        const win=calculateWinner(squares,lines)

        setHistory(newHistory.concat(
            {
                squares:squares,
                colH:(i%col)===0?col-1:i%col-1,
                rowH:Math.ceil(i/col)-1,
                winLine:win?win.winLine:null,
                winner:win?win.winner:""
            }
        ))
        setStepNumber(newHistory.length)
        setXIsNext(!xIsNext)
    }
    const jumpTo=(step)=>{
        setStepNumber(step)
        setXIsNext(step%2===0)
       
    }
    const selectedItem=(move,desc)=>{
        if(move===stepNumber){
            return(
                <strong>{desc}</strong>
            )
        }
        else{
            return(desc)
        }
    }
    const sort=()=>{
        setIsDesc(!isDesc)
    }

    const current= history[stepNumber]
    const winner=current.winner
    const moves = history.map((move,index) => {
        const text = 
            index?'Go to move #' +index+ " ("+history[index].colH+", "+history[index].rowH+")":"Go to game start"
            
        return (
            <li key={index}>
            <button onClick={() => jumpTo(index)}>{selectedItem(index,text)}</button>
            </li>
        );
        });
    
    let status;
    if(winner.length>0){
        status= "Winner: "+winner;
    }
    else{
        if(stepNumber===col*row){
            status= "Draw"
        }
        else{
            status="Next player: "+(xIsNext?"X":"O");
        }
    }
    let sortTitle=isDesc?"Sort Descending":"Sort Acsending"
    return(
        <div class="row">
            <div class="column">
                <div className="game">
                    <div className="game-board">
                        <Board
                        col={col}
                        row={row}
                        numStep={numStep}
                        squares={current.squares}
                        winLine={current.winLine}
                        onClick={(i)=>handleClick(i)}
                        />
                    </div>
                </div>
            </div>
            <div class="column">
                <div className="game-info">
                    <div class="row">
                        <div class ="column">
                            <div>{status}</div>
                        </div>
                        <div class ="column">
                            <button onClick={()=>sort()}>{sortTitle}</button>
                        </div>
                    </div>
                    <ol>{isDesc?moves:moves.reverse()}</ol>
                </div>
            </div>
        </div>
        
    )

}

export default Game