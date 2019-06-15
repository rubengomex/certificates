import { MatchData } from '../types'

// --------------------------------------- //
// Statistics
// ----------------------------------------//
export interface Analyzer {
  run(matches: MatchData[]): string
}

export interface OutputTarget {
  print(report: string): void
}

// --------------------------------------- //
// READERS
// ----------------------------------------//
export interface DataReader {
  read(): void
  data: string[][]
}
