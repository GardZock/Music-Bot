import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { logContent } from '../../functions/log'
import { Message, MessageEmbed } from 'discord.js'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'loge',
            description: 'Mostra a log de erros.',
            aliases: ['le'],
            category: 'Moderação',
            howToUse: 'loge'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {

        if (message.author.id != '434353523065487360') return;

        const data = logContent()

        const embed = new MessageEmbed()
        .setTitle('ERROR LOG')
        .setColor('#ff0000')
        .setDescription(`\`\`\`${await data}\`\`\``)
        .setTimestamp()


        return message.reply({ embeds: [embed] })
    }
}