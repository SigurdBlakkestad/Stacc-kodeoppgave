import React from 'react';
//import logo from './pep.png';
//import './App.css';
//import './Header.scss';
import './sass/style.scss';


function App() {
  const [data, setData] = React.useState(null);
  const [details, setDetails] = React.useState(null);

  const searchPerson = (name) => {
    let url = "/api/pep?name=" + name;
    fetch(url)
    .then((res) => res.json())
    .then((data) => setData(data));
    setDetails(null)
  }

  var userInput = React.createRef();
  //<img src={logo} className="App-logo" alt="logo" />
  return (
    <div className="App" align='center'>
      <header className="App-header">
      <h1>Search for politically exposed people</h1>
        <div>
        <input ref={userInput}></input>
        <button onClick={() => searchPerson(userInput.current.value)}>Search</button>
        </div>
        <div>
        <p>{!data ? "": !data.numberOfHits ? "No match found" : data.results + " is a politically exposed person"}</p>
        <p>{!data ? "": !data.numberOfHits ? "" : <button onClick={() => setDetails('Born: ' + data.details[0].birth_date +', Country: ' + data.details[0].countries.toUpperCase() + ', From dataset: ' + data.details[0].dataset )} >Show details</button>}</p>
        <p>{!details ? "": !data.numberOfHits ? "" : details}</p>
        </div>
      </header>
    </div>
  );
}


export default App;
