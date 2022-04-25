import React, { useState } from 'react';
import './sass/style.scss';


function App() {
  const [data, setData] = useState(null);
  const [details, setDetails] = useState(null);
  const [hits, setHits] = useState(null);

  const searchPerson = (name) => {
    let url = "/api/pep?name=" + name;
    fetch(url)
    .then((res) => res.json())
    .then((data) => setData(data));
    setDetails(null)
    setHits(null)
  }

  async function searchOrg(org){
    setHits(null)
    setDetails(null)
    org = org.replace(/ /g,'');
    var length = /^\d{9}$/;
    if(org.match(length)){
      var res = await fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${org}/roller`);
      res = await res.json();
      var persons = [];

      for(var gruppe = 0; gruppe < 2; gruppe++){
        for(var person in res.rollegrupper[gruppe].roller){
          var navn = res.rollegrupper[gruppe].roller[person].person.navn;
          var navnString = '';
          navnString += navn.fornavn;

          if(navn.mellomnavn != undefined){
            navnString+= navn.mellomnavn;
          }

          navnString += ' ' + navn.etternavn;
          persons.push(navnString);
        }
      }

      var hits = [];

      for(var person in persons){
        let url = "/api/pep?name=" + persons[person];
        var res = await fetch(url);
        res = await res.json();
        
        if(res.numberOfHits != 0){
          hits.push(res.results + ', ');
        }
      }

      if (hits && !hits.length) {
        setHits('No match found')
      } else{
        setHits('These are politically exposed: ' + hits);
      }
    }else{
      setHits('Org. number must be of length 9');  
    }  
  }

  var userInput = React.createRef();

  return (
    <div className="App" align='center'>
      <header className="App-header">
      <h1>Search for politically exposed people</h1>
        <div>
        <h2>Search to see if a person is politically exposed</h2>
        <input ref={userInput} />
        <button placeholder='Org. nummer' onClick={() => searchPerson(userInput.current.value)}>Search</button>
        </div>
        <div>
        <p>{!data ? "": !data.numberOfHits ? 'No match found' : data.results + " is a politically exposed person"}</p>
        <p>{!data ? "": !data.numberOfHits ? "" : <button onClick={() => setDetails('Born: ' + data.details[0].birth_date +', Country: ' + data.details[0].countries.toUpperCase() + ', From dataset: ' + data.details[0].dataset )} >Show details</button>}</p>
        <p>{!details ? "": !data.numberOfHits ? "" : details}</p>
        </div>
        <div>
        <h2>Search to see if the leaders in a company person is politically exposed</h2>
        <input ref={userInput} />
        <button onClick={() => searchOrg(userInput.current.value)}>Search</button>
        </div>
        <div>
        <p>{!hits ? "": hits}</p>
        </div>
      </header>
    </div>
  );
}


export default App;
