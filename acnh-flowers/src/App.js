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

  // set flowers A and B to be an object
  // that maps each flower type to the selected genes for that flower
  // so selecting genes for one species will not affect your selection for another species
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

  // don't finish loading until flowerA and flowerB have been properly set
  useEffect(() => {
    if (Object.keys(flowerA).length && Object.keys(flowerB).length) setLoading(false);
  }, [flowerA, flowerB]);

  // set flowerA and flowerB with their new genes
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

  // gets a flower's color based on its genes object
  const getColor = (genes) => {
    let geneString = stringFromGenes(genes);
    let newGeneString = geneString;
    let newFlowerType = flowerType;
    if (newGeneString.length > 6) {
      newGeneString = newGeneString.substring(0, 6);
      newFlowerType = newFlowerType.concat("_" + geneString.substring(6, 8));
    }
    return data.genes[newGeneString][newFlowerType];
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
            <p>{getColor(flowerA[flowerType])}</p>
          </div>
          <div className='flower-B'>
            <GeneSelector flower={flowerB} setFlower={handleSetFlowerB} flowerType={flowerType} />
            <p>{getColor(flowerB[flowerType])}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
