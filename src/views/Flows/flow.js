import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autoCancel from 'react-redux-http'

import { actions } from 'redux/modules/flow'
import { actions as jobActions } from 'redux/modules/job'

function mapStateToProps (state, props) {
  const { params: { flowId } } = props
  return {
    key: flowId,
    flowId,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    get: actions.get,
    queryJobs: jobActions.query,
    freed: actions.freed,
  }, dispatch)
}

export class FlowView extends Component {
  static propTypes = {
    flowId: PropTypes.string.isRequired,
    children: PropTypes.node,

    get: PropTypes.func.isRequired,
    freed: PropTypes.func.isRequired,
    queryJobs: PropTypes.func.isRequired,
  }

  componentDidMount () {
    const { get, queryJobs, flowId } = this.props
    get(flowId)
    queryJobs(flowId)
  }

  componentWillUnmount () {
    const { freed, flowId } = this.props
    freed(flowId)
  }

  render () {
    const { children } = this.props
    return children
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  autoCancel({ funcs: ['queryJobs'] })(FlowView)
)