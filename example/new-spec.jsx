// NEW REACT ARIA SPEC
import { Popovers: { Manager, Toggle, Input, Popover, Item } } = 'react-aria'

////////////////////////////////////////////
// MODAL
///////////////////////////////////////////
<Popovers.Manager
  trapFocus={true||false} // keeps focus contained within popover
  freezeScroll={true||false} // prevents window from being able to scroll
  closeOnOutsideClick
>
 { isOpen =>
    <div>
      <Popovers.Toggle
        className={classNames(
          'popover-toggle',
          isOpen && 'is-active',
        )}
      >
        Toggle Modal
      </Popovers.Toggle>
      <Transition>
        { isOpen &&
          <Popovers.Modal>
            Modal Content
            <button type="button">Cancel</button>
            <button type="submit">Save</button>
          </Popovers.Modal>
        }
      </Transition>
    </div>
  }
</Popovers.Manager>


////////////////////////////////////////////
// TOOLTIP
///////////////////////////////////////////
<AriaWrapper>
  <Toggle on={'tap'||'hover'}>
    I could be an input or even an icon that toggles the tooltip.
  </Toggle>
  <Popover
    type="tooltip"
    isOpen={true||false} // user should be able to control open state of every popover
  >
    This is some helper information that pops up on hover.
  </Popover>
</AriaWrapper>


////////////////////////////////////////////
// ALERT
///////////////////////////////////////////
<Manager>
  <Popover
    type="alert"
    isOpen={this.state.hasError}
  >
    Alert things are broken!
    <Button type="button">Cancel</Button>
    <Button type="submit">Save</Button>
  </Popover>
</Manager>


////////////////////////////////////////////
// MENU
///////////////////////////////////////////
<Manager>
  <Toggle>
    Menu Toggle
  </Toggle>
  <Popover
    type="menu"
    onItemSelection={this._handleItemSelection} // items can be selected by mouse/keyboard so we have to control that and give users a callback
    closeOnItemSelection
  >
    <Item value="1">Menu Item 1</Item>
    <Item value="2">Menu Item 2</Item>
    <Item value="3">Menu Item 3</Item>
  </Popover>
</Manager>


////////////////////////////////////////////
// INPUT POPOVER
///////////////////////////////////////////
<Manager>
  <Input
    onChange={this._handleChange}
  />
  <Popover
    ref={c => this._popover = c}
    component={c => <Transition>{c}</Transition>} // specify transition in a component render function?
    isOpen={this.state.isOpen}
    onOpen={this._handleOpen}
    onClose={this._handleClose}
  >
    <Item onSelect={() => action1()}>Item 1</Item>
    <Item onSelect={() => action2()}>Item 2</Item>
    <Item onSelect={() => action3()}>Item 3</Item>
    <button onClick={() => this._popover.close()}>
      Open Something
    </button>
  </Popover>
</Manager>


////////////////////////////////////////////
// INPUT POPOVER
///////////////////////////////////////////
<Manager
  isOpen={this.state.isOpen}
  onOpen={this._handleOpen}
  onClose={this._handleClose}
>
  { isOpen =>
    <div>
      <Input
        onChange={this._handleChange}
      />
      <Transition> // or compose more naturally?
        { isOpen &&
          <Popover ref={c => this._popover = c}>
            <Item onSelect={() => action1()}>Item 1</Item>
            <Item onSelect={() => action2()}>Item 2</Item>
            <Item onSelect={() => action3()}>Item 3</Item>
            <button onClick={() => this._popover.close()}>
              Open Something
            </button>
          </Popover>
        }
      </Transition>
    </div>
  }
</Manager>


import { Tabs: { Manager, TabList, Tab, TabPanel } } from 'react-aria'

////////////////////////////////////////////
// TABS
// Might be better to split these components up into tabs and accordion since they differ so much
///////////////////////////////////////////
<Manager
  type="tabs||accordion"
  activeTabId={this.state.activeTabId}
  // activeTabs={{1: true, 0: true}} // maybe allow this for accordion
  defaultActiveTabId="2" // set the default tab if youre not controlling state
  multiselect={true||false}
  letterNavigation // allow users to navigate to a tab by letters
  onChange={id => this.setState({ activeTabId: id })}
>
  <TabList>
    <Tab id="1" isActive/>
    <Tab id="2"/>
    <Tab id="3"/>
  </TabList>
  <TabPanel controlledBy="1" isActive/>
  <TabPanel controlledBy="2"/>
  <TabPanel controlledBy="3"/>
</Manager>


////////////////////////////////////////////
// Public Functions
///////////////////////////////////////////
openPopover(popoverId)
closePopover(popoverId)
changeTab(tabId)