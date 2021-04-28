import './App.css';
import Conversor from './components/Conversor'
function App() {
  const linkLista = `https://free.currconv.com/api/v7/currencies?apiKey=6db3b3dc6b62d3927205`
  function currencySymbol(moeda){
    return fetch(linkLista).then(res=>res.json()).then(json=>json.results[moeda].currencySymbol)
  
  }
  const lista = (idelement, idelement2)=>{
    fetch(linkLista).then(res=>res.json())
    .then(json=>{
      Object.keys(json.results).forEach(ob=>{
        const {currencyName, id} = json.results[ob]
        document.getElementById(idelement).innerHTML += `<option value='${ob}'>${currencyName} - ${id}</option>`
        document.getElementById(idelement2).innerHTML += `<option value='${ob}'>${currencyName} - ${id}</option>`
      })
    }).catch(err=>console.log(err))
  }
  return (
    <div className="App" onLoad={lista('moedaA', 'moedaB')} >
      <h1>Conversor de Moedas</h1>
      <Conversor symbol={currencySymbol}></Conversor>
    </div>
  );
}

export default App;
