import React from 'react'
import renderer from 'react-test-renderer'
import EditHawkContainer from './editHawkContainer'
import TestHelper from '../../test/testHelper'

it('matches the EditHawkContainer snapshot', () => {
  const mockHawks = TestHelper.getMockHawks(1)
  const tree = renderer
    .create(<EditHawkContainer hawk={mockHawks[0]} handleUpdateHawk={()=>{}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})