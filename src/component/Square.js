import React from "react"
class Square extends React.Component{
    render(){
        return (
            <button 
                className="square" 
                onClick={()=>this.props.onClick()}
                style={this.props.background?{background:'yellow'}:{background:'white'}}
            >
                {this.props.value}
            </button>
        )
    }
}
export default Square