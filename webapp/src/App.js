import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Search from './components/Search'


function App() {
  const [data, setData] = React.useState(null);

  const searchPerson = (name) => {
    let url = "/api/pep?name=" + name;
    fetch(url)
    .then((res) => res.json())
    .then((data) => setData(data));
  }


  var userInput = React.createRef();

  const [test, setTest] = React.useState(null);
  //const handleClick = () => { searchPerson(userInput.current.value); }
  var dit = [];
  const showDetails = (details) => {
    dit.push(data.details[0].birth_date)
    dit.push(data.details[0].countries)
    dit.push(data.details[0].dataset) 
  }

  return (
    <div className="App">
      <header className="App-header">
      <h1>Search for politically exposed people</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <input ref={userInput}></input>
        <button onClick={() => searchPerson(userInput.current.value)}>Search</button>
        </div>
        <div>
        <p>{!data ? "": "Number of results: " + data.numberOfHits}</p>
        <p>{!data ? "": !data.numberOfHits ? "No match found" : data.results + " is a politically exposed person"}</p>
        <p>{!data ? "": !data.numberOfHits ? "" : <button onClick={() => setTest('Born: ' + data.details[0].birth_date +' Country ' + data.details[0].countries + ' from dataset ' + data.details[0].dataset )} >Show details</button>}</p>
        <p>{!test ? "": test}</p>
        </div>
      </header>
    </div>
  );
}


export default App;
