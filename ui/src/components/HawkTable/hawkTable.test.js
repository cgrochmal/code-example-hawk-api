import React from 'react'
import renderer from 'react-test-renderer'
import HawkTable from './hawkTable'
import TestHelper from '../../test/testHelper'

it('matches the HawkTable snapshot', () => {
  const mockHawks = TestHelper.getMockHawks(20)
  const tree = renderer
    .create(<HawkTable hawks={mockHawks}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})