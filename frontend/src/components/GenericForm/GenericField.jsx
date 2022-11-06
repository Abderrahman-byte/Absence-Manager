import React, { useMemo } from 'react'
import CheckboxField from './CheckboxField'
import InputField from './InputField'

// TODO : add textarea support

const GenericField = ({type = 'text', ...props}) => {
    if (type == 'checkbox') return <CheckboxField {...props} />

    return <InputField type={type} {...props} />
}

export default GenericField