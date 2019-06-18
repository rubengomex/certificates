import axios, { AxiosResponse, AxiosPromise } from 'axios'

interface HasId {
  id?: number
}

export class Sync<T extends HasId> {
  constructor(public url: string) {}

  async fetch(id: number): Promise<T> {
    const data = await axios
      .get(`${this.url}/${id}`)
      .then((response: AxiosResponse<T>) => response.data)

    return data
  }

  save(data: T): AxiosPromise {
    const { id } = data
    const insertOrUpdate = id
      ? axios.put(`${this.url}/${id}`, data)
      : axios.post(this.url, data)

    return insertOrUpdate
  }
}
