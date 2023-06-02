import { genesFromString } from 'calc/FlowerCalc';
import { createContext } from 'react';

const data = require('../data/data.json');

const DataContext = createContext({
    flowers: data.flowers,
    genes: data.genes,
    seeds: data.seeds,
    defaultGenes: Object.keys(data.seeds).reduce((acc, curr) => {
        return {...acc, [curr]: genesFromString(data.seeds[curr].red)}
    }, {})
    
});

export default DataContext;