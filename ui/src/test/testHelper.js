function getMockHawk(id) {
  return   {
    "behaviorDescription": "some behavior",
    "colorDescription": "some color",
    "gender": "FEMALE",
    "habitatDescription": "some habitat",
    "id": id,
    "lengthBegin": 0,
    "lengthEnd": 0,
    "name": "test"+id,
    "pictureUrl": "www.ayylmao.com",
    "size": "SMALL",
    "weightBegin": 0,
    "weightEnd": 0,
    "wingspanBegin": 0,
    "wingspanEnd": 0
  }
}

function getMockHawks(hawkCount) {
  const hawks = []
  for (let i=0; i<hawkCount; i++) {
    hawks.push(getMockHawk(i))
  }
  return hawks
}

export default {
  getMockHawks
}