import { User, Map, Company } from './entities'

const map = new Map('map')

map.addMarker(new User())
map.addMarker(new Company())
