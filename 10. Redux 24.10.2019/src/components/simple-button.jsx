import React from 'react'

import style from './style.css'

export default class extends React.Component {
    render () {
        return (
            <button
                className={style.button}
                type="submit"
            >
                {this.props.children}
            </button>
        )
    }
}
