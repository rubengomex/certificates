// Regression type prediction
// Distance from house and predict the next house price based on the distances

require('@tensorflow/tfjs-node')
const tf = require('@tensorflow/tfjs')
const loadCSV = require('./load-csv')

function knn({ features, labels, predictionPoint, k }) {
  return (
    features
      .sub(predictionPoint)
      .pow(2)
      .sum(1)
      .pow(0.5)
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a, b) => (a.get(0) > b.get(0) ? 1 : -1))
      .slice(0, k)
      .reduce((acc, pair) => acc + pair.get(1), 0) / k
  )
}

let { features, labels, testFeatures, testLabels } = loadCSV(
  'kc_house_data.csv',
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ['lat', 'long'],
    labelColumns: ['price']
  }
)

features = tf.tensor(features)
labels = tf.tensor(labels)

testFeatures.forEach((testPoint, i) => {
  const result = knn({
    features,
    labels,
    predictionPoint: tf.tensor(testPoint),
    k: 10
  })
  const err = (testLabels[i][0] - result) / testLabels[i][0]
  console.log('Error percentage: %d%', (Math.abs(err) * 100).toFixed(2))
})
// console.log('Guess: %d, initial value: %d', result, testLabels[0][0])
