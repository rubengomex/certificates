import { Analyzer } from '../interfaces'
import { MatchData } from '../types'
import { MatchResult } from '../enums'

export class WinsAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    const wins = matches.reduce((acc, match) => {
      if (
        (match[1] === this.team && match[5] === MatchResult.HomeWin) ||
        (match[2] === this.team && match[5] === MatchResult.AwayWin)
      )
        acc++

      return acc
    }, 0)

    return `Team ${this.team} won ${wins} games!`
  }
}
