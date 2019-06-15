import { Analyzer, OutputTarget } from '../interfaces'
import { MatchData } from '../types'
import { WinsAnalysis } from '../analyzers'
import { HtmlReport } from '../reports'

export class Summary {
  static winsAnalysisAndHtmlReport(team: string, filename: string): Summary {
    return new Summary(new WinsAnalysis(team), new HtmlReport(filename))
  }
  constructor(public analyzer: Analyzer, public target: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches)
    this.target.print(output)
  }
}
