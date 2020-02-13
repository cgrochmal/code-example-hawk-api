import React from 'react'
import PropTypes from 'prop-types'

import EditHawkContainer from '../EditHawkContainer/editHawkContainer'
import HawkTable from '../HawkTable/hawkTable'
import apiService from '../../services/apiService'
import './hawkContainer.scss'

export default class HawkContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hawks: [],
      loadingHawks: true,
      selectedHawk: null,
      filterText: null,
      addingHawk: false
    }
    // Not necessary to make these state variables - no re-render required on change
    this.currentPage = 0
    this.sortField = null
    this.sortDir = null

    // I prefer to use explicit binding to auto-bound arrow functions in my react components.
    // I'm happy to elaborate on reasons why in the follow-up interview
    this.addHawk = this.addHawk.bind(this)
    this.fetchCurrentHawks = this.fetchCurrentHawks.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleViewHawk = this.handleViewHawk.bind(this)
    this.handleUpdateHawk = this.handleUpdateHawk.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleAddHawk = this.handleAddHawk.bind(this)
  }

  componentDidMount() {
    this.fetchCurrentHawks()
  }

  /**
   * used for initial fetch, sort, and filter updates
   */
  async fetchCurrentHawks() {
    const {filterText} = this.state
    const pageSize = Math.max(this.state.hawks.length, 10)
    const hawks = await apiService.getHawks(0, pageSize, this.sortDir, this.sortField, filterText)
    this.setState({hawks, loadingHawks: false})
  }
  async fetchNextPageHawks(sortField, sortDir) {
    const {hawks} = this.state
    this.sortField = sortField
    this.sortDir = sortDir
    const nextPageHawks = await apiService.getHawks(this.currentPage, 10, sortField, sortDir)
    this.setState({hawks: hawks.concat(nextPageHawks)})
  }

  /**
   * EVENT HANDLERS
   */
  addHawk() {
    this.setState({addingHawk: true})
  }
  handleFilterChange(e) {
    const newFilterValue = e.target.value
    const {filterText} = this.state
    if (filterText !== newFilterValue) {
      this.setState({filterText: newFilterValue})
    }
  }
  handleSortChange(sortField, direction) {
    this.fetchCurrentHawks(sortField, direction)
  }
  handleViewHawk(hawk) {
    const {selectedHawk} = this.state
    if (selectedHawk && selectedHawk.id === hawk.id) this.setState({selectedHawk: null})
    else this.setState({selectedHawk: hawk})
  }
  handleAddHawk(newHawk) {
    const {hawks} = this.state
    if (newHawk) {
      // push new entry to top of list and remove last as to not mess up infinite scroll
      hawks.unshift(newHawk)
      if (hawks.length > 1) hawks.pop()
      this.setState({hawks})
    }
  }
  handleUpdateHawk(updatedHawk) {
    const {hawks} = this.state
    const updatedHawkIndex = hawks.findIndex(hawk => hawk.id === updatedHawk.id)
    if (updatedHawkIndex >= 0) {
      hawks[updatedHawkIndex] = updatedHawk
      // update UI and close hawk viewer
      this.setState({hawks, selectedHawk: null})
    }
  }

  /**
   * RENDER FUNCTIONS
   */

  renderHawkEdit() {
    const {selectedHawk, addingHawk} = this.state
    if (selectedHawk) {
      return <EditHawkContainer hawk={selectedHawk} handleUpdateHawk={this.handleUpdateHawk}/>
    }
    else if (addingHawk) {
      return <EditHawkContainer isNewHawk={true} handleCreateHawk={this.handleAddHawk}/>
    }
    else return null
  }

  render() {
    const {
      hawks, 
      loadingHawks, 
      selectedHawk, 
      filterText,
      addingHawk
    } = this.state

    return (
      <div className={'hawk-container' + ((selectedHawk || addingHawk) ? ' hawk-container--hawk-selected' : '')}>
        <div className='hawk-container__add-button'>
          <button className='add-hawk-button' onClick={this.addHawk} disabled={addingHawk}>&#43; Add Hawk</button>
        </div>
        <div className='hawk-container__filter'>
          <input className='filter-input' onChange={this.handleFilterChange} value={filterText || ''} placeholder={'filter by hawk name'}/>
          <button className='filter-submit' onClick={this.fetchCurrentHawks} disabled={!filterText}>Filter</button>
        </div>
        <div className={'hawk-container__table-and-editor'}>
          {
            !hawks.length && !loadingHawks
            ? <div className='hawk-container__no-hawks'>{'no hawks found for given filter'}</div>
            : <HawkTable 
                hawks={hawks} 
                handleSortChange={this.handleSortChange} 
                handleViewHawk={this.handleViewHawk}
                selectedHawk={selectedHawk}
              />
          }
          {
            this.renderHawkEdit()
          }
        </div>
      </div>
    )
  }
}