import React, { Component, PropTypes, createElement } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { scopeFocus, unscopeFocus } from 'a11y-focus-scope'
import noScroll from 'no-scroll'
import Members from '../utils/Members'
import keys from '../utils/keys'
import specialAssign from '../utils/special-assign'

const checkedProps = {
  tag: PropTypes.string,
  root: PropTypes.any,
  scopeFocus: PropTypes.bool,
  initialFocus: PropTypes.any,
  freezeScroll: PropTypes.bool,
  closeOnEscapeKey: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onItemFocus: PropTypes.func,
  onItemSelection: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
}

class Overlay extends Component {
  static childContextTypes = {
    overlayManager: PropTypes.object
  }

  static propTypes = {
    role: PropTypes.oneOf(['menu', 'popover', 'modal', 'tooltip', 'alert', 'listbox']),
    ...checkedProps
  }

  static defaultProps = {
    tag: 'div',
    role: 'popover',
    initialFocus: true,
    closeOnEscapeKey: true,
    closeOnOutsideClick: true,
    onRequestClose: () => null,
    onItemFocus: () => null,
    onItemSelection: () => null
  }

  members = new Members({
    onChange: this.props.onItemFocus,
    onSelect: this.props.onItemSelection
  })

  getChildContext() {
    return {
      overlayManager: {
        role: this.props.role,
        members: this.members,
        onItemSelection: this.props.onItemSelection
      }
    }
  }

  componentDidMount() {
    this._lastActiveElement = document.activeElement

    if (this.props.root) {
      this.members.setRootNode(findDOMNode(this.props.root))
    }

    if (this.props.scopeFocus) {
      scopeFocus(findDOMNode(this))
    }

    if (this.props.freezeScroll) {
      noScroll.on()
    }

    if (this.props.initialFocus) {
      this.members.focus(0)
    }

    this._registerEvents()
  }

  componentWillUnmount() {
    if (this.props.scopeFocus) {
      unscopeFocus()
    }

    if (this.props.freezeScroll) {
      noScroll.off()
    }

    if (this._lastActiveElement) {
      this._lastActiveElement.focus()
    }

    this._unregisterEvents()
  }

  getMembers = () => {
    return this.members
  }

  focusItem = (index) => {
    this.members.focus(index)
  }

  _registerEvents() {
    document.addEventListener('keydown', this._handleDocumentKeyDown)

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('click', this._handleDocumentClick)
    }
  }

  _unregisterEvents() {
    document.removeEventListener('keydown', this._handleDocumentKeyDown)

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('click', this._handleDocumentClick)
    }
  }

  _handleDocumentKeyDown = ({ keyCode }) => {
    if (keyCode === keys.escape) {
      this.props.onRequestClose()
    }
  }

  _handleDocumentClick = ({ target }) => {
    const node = findDOMNode(this)
    if ((node !== target) && !node.contains(target)) {
      this.props.onRequestClose()
    }
  }

  _getProps() {
    const { role, id } = this.props
    const props = {}

    if (role === 'menu') {
      props['role'] = 'menu'
    }
    else if (role === 'modal') {
      props['role'] = 'dialog'
    }
    else if (role === 'alert') {
      props['role'] = 'alertdialog'
    }
    else if (role === 'tooltip') {
      props['id'] = id
      props['role'] = 'tooltip'
    }
    else if (role === 'popover') {
      props['aria-labelledby'] = id
    }

    return specialAssign(props, this.props, checkedProps)
  }

  render() {
    const { tag, children } = this.props
    const props = this._getProps()

    if (typeof children === 'function') {
      return children(props)
    }

    return createElement(tag, props, children)
  }
}

export default Overlay
