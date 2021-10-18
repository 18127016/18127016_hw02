import Square from "./Square";
import React from "react";
class Board extends React.Component{
    renderSquare=(i)=>{
        return(
            <Square
            background={this.props.winLine?this.props.winLine.includes(i)?true:false:false}
            value={this.props.squares[i]}
            onClick={()=>this.props.onClick(i)}
            />
        )
        
    }
    renderRow=(indexRow) =>{
        let rowData= Array(this.props.col).fill(null)
        for (let index = 0; index < this.props.col; index++) {
            let position= (indexRow)*(this.props.col)+index+1;

            rowData[index]=(
                this.renderSquare(position)
            )
        }
        return rowData;
    }
    renderBoard=() =>{
        let data= Array(this.props.row).fill(null)
        for (let index = 0; index < this.props.row; index++) {
            data[index]=(
                <div className="board-row">
                    {this.renderRow(index)}
                </div>
            )
            
        }
        return data;
    }

    render(){
        return(
            <div>
                {this.renderBoard()}   
            </div>
        )
    }
}
export default Board