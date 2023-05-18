import { useEffect, useState } from 'react';
import { breed, geneProbability, genesFromString, stringFromGenes } from './calc/FlowerCalc';
import FlowerSelector from './components/FlowerSelector/FlowerSelector';
import GeneSelector from './components/GeneSelector/GeneSelector';
import './App.css'

const App = () => {

  const [ loading, setLoading ] = useState(true);
  const data = require('./data/data.json');

  const [ flowerList, setFlowerList ] = useState([]);
  const [ flowerType, setFlowerType ] = useState('');
  const [ flowerA, setFlowerA ] = useState({});
  const [ flowerB, setFlowerB ] = useState({});

  // set the list of flowers
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setFlowerList(Object.keys(data.seeds));
    }

    getData();

  }, [data]);

  useEffect(() => {
    const initFlowers = async () => {
      setLoading(true);
      setFlowerType(flowerList[0]);
      setFlowerA(flowerList.reduce((acc, curr) => ({
        ...acc, [curr]: genesFromString(data.seeds[curr].red)
      }), {}));
      setFlowerB(flowerList.reduce((acc, curr) => ({
        ...acc, [curr]: genesFromString(data.seeds[curr].red)
      }), {}));
    }

    initFlowers();
  }, [flowerList, data]);

  useEffect(() => {
    if (Object.keys(flowerA).length && Object.keys(flowerB).length) setLoading(false);
  }, [flowerA, flowerB]);

  const handleSetFlowerA = (newGenes) => {
    setFlowerA(prevFlower => {
      const newFlower = {...prevFlower};
      newFlower[flowerType] = newGenes
      return newFlower;
    });
  }

  const handleSetFlowerB = (newGenes) => {
    setFlowerB(prevFlower => {
      const newFlower = {...prevFlower};
      newFlower[flowerType] = newGenes
      return newFlower;
    });
  }

  if (loading) return null;

  return (
    <>
      <h1>Hello!</h1>
      <div className='body'>
        <FlowerSelector flowerList={flowerList} flowerType={flowerType} setFlowerType={setFlowerType} />
        <div className='flower-genes'>
          <div className='flower-A'>
            <GeneSelector flower={flowerA} setFlower={handleSetFlowerA} flowerType={flowerType} />
          </div>
          <div className='flower-B'>
            <GeneSelector flower={flowerB} setFlower={handleSetFlowerB} flowerType={flowerType} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
