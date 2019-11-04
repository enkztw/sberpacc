import React from 'react'
import { actions } from '../__data__'
import { connect } from 'react-redux'
import {reduxForm, Field, formValueSelector } from 'redux-form'
import CustomField from './form-field'

class Form extends React.Component {
    constructor (props) {
        super(props)

        this.handleSumbit = this.handleSumbit.bind(this)
    }

    handleSumbit (evt) {
        evt.preventDefault()
        this.props.customSend()
    }

    render () {
        return (
            <form onSubmit={this.handleSumbit}>
                <CustomField fields={[{placeholder: 'Имя', name: 'firstName'}, {placeholder: 'Фамилия', name: 'lastName'}]} />
                <p>
                    <label htmlFor="partner-checkbox">Есть партнер</label>
                    <Field type="checkbox" id="parnter-checkbox" component="input" name="isPartner" />
                </p>
                {this.props.isPartner ? <CustomField fields={[{placeholder: 'Имя партнера', name: 'partnerFirstName'}, {placeholder: 'Фамилия партнера', name: 'partnerLastName'}]} /> : ''}
                <button type="submit" disabled={this.props.pristine || this.props.submitting}>Выдать кредит</button>
                <button type="button" disabled={this.propspristine || this.props.submitting} onClick={this.props.reset}>Сбросить</button>
            </form>
        )
    }
}

const selector = formValueSelector('credit')

const ReduxForm = reduxForm({
    form: 'credit'
})(Form)

const mapStateToProps = (state) => {
    const { firstName, lastName, isPartner, partnerFirstName, partnerLastName } = selector(state, 'firstName', 'lastName', 'isPartner', 'partnerFirstName', 'partnerLastName')
    return {
        isPartner,
        firstName,
        lastName,
        partnerFirstName,
        partnerLastName
    }
}

const mapDispatchToProps = {
    init: actions.init,
    customSend: actions.send,
    switchForm: actions.switchForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm)
