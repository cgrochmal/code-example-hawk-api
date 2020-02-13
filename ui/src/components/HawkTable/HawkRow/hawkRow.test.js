import React from 'react'
import renderer from 'react-test-renderer'
import HawkRow from './hawkRow'
import TestHelper from '../../../test/testHelper'

it('matches the HawkRow snapshot', () => {
  const mockHawks = TestHelper.getMockHawks(1)
  const tree = renderer
    .create(<HawkRow hawk={mockHawks[0]}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})