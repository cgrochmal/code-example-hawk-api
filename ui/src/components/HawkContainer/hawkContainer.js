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
    }
    this.currentPage = 0

    // I prefer to use explicit binding to auto-bound arrow functions in my react components.
    // I'm happy to elaborate on reasons why in the follow-up interview
    this.fetchCurrentHawks = this.fetchCurrentHawks.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)
    this.handleViewHawk = this.handleViewHawk.bind(this)
    this.handleUpdateHawk = this.handleUpdateHawk.bind(this)
  }

  componentDidMount() {
    this.fetchCurrentHawks(0, 10)
  }

  async fetchCurrentHawks(sortField, sortDir) {
    const pageSize = Math.max(this.state.hawks.length, 10)
    const hawks = await apiService.getHawks(0, pageSize, sortDir, sortField)
    this.setState({hawks, loadingHawks: false})
  }
  async fetchNextPageHawks(sortField, sortDir) {
    const {hawks} = this.state
    const nextPageHawks = await apiService.getHawks(this.currentPage, 10, sortField, sortDir)
    this.setState({hawks: hawks.concat(nextPageHawks)})
  }

  /**
   * EVENT HANDLERS
   */
  handleSortChange(sortField, direction) {
    this.fetchCurrentHawks(sortField, direction)
  }
  handleViewHawk(hawk) {
    const {selectedHawk} = this.state
    if (selectedHawk && selectedHawk.id === hawk.id) this.setState({selectedHawk: null})
    else this.setState({selectedHawk: hawk})
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
  render() {
    const {hawks, loadingHawks, selectedHawk} = this.state

    return (
      <div className={'hawk-container' + (selectedHawk ? ' hawk-container--hawk-selected' : '')}>
        <div className='hawk-container__add-button'>
        </div>
        <div className='hawk-container__filter'>
        </div>
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
          selectedHawk && <EditHawkContainer hawk={selectedHawk} handleUpdateHawk={this.handleUpdateHawk}/>
        }
      </div>
    )
  }
}