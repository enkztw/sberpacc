import React from 'react'
import { Field } from 'redux-form'

export default (props) => {
    return (
        <React.Fragment>
            {props.fields.map(({placeholder, name}) => <Field placeholder={placeholder} component="input" name={name} key={name} />)}
        </React.Fragment>
    )
}
