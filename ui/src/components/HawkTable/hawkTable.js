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
      handleViewHawk: PropTypes.func,
      selectedHawk: PropTypes.object,
      // used for infinite scroll - called when the user scrolls all the way down
      onScrollEnd: PropTypes.func
    }
    this.rowsRef = React.createRef()

    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll() {
    const {onScrollEnd} = this.props
    const {scrollTop, scrollHeight, offsetHeight} = this.rowsRef.current
    if (scrollTop + offsetHeight >= scrollHeight && onScrollEnd) {
      onScrollEnd()
    }
  }
  
  render() {
    const {hawks, handleSortChange, handleViewHawk, selectedHawk} = this.props
    const rows = hawks.map( hawk => 
      <HawkRow 
        hawk={hawk} 
        handleViewHawk={handleViewHawk}  
        key={'hawk-'+hawk.id}
        selectedHawk={selectedHawk}
      />
    )

    return (
      <div className='hawk-table'>
        <div className='hawk-table__header'>
          <HawkTableHeaderCell cellType={'name'} handleSortChange={handleSortChange}/>
          <HawkTableHeaderCell cellType={'size'} handleSortChange={handleSortChange}/>
          <HawkTableHeaderCell cellType={'gender'} handleSortChange={handleSortChange}/>
        </div>
        <div className='hawk-table__rows' onScroll={this.handleScroll} ref={this.rowsRef}>
          {rows}
        </div>
      </div>
    )
  }
}