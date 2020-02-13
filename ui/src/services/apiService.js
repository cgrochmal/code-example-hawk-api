// TODO: split into separate services (userService, messageService) as app grows

/**
 *  This is hard-coded for this assignment, but in a real-world scenario would use
 *  an environment variable set by the build (or overwritten by the developer)
*/ 
const apiBaseUri = 'http://localhost:8000/api/hawk'

/**
 * 
 * @param {*} page - current page, starts at 0
 * @param {*} pageSize - number of hawks per page
 * @param {*} sortDir - 'ASC' or 'DESC'
 * @param {*} sortField - 'name', 'size', or 'gender'
 * @param {*} filter - filter hawks by name
 */
async function getHawks(page, pageSize=10, sortDir, sortField, filterText) {
  
  const url = `${apiBaseUri}/list?pageSize=${pageSize}`
    + (page ? '&pageToken='+page : '')
    + (sortDir ? '&sortDir='+sortDir : '')
    + (sortField ? '&sortField='+sortField : '')
    + (filterText ? '&filter='+filterText : '')
  
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson.hawks
  // TODO: error handling
}

/**
 * Update existing hawk
 * @param {object} hawk
 */
async function updateHawk(hawk) {
  const response = await fetch(`${apiBaseUri}/${hawk.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(hawk)
  })
  const responseJson = await response.json()
  return responseJson
}

/**
 * Create new hawk
 * @param {object} hawk
 */
async function createHawk(hawk) {
  const response = await fetch(apiBaseUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(hawk)
  })
  const responseJson = await response.json()
  return responseJson
}

export default {
  createHawk,
  getHawks,
  updateHawk
}