import React from 'react'
import { useState } from 'react'

const SearchInput = ({ classname='', label, name, value, getItems, setValue }) => {
    const [inputValue, setInputValue] = useState(value?.name || '')
    const [show, setShow] = useState(false)
    const [items, setItems] = useState([])

    const inputChanged = (e) => {
        setInputValue(e.target.value)
        if (typeof getItems === 'function') getItems(e.target.value, setItems)
    }

    const choiceClicked = (item) => {
        setShow(false)
        setValue(name, item)
        setInputValue(item.name)
    }

    const inputBlured = () => {
        if (!inputValue || inputValue.length <= 0) setValue(name, null)

        setTimeout(() => {
            if (!show) return
            
            setShow(false)
        }, 300)
    }

    return (
        <div className={`mb-3 ${classname || ''}`}>
            {label ? (
                <label htmlFor={`${name}-input`} className="form-label">{label}</label>
            ) : null}

            <div className="dropdown">
                <input 
                    className='form-control' 
                    onFocus={() => setShow(true)} 
                    onBlur={inputBlured}
                    id={`${name}-input`} 
                    onChange={inputChanged}
                    value={inputValue}
                    name={name} />

                {show && items.length > 0 ? (
                    <ul className="dropdown-menu show">
                        {items.map(item => (<li key={item.id}>
                            <button 
                                onClick={() => choiceClicked(item)} 
                                className="dropdown-item" 
                                type="button">{item.name}</button>
                        </li>))}
                    </ul>
                ): null}
            </div>
        </div>
    )
}
export default SearchInput