import React from 'react'
import PropTypes from 'prop-types'

import HawkTableHeaderCell from './HawkTableHeaderCell/hawkTableHeaderCell'
import HawkRow from './HawkRow/hawkRow'
import './hawkTable.scss'

export default class HawkTable extends React.Component {
  constructor(props) {
    super(props)
    HawkTable.propTypes = {
      hawks: PropTypes.arrayOf(PropTypes.object),
      handleSortChange: PropTypes.func,
      handleViewHawk: PropTypes.func
    }
  }
  
  render() {
    const {hawks, handleSortChange} = this.props
    const rows = hawks.map( hawk => 
      <HawkRow hawk={hawk} handleViewHawk={this.props.handleViewHawk}  key={'hawk-'+hawk.id}/>
    )

    return (
      <div className='hawk-table'>
        <div className='hawk-table__header'>
          <HawkTableHeaderCell cellType={'name'} handleSortChange={handleSortChange}/>
          <HawkTableHeaderCell cellType={'size'} handleSortChange={handleSortChange}/>
          <HawkTableHeaderCell cellType={'gender'} handleSortChange={handleSortChange}/>
        </div>
        <div className='hawk-table__rows'>
          {rows}
        </div>
      </div>
    )
  }
}