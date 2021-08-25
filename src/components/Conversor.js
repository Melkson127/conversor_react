import React from 'react';
import exchange from '../exchange.png'
function Conversor(props) {
    const [moedaBv, setMoedaBv] = React.useState(0)
    const [moedaAv, setMoedaAv] = React.useState('')
    const [simbol, setSimbol] = React.useState('$')
    const [list,setList] = React.useState({})
    const [dePara, setdePara] = React.useState([])
    const linkLista = `https://free.currconv.com/api/v7/currencies?apiKey=6db3b3dc6b62d3927205`
    
    window.onload =()=>{
      fetch(linkLista).then(res=>res.json()).then(json=>{
        setList(json.results)
        Object.keys(json.results).forEach(ob=>{
          const {currencyName, id} = json.results[ob]
           document.getElementById("moedaA").innerHTML += `<option value='${ob}'>${currencyName} - ${id}</option>`
           document.getElementById("moedaB").innerHTML += `<option value='${ob}'>${currencyName} - ${id}</option>`
         })
      })
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
  function Value(ev){
    const moedaA = document.getElementById('moedaA')
    let value = ev.target.value
    if(moedaA.value === 'BTC'){
      let regExp = /\d+/
      value = value   //tira tudo que não for numero
      .replace(/\D/g,'') 
      if(regExp.exec(value)){
        let lengthValue = regExp.exec(value)[0].length
        if(lengthValue<=9 && lengthValue != null){
          let n = value
          value = ''
          for(let i = lengthValue; i<=9;i++){
            value += "0" 
          }
          value += n
        }
        value = value
        .replace(/(\d+)(\d{8})/,'$1.$2')
        value = value
        .replace(/0/,'')
      }      

    }else{

      value = value
      .replace(/\D/g,'') //tira tudo que não for numero
      .replace(/(\d+)(\d{2})/,`$1.$2`) //adiciona o . apos 2 digitos
    }
    
    ev.target.value = value
    setMoedaAv(value)
    
  }
  function cotacao(){
    const moedaA = document.getElementById('moedaA')
    const moedaB = document.getElementById('moedaB')
    
    if(moedaA.value !== 'null' && moedaB.value !== 'null'){
      const de_para = `${moedaA.value}_${moedaB.value}`
      let cache = dePara.filter(el=>el[de_para])
      console.log(cache)
      if(cache.length>0){
        const moedaB_val = (Number(moedaAv) * Number(cache[0][de_para]))
        setMoedaBv(moedaB_val<0.01?moedaB_val.toFixed(8):moedaB_val.toFixed(2))
      }else{
        const url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=6db3b3dc6b62d3927205`
        fetch(url).then(res=> res.json()).then(res=>{
          const cot = res[de_para]
          let c = []
          dePara.forEach(el=>{
            c.push(el)
          })  
          c.push(res)
          setdePara(c)
          const moedaB_val = (Number(moedaAv) * Number(cot))
          const {currencySymbol} = list[moedaB.value]
          setSimbol(currencySymbol)
          setMoedaBv(moedaB_val<0.01?moedaB_val.toFixed(8):moedaB_val.toFixed(2))
        })
      }
      
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
          
          <input type="text" placeholder="Valor a converter" onChange={Value}/><br/><br/>
          <input type="button" value="converter" id='converter' className="converter" onClick={cotacao}/>
          <h2>Valor Convertido: {simbol}{moedaBv} </h2>
         
        </div>
      </div>
    );
  }
  
  export default Conversor;