import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM from 'react-dom'
import axe from 'react-axe'
import a11y from 'react-a11y'
import Portal from 'react-travel'
import Transition from 'react-motion-ui-pack'
import { Overlays, Accordion, Manager, Toggle, Popover, Item, TabList, Tab, TabPanel } from '../src/react-aria'

// axe(React)
// a11y(React)

// Inspiration
// http://www.oaa-accessibility.org/
// https://standards.usa.gov/
// http://ianmcburnie.github.io/mindpatterns/
// http://jqueryui.com/widget/

// Components that could be built
// - Popover
// - Modal
// - Dropdown https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus#Success_Criteria_2.1.1_Keyboard
// - Tooltip https://rawgit.com/w3c/aria-in-html/master/index.html#aria-labelledby-and-aria-describedby
// - Select
// - ComboBox
// - Tabs
// - Accordion
// - Panel
// - Rows & Columns https://www.w3.org/TR/wai-aria-practices/#grid

import './main.scss'

class Dropdown extends Component {
  state = {
    selection: null
  }

  _handleSelection = (value, e) => {
    this.setState({ selection: value })
  }

  render() {
    return (
      <Manager
        type="menu"
        onItemSelection={this._handleSelection}
      >
        { isOpen =>
          <div>
            <h3>Dropdown</h3>
            <Toggle>
              {this.state.selection || 'Select A Menu Item'}
            </Toggle>
            { isOpen &&
              <Popover>
                <Item>Apples</Item>
                <Item>Pears</Item>
                <Item>Oranges</Item>
              </Popover>
            }
          </div>
        }
      </Manager>
    )
  }
}

class Modal extends Component {
  render() {
    return (
      <Manager
        type="modal"
        trapFocus
        freezeScroll
      >
        { isOpen =>
          <div>
            <h3>Modal</h3>
            <Toggle>
              Toggle Modal
            </Toggle>
            <Transition>
              { isOpen &&
                <div key="popover">
                  Clicking here will close since it's outside
                  <Popover>
                    <a href="#">One</a>
                    <a href="#">Two</a>
                    <a href="#">Three</a>
                  </Popover>
                </div>
              }
            </Transition>
          </div>
        }
      </Manager>
    )
  }
}

class PopoverComponent extends Component {
  state = {
    isFocused: false,
    searchValue: ''
  }

  render() {
    const { isFocused, searchValue } = this.state
    const isOpen = isFocused && searchValue.length > 0
    return (
      <Manager
        type="popover"
        isOpen={isOpen}
        onPopoverOpen={() => this.setState({ isOpen: true })}
        onPopoverClose={() => this.setState({ isOpen: false })}
        openPopoverOn="tap"
      >
        <div>
          <h3>Input Popover</h3>
          <Toggle
            tag="input"
            type="search"
            className="popover-toggle"
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            onChange={e => this.setState({ searchValue: e.target.value })}
          />
          { isOpen &&
            <Popover>
              Some cool popover content.
            </Popover>
          }
        </div>
      </Manager>
    )
  }
}

class Tabs extends Component {
  state = {
    tabs: [{
      id: 't1',
      title: 'Mm Bacon 🍗',
      panel: <div><p>Bacon ipsum dolor amet pork prosciutto tail ground round cow pancetta ham beef.  Brisket cupim shoulder drumstick turkey sausage cow pork beef pig venison boudin.  Ham hock bacon hamburger alcatra boudin shank shankle porchetta short ribs.  Jowl shank shoulder, pork belly tail ham hock ribeye fatback sirloin doner beef swine ground round meatball hamburger.</p><p>Venison pork turkey jerky pig.  Kevin andouille pastrami, ham hock sausage landjaeger sirloin tri-tip spare ribs boudin kielbasa tenderloin bresaola.  Short loin ribeye biltong capicola salami tenderloin, fatback ground round rump sirloin meatloaf porchetta.  Pork loin alcatra short loin ham hock kevin salami beef ribs filet mignon leberkas.  Bresaola pork landjaeger, tail jowl t-bone corned beef.  Cupim ground round tail brisket, pork belly short loin t-bone.  Beef ribs pork chop kevin short ribs frankfurter alcatra ball tip ground round jerky.</p></div>
    }, {
      id: 't2',
      title: 'Zombiez 💀',
      panel: <div><p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.</p></div>
    }, {
      id: 't3',
      title: 'Samuel 👨🏿',
      panel: <div><h1>No man, I don't eat pork</h1><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p></div>
    }],
    activeId: 't2'
  }

  _handleChange = (activeId) => {
    this.setState({ activeId })
  }

  render() {
    const { tabs, activeId } = this.state
    return (
      <Manager
        type="tabs"
        activeTabId={activeId}
        onChange={this._handleChange}
      >
        <div className="tab-set">
          <h3>Tabs (Stateless)</h3>
          <TabList className="tab-list">
            {tabs.map(({ id, title }) =>
              <Tab
                key={id}
                id={id}
                isActive={id === activeId}
                className={`tab-list-item ${id === activeId ? 'is-active' : ''}`}
              >
                {title}
              </Tab>
            )}
          </TabList>
          <div className="tab-panels">
            {tabs.map(({ id, panel }) =>
              <TabPanel
                key={id}
                controlledBy={id}
                isActive={id === activeId}
                className="tab-panel"
              >
                {panel}
              </TabPanel>
            )}
          </div>
        </div>
      </Manager>
    )
  }
}

class AccordionComponent extends Component {
  state = {
    tabs: [{
      tab: 'one',
      panel: <div>Some cool content for accordion one.</div>
    }, {
      tab: 'two',
      panel: <div>Some cool content for accordion two.</div>
    }, {
      tab: 'three',
      panel: <div>Some cool content for accordion three.</div>
    }]
  }

  render() {
    const { tabs } = this.state
    return (
      <Accordion.Tabs type="accordion">
        <div>
          <h3>Accordion (Stateful)</h3>
          <Accordion.TabList>
            {tabs.map(({ tab, panel }) =>
              <div key={tab}>
                <Accordion.Tab id={tab}>
                  {tab}
                </Accordion.Tab>
                <Accordion.TabPanel controlledBy={tab}>
                  {panel}
                </Accordion.TabPanel>
              </div>
            )}
          </Accordion.TabList>
        </div>
      </Accordion.Tabs>
    )
  }
}

class DropdownTwo extends Component {
  state = {
    isOpen: false
  }

  render() {
    const { isOpen } = this.state
    return (
      <div>
        <Overlays.Toggle
          type="popover"
          controls="popover"
          isOpen={isOpen}
        >
          Toggle
        </Overlays.Toggle>
        <Overlays.Overlay
          type="popover"
          id="popover"
          isOpen={isOpen}
          onOpen={() => this.setState({ isOpen: true })}
          onClose={() => this.setState({ isOpen: false })}
          onOutsideClick={() => this.setState({ isOpen: false })}
          onItemSelection={(member, e) => {
            console.log(member, e)
            this.setState({ isOpen: false })
          }}
        >
          { props => isOpen &&
            <div
              {...props}
            >
              <div>Popover!</div>
              <Overlays.Item>Item 1</Overlays.Item>
              <Overlays.Item>Item 2</Overlays.Item>
              <Overlays.Item>Item 3</Overlays.Item>
            </div>
          }
        </Overlays.Overlay>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <DropdownTwo/>
        {/*<Overlays.Manager>
          { isOpen =>
            <div>
              <Overlays.Toggle>
                Toggle
              </Overlays.Toggle>
              { isOpen &&
                <Overlays.Popover style={{ padding: 12, background: '#ccc' }}>
                  Popover!
                </Overlays.Popover>
              }
            </div>
          }
        </Overlays.Manager>*/}
        {/*<Dropdown/>
        <Modal/>
        <PopoverComponent/>*/}
        <Tabs/>
        {/*<AccordionComponent/>*/}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
