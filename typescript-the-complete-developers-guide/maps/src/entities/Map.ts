/// <reference path="../../node_modules/@types/googlemaps/index.d.ts" />

import { IMappable } from '../interfaces'

export class Map {
  private googleMap: google.maps.Map

  constructor(id: string) {
    this.googleMap = new google.maps.Map(document.getElementById(id), {
      zoom: 1,
      center: { lat: 0, lng: 0 }
    })
  }

  addMarker(mappable: IMappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      })

      infoWindow.open(this.googleMap, marker)
    })
  }
}
