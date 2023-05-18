import './FlowerSelector.css';

const FlowerSelector = ({flowerList, flowerType, setFlowerType, ...rest}) => {
    
    return (
        <div className='flower-selector-body' {...rest}>
          {flowerList.map((item, i) => {
            return (
              <div className='flower-selector' key={i}>
                <input 
                    className='flower-button'
                    type="radio" 
                    id={item}
                    name="flower-selector" 
                    value={item} 
                    onChange={(e) => setFlowerType(e.target.value)}
                    checked={flowerType === item}
                />
                <label htmlFor={item} className='flower-name'>{item}</label>
              </div>
            )
          })}
        </div>
    )
}

export default FlowerSelector;