import React from 'react'
import {mount} from 'enzyme'

import Dropdown from 'src/reusable_ui/components/dropdowns/Dropdown'

describe('Dropdown', () => {
  let wrapper

  const wrapperSetup = (override = {}) => {
    const props = {
      selectedKey: 'jimmy',
      onChange: () => {},
      children: null,
      ...override,
    }

    return mount(<Dropdown {...props} />)
  }

  const childSetup = (override = {}) => {
    const props = {
      itemKey: 'jimmy',
      value: 'jimmy',
      children: 'jimmy',
      ...override,
    }

    return <Dropdown.Item {...props} />
  }

  const childA = childSetup()

  const childB = childSetup({
    children: 'johnny',
    itemKey: 'johnny',
    value: 'johnny',
  })

  const children = [childA, childB]

  describe('collapsed', () => {
    beforeEach(() => {
      wrapper = wrapperSetup({
        selectedKey: 'johnny',
        children,
      })
    })

    it('can hide menu items', () => {
      expect(wrapper.find(Dropdown.Item)).toHaveLength(0)
    })
  })

  describe('expanded', () => {
    beforeEach(() => {
      wrapper = wrapperSetup({
        selectedKey: 'johnny',
        children,
      })

      wrapper.find('button').simulate('click')
    })

    it('can display menu items', () => {
      expect(wrapper.find(Dropdown.Item)).toHaveLength(2)
    })

    it('can set the selectedKey', () => {
      const actualProps = wrapper
        .find(Dropdown.Item)
        .find({selected: true})
        .props()

      const expectedProps = expect.objectContaining({
        itemKey: 'johnny',
        value: 'johnny',
      })

      expect(actualProps).toEqual(expectedProps)
    })
  })

  it('throws error when no children are present', () => {
    expect(() => {
      wrapperSetup({children: null})
    }).toThrow(
      'Dropdowns require at least 1 child element. We recommend using Dropdown.Item and/or Dropdown.Divider.'
    )
  })
})
