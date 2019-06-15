import { OutputTarget } from '../interfaces'
import { writeFileSync } from 'fs'

export class HtmlReport implements OutputTarget {
  constructor(public filename: string) {}
  print(report: string): void {
    const html = `
      <div>
        <h1> Analysis Output: </h1>
        <div>${report}</div>
      </div>
    `

    writeFileSync(this.filename, html)
  }
}
