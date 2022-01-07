import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'
import DisTube from 'distube'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'play',
            description: 'Toca uma música',
            aliases: ['p'],
            category: 'Música',
            howToUse: 'p [url]'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {

        try {
            const url = args.join(' ');
            if (this.client.radioMode) return message.reply({ content: `O Modo rádio está ativado.` })
            return (<DisTube>this.client.distube).play(message, url, { skip: false, unshift: true });
        } catch (err: any) {
            if (err.errorCode == 'NO_QUEUE') return message.reply({ content: `Não há músicas tocando para utilizar este comando.` })
        }
    }
}