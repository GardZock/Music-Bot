import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'
import DisTube from 'distube'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'stop',
            description: 'Para uma música.',
            aliases: ['s'],
            category: 'Música',
            howToUse: 's'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {
        (<DisTube>this.client.distube).stop(message);
        if (client.radioMode) client.radioMode = false;
        return message.reply({ content: `A Música foi parada com sucesso.` });
    }
}