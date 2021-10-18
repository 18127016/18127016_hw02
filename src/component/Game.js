import Board from "./Board"
import React from "react"
class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            history:[{
                squares:Array(props.row*props.col).fill(null),
                winLine:Array(props.numStep).fill(null),
                winner:"",
                colH:Number(-1),
                rowH:Number(-1),
            }],
            lines:this.findWinLine(props.numStep),
            xIsNext:true,
            isDesc:true,
            stepNumber:0, 
            moves:[]
        }
    }
    handleClick=(i)=>{
        const history=this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1]
        const squares=current.squares.slice();
        
        if(current.winner.length>0||squares[i]){
            return;
        }
        squares[i]=this.state.xIsNext?"X":"O"
        const win=this.calculateWinner(squares)
        console.log(win)
        console.log(this.state.history)
        this.setState({
            history:history.concat([{
                squares:squares,
                colH:(i%this.props.col)===0?this.props.col-1:i%this.props.col-1,
                rowH:Math.ceil(i/this.props.col)-1,
                winLine:win?win.winLine:null,
                winner:win?win.winner:""

            }]),
            stepNumber:history.length,
            xIsNext:!this.state.xIsNext
        })
    }
    jumpTo=(step)=>{
        this.setState({
            stepNumber:step,
            xIsNext:(step%2)===0,
        })
    }
    selectedItem=(move,desc)=>{
        if(move===this.state.stepNumber){
            return(
                <strong>{desc}</strong>
            )
        }
        else{
            return(desc)
        }
    }
    sort=()=>{
        this.setState({
            isDesc:!this.state.isDesc,
        })
    }

    findWinLine=(numStep)=>{
        let lines=[]
        
        for (let i = 0; i < this.props.row; i++) {
            
            for (let j = 0; j < this.props.col; j++) {
                //vertical
                if((i+numStep)<=this.props.row){
                    let stepI=i;
                    let stepJ=j;
                    let line=Array(numStep);
                    for (let index = 0; index <numStep; index++) {
                        line[index]=(stepI++)*this.props.col+stepJ;    
                    }
                    lines.push(line.slice())
                }
                //horizontal
                if(j+numStep<=this.props.col){
                    let step=j;
                    let line=Array(numStep);
                    for (let index = 0; index <numStep; index++) {
                        line[index]=i*this.props.col+step++;    
                    }
                    lines.push(line.slice())
                }
                //diagonal line
                if(i+numStep<=this.props.row&&j+numStep<= this.props.col){
                    let stepI=i;
                    let stepJ=j;
                    let line=Array(numStep);
                    for (let index = 0; index <numStep; index++) {
                        line[index]=(stepI++)*this.props.col+stepJ++;
                    }
                    lines.push(line.slice())
                  
                }
                if(i+numStep<=this.props.row && j-(numStep-1)>=0){
                    let stepI=i;
                    let stepJ=j;
                    let line=Array(numStep);
                    for (let index = 0; index <numStep; index++) {
                        line[index]=(stepI++)*this.props.col+stepJ--;
                    }
                    lines.push(line.slice())
                }
                 
            }
            
        }
        return lines;
    }
    calculateWinner(squares){
        for (let i = 0; i < this.state.lines.length; i++) {
          const win=this.state.lines[i];
          let squaresWin=win.map(e=>squares[e])
          if(squaresWin.every((val,i,arr)=>val===arr[0]&&val)){
              return {winner: squaresWin[0],winLine:win}
          }
        }
        return null;
    }
    render(){
        const history=this.state.history
        const current= history[this.state.stepNumber]
        const winner=current.winner
        const moves = history.map((move,index) => {
            const realPosition=this.state.isDesc?index:this.state.history.length-index-1
            const text = 
              'Go to move #' +(realPosition)+ " ("+history[realPosition].colH+", "+history[realPosition].rowH+")"
              
            return (
              <li key={index}>
                <button onClick={() => this.jumpTo(realPosition)}>{this.selectedItem(realPosition,text)}</button>
              </li>
            );
          });
        
        let status;
        if(winner.length>0){
            status= "Winner: "+winner;
        }
        else{
            if(this.state.stepNumber===this.props.col*this.props.row){
                status= "Draw"
            }
            else{
                status="Next player: "+(this.state.xIsNext?"X":"O");
            }
        }
        let sortTitle=this.state.isDesc?"Sort Descending":"Sort Acsending"
        return(
            <div class="row">
                <div class="column">
                    <div className="game">
                        <div className="game-board">
                            <Board
                            col={this.props.col}
                            row={this.props.row}
                            numStep={this.props.numStep}
                            squares={current.squares}
                            winLine={current.winLine}
                            onClick={(i)=>this.handleClick(i)
                            }
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
                                <button onClick={()=>this.sort()}>{sortTitle}</button>
                            </div>
                        </div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Game