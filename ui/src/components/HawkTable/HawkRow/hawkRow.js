import React from 'react'
import PropTypes from 'prop-types'

import './hawkRow.scss'

/**
 * Helper Component for <HawkTable> - renders an individual row
 */

HawkRow.propTypes = {
  hawk: PropTypes.object.isRequired,
  handleViewHawk: PropTypes.func
}

export default function HawkRow(props) {
  const {hawk, handleViewHawk} = props

  return (
    <div className='hawk-row'>
      <span className='hawk-row__cell hawk-row__cell--name'>
        {hawk.name}
      </span>
      <span className='hawk-row__cell hawk-row__cell--size'>
        {hawk.size}
      </span>
      <span className='hawk-row__cell hawk-row__cell--gender'>
        {hawk.gender}
      </span>
      <span className='hawk-row__cell hawk-row__cell--view'>
        <button className='view-hawk-button' onClick={handleViewHawk}>{'View >>'}</button>
      </span>
    </div>
  )
}