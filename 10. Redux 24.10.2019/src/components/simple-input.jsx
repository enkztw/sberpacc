import React from 'react'
import { connect } from 'react-redux'

import { actions } from '../__data__'

import style from './style.css'

class SimpleInput extends React.Component {
    constructor (props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (event) {
        this.props.onChange(this.props.name, event.target.value)
    }

    render () {
        return (
            <label className={style.row}>
                <span className={style.title}>{this.props.title}</span>
                <input
                    className={style.input}
                    id={this.props.name}
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.props.value}
                />
            </label>
        )
    }
}

const mapStateToProps = (state, props) => ({
    value: state.form.payload[props.name]
})

const mapDispatchToProps = {
    onChange: actions.change
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleInput)
