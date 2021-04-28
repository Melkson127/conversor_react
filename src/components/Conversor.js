import React from 'react';
import exchange from '../exchange.png'
function Conversor(props) {
    const [moedaBv, setMoedaBv] = React.useState(0)
    const [moedaAv, setMoedaAv] = React.useState('')
    const [simbol, setSimbol] = React.useState('$')
    window.onload =()=>{
      const moedaA = document.getElementById('moedaA')
      const moedaB = document.getElementById('moedaB')
      const btnTrocar = document.getElementById('trocar')
      btnTrocar.addEventListener('click', trocar)
      function trocar(){
          const modA = moedaA['selectedIndex']
          moedaA['selectedIndex'] = moedaB['selectedIndex']
          moedaB['selectedIndex'] = modA
      }
  }
  function cotacao(){
    const moedaA = document.getElementById('moedaA')
    const moedaB = document.getElementById('moedaB')
    if(moedaA.value !== 'null' && moedaB.value !== 'null'){
      const de_para = `${moedaA.value}_${moedaB.value}`
      const url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=6db3b3dc6b62d3927205`
      fetch(url).then(res=> res.json()).then(json=>{
        const cot = json[de_para]
        const moedaB_val = (Number(moedaAv) * Number(cot))
        const getSymbol = props.symbol(moedaB.value)
        getSymbol.then(res=>setSimbol(res))
        setMoedaBv(moedaB_val<0.01?moedaB_val.toFixed(8):moedaB_val.toFixed(2))
      })
    }else{
      alert('Selecione uma moeda para ser feita a conversão')
    }
  }
    
    return (
      <div className="conversor">
        <div className='elements'>
          De<br/>
          <select id="moedaA">
            <option value="null">Escolha uma moeda</option>
          </select> 
          <br/>
          Para 
          <br/>
          <select id="moedaB" >  
            <option value="null">Escolha uma moeda</option>
          </select> 
          <br/><br/>
          <button id="trocar" value='trocar' onClick={cotacao}>
            <img src={exchange} alt="Inverter Moedas"/>
          </button>
          
          <input type="number" placeholder="Valor a converter" onChange={(ev)=>{setMoedaAv(ev.target.value)}}/><br/><br/>
          <input type="button" value="converter" id='converter' className="converter" onClick={cotacao}/>
          <h2>Valor Convertido: {simbol}{moedaBv} </h2>
         
        </div>
      </div>
    );
  }
  
  export default Conversor;