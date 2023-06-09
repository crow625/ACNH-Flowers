import './GeneSelector.css';

const GeneSelector = ({flower, setFlower, flowerType, id, ...rest}) => {

  const handleSetFlower = (gene, value) => {
    const newGenes = {...(flower[flowerType])}
    newGenes[gene] = parseInt(value);
    setFlower(newGenes);
  }

    return (
        <div className='gene-selector-body' {...rest}>
          <div className='gene-selector'>
            <select value={flower[flowerType].r} onChange={(e) => handleSetFlower('r', e.target.value)} name={'R' + id}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className='gene-selector'>
            <select value={flower[flowerType].y} onChange={(e) => handleSetFlower('y', e.target.value)} name={'Y' + id}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          <div className='gene-selector'>
            <select value={flower[flowerType].w} onChange={(e) => handleSetFlower('w', e.target.value)} name={'W' + id}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </div>
          {
            flowerType === 'roses' ? 
            <div className='gene-selector'>
              <select value={flower[flowerType].b} onChange={(e) => handleSetFlower('b', e.target.value)} name={'B' + id}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div> : null
          }
        </div>
    )
}

export default GeneSelector;