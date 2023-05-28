import { useEffect, useState } from 'react';
import { genesFromString } from './calc/FlowerCalc';
import BreedingView from './components/BreedingView/BreedingView';
import './App.css'

// Future work:
/*
 * Create a 'GeneSelectorView' that holds two gene selectors and provides the option to load from seeds
 * Maybe use a context to store the list of flowers? (Probably not necessary)
 *
 * Update the style of the app to match design.png
 * Anything done in one breeding view does not affect any other breeding views.
 * When a new breeding view is created with the + button, it assumes the values from the last one (flower type, genes selected)
 * 
 * The breeding output section only shows colors and their cumulative probability (sum of all genes with that color)
 * Clicking on a color in the output section expands it to show each individual gene's probability
 * Clicking on one of those genes creates a new breeding view with that flower type and the gene clicked on in both selectors.
 * 
 * Below the displayed color of a flower in the gene selector, there are buttons to load the genes of seed flowers
 * 
 * ------------------------
 * 
 * App should:
 *  load the json data, pass to children
 *  (I almost feel like the json data should be a hook)
 *  keep a list of breeding views
 *  provide a function to breeding view children so they can create a new breeding view for a specific flower type and genes
 *  
 * BreedingView should:
 *  handle selection of a specific flowerA and flowerB in a gene selector view child
 *  set the output of the flowers and pass to an output view child
 */

const App = () => {

  const [ loading, setLoading ] = useState(true);
  const data = require('./data/data.json');
  const [ flowerList, setFlowerList ] = useState([]);
  const [ breedingViews, setBreedingViews ] = useState([]);
  const [ nextBreedingView, setNextBreedingView ] = useState(0);

  // set the list of flowers
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setFlowerList(Object.keys(data.seeds));
      setBreedingViews([{
        id: 0,
        defaultFlowerType: 'mums',
        defaultGenes: genesFromString(data.seeds['mums'].yellow)
      }]);
      setNextBreedingView(prev => prev + 1);
    }

    getData().then(() => setLoading(false));

  }, [data]);

  const handleAddBreedingView = () => {
    setBreedingViews(prev => [...prev, {
      id: nextBreedingView,
      defaultFlowerType: prev.at(-1).defaultFlowerType,
      defaultGenes: prev.at(-1).defaultGenes
    }]);
    setNextBreedingView(prev => prev + 1);
  }

  const destroyBreedingView = (i) => {

  }

  if (loading) return null;

  return (
    <>
      <h1>Hello!</h1>
      {
        breedingViews.map((b, i) => {
          // the new breeding view cannot access the selected genes and flower type of the previous one
          return (
            <BreedingView 
              data={data} 
              flowerList={flowerList} 
              defaultFlowerType={b.defaultFlowerType}
              defaultGenes={b.defaultGenes} 
              id={b.id} 
              key={i} 
            />
          )
        })
      }
      
      <input type='button' onClick={handleAddBreedingView} value="Create new breeding view" />
    </>
  );
}

export default App;
