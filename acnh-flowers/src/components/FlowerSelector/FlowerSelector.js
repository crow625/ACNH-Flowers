import './FlowerSelector.css';

const FlowerSelector = ({flowerList, flowerType, setFlowerType, id, ...rest}) => {
    
    return (
        <div className='flower-selector-body' {...rest}>
          {flowerList.map((item, i) => {
            return (
              <div className='flower-selector' key={i}>
                <input 
                    className='flower-button'
                    type="radio" 
                    id={item + '-' + id}
                    name={"flower-selector-" + id} 
                    value={item} 
                    onChange={(e) => setFlowerType(e.target.value)}
                    checked={flowerType === item}
                />
                <label htmlFor={item + '-' + id} className='flower-name'>{item}</label>
              </div>
            )
          })}
        </div>
    )
}

export default FlowerSelector;