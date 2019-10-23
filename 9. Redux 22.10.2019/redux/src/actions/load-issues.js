import getIssues from "../api"

const loadIssues = () =>
    ({
        type: 'PROMISE',
        actions: ['ISSUES_LOADING', 'ISSUES_LOADED', 'ISSUES_LOAD_FAILURE'],
        promise: getIssues()
    })

export default loadIssues