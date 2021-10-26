import Square from "../Square";
import React from "react";

const Board=({winLine,squares,col,row,onClick})=>{
    const renderSquare=(i)=>{
        return(
            <Square
            background={winLine?winLine.includes(i)?true:false:false}
            value={squares[i]}
            onClick={()=>onClick(i)}
            />
        )
        
    }
    const renderRow=(indexRow) =>{
        let rowData= Array(col).fill(null)
        for (let index = 0; index < col; index++) {
            let position= (indexRow)*(col)+index;

            rowData[index]=(
                renderSquare(position)
            )
        }
        return rowData;
    }
    const renderBoard=() =>{
        let data= Array(row).fill(null)
        for (let index = 0; index < row; index++) {
            data[index]=(
                <div className="board-row">
                    {renderRow(index)}
                </div>
            )
            
        }
        return data;
    }

    return (<div>{renderBoard()}</div>)
    
}

export default Board