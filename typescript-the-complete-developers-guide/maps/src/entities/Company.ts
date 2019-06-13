import faker from 'faker'

export class Company {
  name: string
  catchPrase: string
  location: {
    lat: number
    lng: number
  }
}
