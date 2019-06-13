import faker from 'faker'
import { IMappable } from '../interfaces'

export class User implements IMappable {
  name: string
  location: {
    lat: number
    lng: number
  }

  constructor() {
    this.name = faker.name.firstName()
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    }
  }

  markerContent(): string {
    return `User Name: ${this.name}`
  }
}
