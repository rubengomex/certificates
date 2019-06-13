import faker from 'faker'
import { IMappable } from '../interfaces'

export class Company implements IMappable {
  name: string
  catchPrase: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.company.companyName()
    this.catchPrase = faker.company.catchPhrase()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent(): string {
    return `
      <div>
        <h1>Company Name: ${this.name}</h1>
        <h3>Catchphrase: ${this.catchPrase}</h3>
      </div>
    `
  }
}
