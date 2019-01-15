const _ = require('lodash')
const outputs = []
const distance = (pointA, pointB) => Math.abs(pointA - pointB)

exports.onScoreUpdate = (dropPosition, bounciness, size, bucketLabel) => {
  outputs.push([dropPosition, bounciness, size, bucketLabel])
}

exports.runAnalysis = () => {
  const testSetSize = 100
  const [testSet, trainingSet] = splitDataSet(outputs, testSetSize)

  _.range(1, 20).forEach(k => {
    const accuracy = _.chain(testSet)
      .filter(testPoint => knn(trainingSet, testPoint[0], k) === testPoint[3])
      .size()
      .divide(testSetSize)

    console.log('For k of %d, Accuracy is %d', k, accuracy)
  })
}

function knn(data, point, k) {
  return _.chain(data)
    .map(row => [distance(row[0], point), row[3]])
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

function splitDataSet(data, testCount) {
  const shuffled = _.shuffle(data)
  const testSet = _.slice(shuffled, 0, testCount)
  const trainingSet = _.slice(shuffled, testCount)

  return [testSet, trainingSet]
}
