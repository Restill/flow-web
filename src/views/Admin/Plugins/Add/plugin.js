import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Button from 'components/Buttonx'
import { PluginListItem } from '../components/Plugins'

export default class AddPluginController extends Component {
  static propTypes = {
    plugin: ImmutablePropTypes.map.isRequired,
    /**
     * 设置 是否启用 function (plugin: Plugin) {}
     */
    install: PropTypes.func,
  }

  renderActions () {
    const { install } = this.props
    return <Button onClick={install} size='xs' type='primary'>安装</Button>
  }

  render () {
    const { plugin } = this.props
    return <PluginListItem plugin={plugin}
      actions={this.renderActions()} />
  }
}
