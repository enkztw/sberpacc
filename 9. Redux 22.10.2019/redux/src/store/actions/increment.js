import { INCREMENT } from '../types'

export default (num) => {
    return {
        type: INCREMENT,
        num
    }
}