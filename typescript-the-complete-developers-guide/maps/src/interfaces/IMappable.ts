export interface IMappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
