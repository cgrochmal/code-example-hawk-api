import React from 'react'
import renderer from 'react-test-renderer'
import HawkContainer from './hawkContainer'
import TestHelper from '../../test/testHelper'

it('matches the HawkContainer snapshot', () => {
  const tree = renderer
    .create(<HawkContainer/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})