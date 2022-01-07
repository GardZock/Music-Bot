import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'
import DisTube from 'distube'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'skip',
            description: 'Pula uma música.',
            aliases: ['pular'],
            category: 'Música',
            howToUse: 'skip'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {
        (<DisTube>this.client.distube).skip(message)
        return message.reply({ content: `Música pulada com sucesso.` })
    }
}