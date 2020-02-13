import React from 'react'
import PropTypes from 'prop-types'

import './hawkTableHeaderCell.scss'

HawkTableHeaderCell.propTypes = {
  // currently supported cellTypes are 'name', 'size', and 'gender'
  cellType: PropTypes.string.isRequired,
  // called with (cellType, 'asc'/'desc')
  handleSortChange: PropTypes.func
}

/**
 * Helper component representing an individual header cell in HawkTable
 */
export default function HawkTableHeaderCell(props) {
  const {handleSortChange, cellType} = props
  return (
    <span className={'header-cell header-cell--'+cellType}>
      <div className='header-cell__name'>
        {cellType}
      </div>
      <div className='header-cell__arrows'>
        <div className='arrow up-arrow' onClick={() => handleSortChange(cellType, 'asc')}>&#x25B2;</div>
        <div className='arrow down-arrow' onClick={() => handleSortChange(cellType, 'desc')}>&#x25BC;</div>
      </div>
    </span>
  )
}