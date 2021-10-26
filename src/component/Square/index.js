import React from "react"
const Square=({background,onClick,value})=>(
    <button 
                className="square" 
                onClick={()=>onClick()}
                style={background?{background:'yellow'}:{background:'white'}}
            >
                {value}
    </button>
)
export default Square