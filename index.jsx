import React, { Component, PropTypes, Children, createElement } from 'react'
import ReactDOM from 'react-dom'
import axe from 'react-axe'
import a11y from 'react-a11y'
import Portal from 'react-travel'
import Transition from 'react-motion-ui-pack'
import { Overlays, Tabs, ComboBox } from '../src/react-aria'

// axe(React)
// a11y(React)

// Inspiration
// http://www.oaa-accessibility.org/
// https://standards.usa.gov/
// http://ianmcburnie.github.io/mindpatterns/
// http://jqueryui.com/widget/
// dropdown - https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus#Success_Criteria_2.1.1_Keyboard
// tooltip - https://rawgit.com/w3c/aria-in-html/master/index.html#aria-labelledby-and-aria-describedby

// Components that can be built
// - Popover ✓
// - Modal ✓
// - Dropdown ✓
// - Tooltip ✓
// - Select ✓
// - ComboBox ✓
// - Tabs ✓
// - Accordion ✓
// - Panel ✓
// - Rows & Columns https://www.w3.org/TR/wai-aria-practices/#grid

const { Trigger, Overlay, Item } = Overlays
const { TabList, Tab, TabPanel } = Tabs
const { Input, ListBox, Option } = ComboBox

import './main.scss'

class SelectDemo extends Component {
  state = {
    isOpen: false
  }

  _toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { value, isOpen } = this.state
    return (
      <div>
        <Trigger
          controls="select"
          overlayRole="menu"
          isOpen={isOpen}
          onToggle={this._toggle}
        >
          { value ? value : 'Select Option' }
        </Trigger>
        { isOpen &&
          <Overlay
            id="select"
            role="menu"
            onRequestClose={() => { this.setState({ isOpen: false }) }}
            onItemSelection={({ value }) => { this.setState({ isOpen: false, value }) }}
          >
            <Item value="Item 1">Item 1</Item>
            <Item value="Item 2">Item 2</Item>
            <Item value="Item 3">Item 3</Item>
          </Overlay>
        }
      </div>
    )
  }
}

class ComboBoxDemo extends Component {
  state = {
    currValue: '',
    highlightedIndex: null
  }

  renderItems() {
    const { highlightedIndex } = this.state
    const items = []

    for (let i = 0; i < 3; i++) {
      items.push(
        <Option
          key={i}
          index={i}
          value={`Item ${i}`}
          style={{
            border: '1px solid',
            borderColor: (highlightedIndex === i) ? '#ccc' : 'transparent'
          }}
        >
          Item {i + 1}
        </Option>
      )
    }

    return items
  }

  render() {
    const { currValue } = this.state
    return (
      <ComboBox.Manager>
        <Input
          value={currValue}
          onChange={e => this.setState({ currValue: e.target.value })}
        />
        { currValue.length > 0 &&
          <ListBox
            onRequestClose={() => {
              this.setState({ currValue: '' })
            }}
            onItemHighlight={(item) => {
              console.log('highlighted:', item)
              this.setState({ highlightedIndex: item.index })
            }}
            onItemSelection={(item) => {
              console.log('selected:', item)
              this.setState({ currValue: '' })
            }}
          >
            {this.renderItems()}
          </ListBox>
        }
      </ComboBox.Manager>
    )
  }
}

class ModalDemo extends Component {
  state = {
    isOpen: false
  }

  modalStyles = {
    display: 'flex',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    pointerEvents: 'none'
  }

  modalContentStyles = {
    width: '100%',
    maxWidth: 600,
    padding: 12,
    margin: 'auto',
    background: 'rgb(255, 255, 255)',
    pointerEvents: 'bounding-box'
  }

  render() {
    const { isOpen } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ isOpen: true })}>
          Open Modal
        </button>
        <Transition>
          { isOpen &&
            <div
              key="popover"
              style={this.modalStyles}
            >
              <Overlay
                role="popover"
                scopeFocus
                onRequestClose={() => this.setState({ isOpen: false })}
                style={this.modalContentStyles}
              >
                <div>Modal</div>
                <div>
                  Modal Content 💁🏼
                  <button>Scope</button>
                  <button>Focus</button>
                  <button>Test</button>
                </div>
              </Overlay>
            </div>
          }
        </Transition>
      </div>
    )
  }
}

class TabsDemo extends Component {
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

  render() {
    const { tabs, activeId } = this.state
    return (
      <Tabs.Manager
        activeTabId={activeId}
        onChange={id => this.setState({ activeId: id })}
        className="tab-set"
      >
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
      </Tabs.Manager>
    )
  }
}

class AccordionDemo extends Component {
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
      <Tabs.Manager
        accordion
        multiselect
      >
        <TabList>
          {tabs.map(({ tab, panel }) =>
            <div key={tab}>
              <Tab id={tab}>
                {tab}
              </Tab>
              <TabPanel controlledBy={tab}>
                {panel}
              </TabPanel>
            </div>
          )}
        </TabList>
      </Tabs.Manager>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>Select Menu</h1>
        <SelectDemo/>

        <h1>ComboBox</h1>
        <ComboBoxDemo/>

        <h1>Modal</h1>
        <ModalDemo/>

        <h1>Tabs (Stateless)</h1>
        <TabsDemo/>

        <h1>Accordion (Stateful)</h1>
        <AccordionDemo/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
