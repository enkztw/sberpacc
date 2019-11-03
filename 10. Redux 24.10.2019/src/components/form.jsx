import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { actions } from '../__data__'

import SimpleInput from './simple-input'
import SimpleButton from './simple-button'


const FullName = ({
    lastNameTitle,
    firstNameTitle,
    middleNameTitle,
    lastNameName,
    firstNameName,
    middleNameName
}) => (
    <div>
        <SimpleInput title={lastNameTitle} name={lastNameName} />
        <SimpleInput title={firstNameTitle} name={firstNameName} />
        <SimpleInput title={middleNameTitle} name={middleNameName} />
    </div>
)

class Form extends React.Component {
    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSwitchWife = this.handleSwitchWife.bind(this)
        props.init()
    }

    handleSubmit (event) {
        event.preventDefault()
        this.props.submit()
        return false
    }

    handleSwitchWife (event) {
        this.props.switchForm(event.target.checked)
    }

    render () {
        return (
            <form name="perfect_form" autoComplete="off" onSubmit={this.handleSubmit}>
                <h1>{this.props.formTitle}</h1>
                <FullName
                    lastNameTitle="Фамилия"
                    firstNameTitle="Имя"
                    middleNameTitle="Отчество"
                    lastNameName="lastName"
                    firstNameName="firstName"
                    middleNameName="middleName"
                />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.props.switched}
                            onChange={this.handleSwitchWife}
                        />
                        {'Есть супруга/супруг'}
                    </label>
                </div>
                {this.props.switched &&
                    <React.Fragment>
                        <h2>{'Супруг/супруга'}</h2>
                        <FullName
                            lastNameTitle="Фамилия"
                            firstNameTitle="Имя"
                            middleNameTitle="Отчество"
                            lastNameName="lastNameWife"
                            firstNameName="firstNameWife"
                            middleNameName="middleNameWife"
                        />
                    </React.Fragment>
                }
                <SimpleButton>
                    {'Отправить форму'}
                </SimpleButton>
            </form>
        )
    }
}

Form.propTypes = {
    init: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    formTitle: PropTypes.string
}

Form.defaultProps = {
    initialValues: {},
    formTitle: 'Дефолт'
}

const mapStateToProps = (state) => ({
    initialValues: state.form.payload,
    switched: state.form.switched
})

const mapDispatchToProps = {
    init: actions.init,
    submit: actions.send,
    switchForm: actions.switchForm
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
