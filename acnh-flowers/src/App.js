import { useEffect, useState } from 'react';
import { punnett, breed, genesFromString, stringFromGenes } from './calc/FlowerCalc';

const App = () => {

  // const [ data, setData ] = useState({});
  const data = require('./data/data.json');

  useEffect(() => {
    const getData = async () => {
      console.log(data);
    }
    getData();
  }, []);

  return (
    <>
      <h1>Hello!</h1>
    </>
  );
}

export default App;
