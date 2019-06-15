import { MatchReader } from './readers/csv'
import { Summary } from './statistics'

// Create an instance of MatchReader and pass in something satisfying the 'DataReader interface
const matchReader = MatchReader.fromCsv('./resources/football.csv')
matchReader.load()

const summary = Summary.winsAnalysisAndHtmlReport(
  'Man United',
  './src/output/report.html'
)

summary.buildAndPrintReport(matchReader.matches)
