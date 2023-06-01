import { useState, useEffect } from 'react';
import { breed, geneProbability, genesFromString, stringFromGenes } from '../../calc/FlowerCalc';
import FlowerSelector from '../FlowerSelector';
import { GeneSelector } from '../GeneSelector';
import './BreedingView.css'

const BreedingView = ({data, flowerList, id, defaultFlowerType, defaultGenes, destroyBreedingView, ...rest}) => {

    const [ loading, setLoading ] = useState(true);
    const [ flowerType, setFlowerType ] = useState('');
    const [ flowerA, setFlowerA ] = useState({});
    const [ flowerB, setFlowerB ] = useState({});
    const [ breedOutput, setBreedOutput ] = useState({});

    // set flowers A and B to be an object
    // that maps each flower type to the selected genes for that flower
    // so selecting genes for one species will not affect your selection for another species
    useEffect(() => {
        const initFlowers = async () => {
        setLoading(true);
        setFlowerType(defaultFlowerType);
        setFlowerA(flowerList.reduce((acc, curr) => {
            if (curr === defaultFlowerType) {
                return {...acc, [curr]: defaultGenes}
            }
            return {...acc, [curr]: genesFromString(data.seeds[curr].red)}
        }, {}));
        setFlowerB(flowerList.reduce((acc, curr) => {
            if (curr === defaultFlowerType) {
                return {...acc, [curr]: defaultGenes}
            }
            return {...acc, [curr]: genesFromString(data.seeds[curr].red)}
        }, {}));
        }

        initFlowers();
    }, [flowerList, data, defaultFlowerType, defaultGenes]);

    // don't finish loading until flowerA and flowerB and their breedOutput have been properly set
    useEffect(() => {
        if (Object.keys(flowerA).length && Object.keys(flowerB).length) {
            setBreedOutput(geneProbability(breed(flowerA[flowerType], flowerB[flowerType])));
        }
    }, [flowerA, flowerB, flowerType]);

    useEffect(() => {
        if (Object.keys(breedOutput).length > 0) setLoading(false);
    }, [breedOutput]);

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

    // gets a flower's color based on its genes
    const getColor = (genes) => {
        let geneString = (typeof genes === 'object') ? stringFromGenes(genes) : genes;
        let newGeneString = geneString;
        let newFlowerType = flowerType;
        if (newGeneString.length > 6) {
            newGeneString = newGeneString.substring(0, 6);
            newFlowerType = newFlowerType.concat("_" + geneString.substring(6, 8));
        }
        return data.genes[newGeneString][newFlowerType];
    }

    const isSeed = (genes) => {
        let geneString = (typeof genes === 'object') ? stringFromGenes(genes) : genes;
        return Object.values(data.seeds[flowerType]).includes(geneString);
    }

    if (loading) return null;

    return (
        <div className='body' {...rest}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10%'}}>
                <FlowerSelector flowerList={flowerList} flowerType={flowerType} setFlowerType={setFlowerType} id={id} />
                <div>
                    <input type='button' onClick={() => destroyBreedingView(id)} value="Close" />
                </div>
            </div>
            <div className='flower-genes'>
                <div className='flower-A'>
                    <GeneSelector flower={flowerA} setFlower={handleSetFlowerA} flowerType={flowerType} id={'A' + id} />
                    <p>{getColor(flowerA[flowerType])}</p>
                    {
                        isSeed(flowerA[flowerType]) ?
                        <p>seeds</p> :
                        null
                    }
                </div>
                <div className='flower-B'>
                    <GeneSelector flower={flowerB} setFlower={handleSetFlowerB} flowerType={flowerType} id={'B' + id} />
                    <p>{getColor(flowerB[flowerType])}</p>
                    {
                        isSeed(flowerB[flowerType]) ?
                        <p>seeds</p> :
                        null
                    }
                </div>
            </div>
            <table className='breed-results'>
                <thead>
                    <tr>
                    <th colSpan='3'>Outcome:</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(breedOutput).map((item, i) => {
                        return (
                            <tr key={i}>
                            <td>{getColor(item)}</td>
                            <td>{item}</td>
                            <td>{breedOutput[item] * 100}%</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
      </div>
    )
}

export default BreedingView;