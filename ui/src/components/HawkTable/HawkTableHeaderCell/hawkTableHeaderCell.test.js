import React from 'react'
import renderer from 'react-test-renderer'
import HawkTableHeaderCell from './hawkTableHeaderCell'

it('matches the HawkTableHeaderCell snapshot', () => {
  const tree = renderer
    .create(<HawkTableHeaderCell cellType={'name'}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})