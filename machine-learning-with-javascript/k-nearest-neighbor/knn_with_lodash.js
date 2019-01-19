// Classification example
// Ball bucket (guess where the ball would fall)
const _ = require('lodash')
// need to fill out
const outputs = []

exports.onScoreUpdate = (dropPosition, bounciness, size, bucketLabel) => {
  outputs.push([dropPosition, bounciness, size, bucketLabel])
}

exports.runAnalysis = () => {
  const testSetSize = 100
  const k = 10

  _.range(0, 3).forEach(feature => {
    const data = _.map(outputs, row => [row[feature], _.last(row)])
    const [testSet, trainingSet] = splitDataSet(minMax(data, 1), testSetSize)
    const accuracy = _.chain(testSet)
      .filter(
        testPoint =>
          knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint)
      )
      .size()
      .divide(testSetSize)

    console.log('For feature of %d, Accuracy is %d', feature, accuracy)
  })
}

function knn(data, point, k) {
  // point has 3 values
  return _.chain(data)
    .map(row => [distance(_.initial(row), point), _.last(row)])
    .sortBy(row => row[0])
    .slice(0, k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value()
}

function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  )
}

function splitDataSet(data, testCount) {
  const shuffled = _.shuffle(data)
  const testSet = _.slice(shuffled, 0, testCount)
  const trainingSet = _.slice(shuffled, testCount)

  return [testSet, trainingSet]
}

function minMax(data, featureCount) {
  // deep clone with JSON api
  // const clonedData = JSON.parse(JSON.stringify(data))
  // with lodash
  const clonedData = _.cloneDeep(data)

  for (let i = 0; i < featureCount; i++) {
    const column = clonedData.map(row => row[i])
    const min = _.min(column)
    const max = _.max(column)

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min)
    }
  }

  return clonedData
}
