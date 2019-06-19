type Callback = () => void

export class Eventing {
  events: { [key: string]: Callback[] } = {}

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName]
    this.events[eventName] = (handlers && [...handlers, callback]) || [callback]
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName]
    if (!handlers || !handlers.length) return

    handlers.forEach(callback => callback())
  }
}
