import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import apiService from '../../services/apiService'
import './editHawkContainer.scss'

export default class editHawkContainer extends React.Component {

  constructor(props) {
    super(props)
    editHawkContainer.propTypes = {
      hawk: PropTypes.object.isRequired,
      handleUpdateHawk: PropTypes.func
    }
    this.state = {
      // deep copy to avoid mutating props.hawk
      hawk: _.cloneDeep(props.hawk),
      dataChanged: false
    }
    this.updateHawk = this.updateHawk.bind(this)
  }

  /**
   * EVENT HANDLERS
   */

  /**
   * @param e: DOM event for <input> change
   * @param fieldName: should correspond to a property on this.state.hawk
   */
  handleFieldChange(e, fieldName) {
    const {hawk} = this.state
    const newValue = e.target.value
    const oldValue = hawk[fieldName]
    // allows this function to handle both string and numeric fields
    const newValueForCompare = typeof newValue === 'string' ? newValue.toLowerCase() : newValue
    const oldValueForCompare = typeof oldValue === 'string' ? oldValue.toLowerCase() : oldValue
    if (newValueForCompare !== oldValueForCompare) {
      hawk[fieldName] = newValue
      this.setState({hawk, dataChanged: true})
    }
  }

  /**
   * Form submission handler
   */
  async updateHawk(e) {
    e.preventDefault()
    // TODO: input validation
    const {hawk, dataChanged} = this.state
    const {handleUpdateHawk} = this.props
    if (dataChanged) {
      // immediatly update UI without waiting on UI
      handleUpdateHawk(hawk)
      const updatedHawk = await apiService.updateHawk(hawk)
      // update with actual record from API
      handleUpdateHawk(updatedHawk)
      // TODO: rollback logic in case of API failure
    }
  }

  /**
   * RENDER FUNCTIONS
   */
  render() {
    const {hawk, dataChanged} = this.state
    const hawkSizeLower = hawk.size.toLowerCase()
    const hawkGenderLower = hawk.gender.toLowerCase()

    // TODO: componentize fields (radio button fields, text fields, and numeric range fields should each be a component)
    return (
      <div className='edit-hawk'>
        <form onSubmit={this.updateHawk}>
          {/* NAME */}
          <span className='edit-hawk__name'>
            <label className='edit-hawk__label' htmlFor='hawk-name'>Name</label>
            <input type='text' id='hawk-name' onChange={e => this.handleFieldChange(e, 'name')} value={hawk.name}/>
          </span>
          {/* SIZE */}
          <span className='edit-hawk__size'>
            <label className='edit-hawk__label'>Size</label>
            <label className='edit-hawk__sublabel' htmlFor='small'>
              <input type="radio" checked={hawkSizeLower === 'small'} onChange={e => this.handleFieldChange(e, 'size')} id="small" value="SMALL"/>
              Small
            </label>
            <label className='edit-hawk__sublabel' htmlFor='medium'>
              <input type="radio" checked={hawkSizeLower === 'medium'} onChange={e => this.handleFieldChange(e, 'size')} id="medium" value="MEDIUM"/>
              Medium
            </label>
            <label className='edit-hawk__sublabel' htmlFor='large'>
              <input type="radio" checked={hawkSizeLower === 'large'} onChange={e => this.handleFieldChange(e, 'size')} id="large" value="LARGE"/>
              Large
            </label>
          </span>
          {/* GENDER */}
          <span className='edit-hawk__gender'>
            <label className='edit-hawk__label'>Gender</label>
            <label className='edit-hawk__sublabel' htmlFor='male'>
              <input type="radio" checked={hawkGenderLower === 'male'} onChange={e => this.handleFieldChange(e, 'gender')} id="male" value="MALE"/>
              Male
            </label>
            <label className='edit-hawk__sublabel' htmlFor='female'>
              <input type="radio" checked={hawkGenderLower === 'female'} onChange={e => this.handleFieldChange(e, 'gender')} id="female" value="FEMALE"/>
              Female
            </label>
          </span>
          {/* LENGTH */}
          <span className='edit-hawk__length'>
            <label className='edit-hawk__label'>Length</label>
            <label className='edit-hawk__sublabel' htmlFor='lengthBegin'>
              From
              <input type="number" value={hawk.lengthBegin} onChange={e => this.handleFieldChange(e, 'lengthBegin')} id="lengthBegin"/>
            </label>
            <label className='edit-hawk__sublabel' htmlFor='lengthEnd'>
              To
              <input type="number" value={hawk.lengthEnd} onChange={e => this.handleFieldChange(e, 'lengthEnd')} id="lengthEnd"/>
              cm
            </label>
          </span>
          {/* WINGSPAN */}
          <span className='edit-hawk__wingspan'>
            <label className='edit-hawk__label'>Wingspan</label>
            <label className='edit-hawk__sublabel' htmlFor='wingspanBegin'>
              From
              <input type="number" value={hawk.wingspanBegin} onChange={e => this.handleFieldChange(e, 'wingspanBegin')} id="wingspanBegin"/>
            </label>
            <label className='edit-hawk__sublabel' htmlFor='wingspanEnd'>
              To
              <input type="number" value={hawk.wingspanEnd} onChange={e => this.handleFieldChange(e, 'wingspanEnd')} id="wingspanEnd"/>
              cm
            </label>
          </span>
          {/* WEIGHT */}
          <span className='edit-hawk__weight'>
            <label className='edit-hawk__label'>Weight</label>
            <label className='edit-hawk__sublabel' htmlFor='weightBegin'>
              From
              <input type="number" value={hawk.weightBegin} onChange={e => this.handleFieldChange(e, 'weightBegin')} id="weightBegin"/>
            </label>
            <label className='edit-hawk__sublabel' htmlFor='weightEnd'>
              To
              <input type="number" value={hawk.weightEnd} onChange={e => this.handleFieldChange(e, 'weightEnd')} id="weightEnd"/>
              grams
            </label>
          </span>
          {/* URL */}
          <span className='edit-hawk__url'>
            <label className='edit-hawk__label' htmlFor='hawk-url'>Url</label>
            <input type='text' id='hawk-url' onChange={e => this.handleFieldChange(e, 'pictureUrl')} value={hawk.pictureUrl}/>
          </span>
          {/* COLOR DESCRIPTION */}
          <span className='edit-hawk__color'>
            <label className='edit-hawk__label' htmlFor='hawk-color'>Color Description</label>
            <textarea id='hawk-color' onChange={e => this.handleFieldChange(e, 'colorDescription')} value={hawk.colorDescription}/>
          </span>
          {/* BEHAVIOR DESCRIPTION */}
          <span className='edit-hawk__behavior'>
            <label className='edit-hawk__label' htmlFor='hawk-behavior'>Behavior Description</label>
            <textarea id='hawk-behavior' onChange={e => this.handleFieldChange(e, 'behaviorDescription')} value={hawk.behaviorDescription}/>
          </span>
          {/* HABITAT DESCRIPTION */}
          <span className='edit-hawk__behavior'>
            <label className='edit-hawk__label' htmlFor='hawk-habitat'>Habitat Description</label>
            <textarea id='hawk-habitat' onChange={e => this.handleFieldChange(e, 'habitatDescription')} value={hawk.habitatDescription}/>
          </span>

          <input type='submit' disabled={!dataChanged}/>
        </form>
      </div>
    )
  }
}