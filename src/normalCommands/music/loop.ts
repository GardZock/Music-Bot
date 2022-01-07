import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'
import DisTube from 'distube'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'loop',
            description: 'Ativa o modo loop durante uma música.',
            aliases: ['repetir'],
            category: 'Música',
            howToUse: 'loop'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {
        const mode = (<DisTube>this.client.distube).setRepeatMode(message)
        const modes = ["Desativado", "Música Atual", "Todos"]
        return message.reply({ content: `Modo loop setado para: **${modes[mode]}**` })
    }
}