export default function Square({value='',onSquareClick}){

 return <button onClick={onSquareClick} key={value==='0'?Math.random():value} name={value} className={`square ${value==='X'?'green':'red'}`}>{value}</button>
}