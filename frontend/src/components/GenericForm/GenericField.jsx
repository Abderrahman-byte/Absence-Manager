import React from 'react'

import CheckboxField from './CheckboxField'
import InputField from './InputField'
import SearchInput from './SearchInput'
import TextareaField from './TextareaField'

const GenericField = ({type = 'text', ...props}) => {
    if (type == 'checkbox') return <CheckboxField {...props} />

    if (type == 'textarea') return <TextareaField {...props} />

    if (type === 'search-input') return <SearchInput {...props} />

    return <InputField type={type} {...props} />
}

export default GenericField