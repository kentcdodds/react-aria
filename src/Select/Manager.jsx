import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import uuid from '../utils/uuid'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.node
}

class Select extends Component {
  static childContextTypes = {
    select: PropTypes.object
  }

  static propTypes = checkedProps

  static defaultProps = {
    tag: 'div'
  }

  state = {
    rootNode: null,
    activeDescendant: null
  }

  _id = uuid()

  getChildContext() {
    return {
      select: {
        uuid: this._id,
        setRootNode: this._setRootNode,
        rootNode: this.state.rootNode,
        setActiveDescendant: this._setActiveDescendant,
        activeDescendant: this.state.activeDescendant
      }
    }
  }

  _setRootNode = (node) => {
    this.setState({ rootNode: node })
  }

  _setActiveDescendant = (item) => {
    this.setState({ activeDescendant: item })
  }

  render() {
    const { tag, ...props } = this.props
    return tag ? createElement(tag, props) : props.children
  }
}

export default Select