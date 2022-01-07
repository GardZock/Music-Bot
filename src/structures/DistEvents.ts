import { CustomClient } from './Client'

class DistEvent {

    client: CustomClient
    name: string

    constructor(client: CustomClient, options: { name: string }) {
        this.client = client
        this.name = options.name
    }
}

export { DistEvent }