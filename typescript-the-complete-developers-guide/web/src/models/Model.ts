import { AxiosPromise } from 'axios'

type Callback = () => void

interface IModelAttributes<T> {
  set(value: T): void
  getAll(): T
  get<K extends keyof T>(key: K): T[K]
}

interface ISync<T> {
  fetch(id: number): Promise<T>
  save(data: T): AxiosPromise
}
interface IEvents {
  on(eventName: string, callback: Callback): void
  trigger(eventName: string): void
}

interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: IModelAttributes<T>,
    private events: IEvents,
    private sync: ISync<T>
  ) {}

  on = this.events.on
  trigger = this.events.trigger
  get = this.attributes.get

  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  fetch(): void {
    const id = this.attributes.get('id')
    if (typeof id !== 'number') throw new Error('Cannot fetch without id')

    this.sync.fetch(id).then(data => this.set(data))
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then(response => this.trigger('save'))
      .catch(() => this.trigger('error'))
  }
}
