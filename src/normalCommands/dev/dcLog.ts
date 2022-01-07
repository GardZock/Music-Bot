import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { discloud } from '../../functions/log'
import { Message, MessageEmbed } from 'discord.js'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'dclog',
            description: 'Logs da Discloud',
            aliases: ['dl'],
            category: 'Moderação',
            howToUse: 'dl'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {

        if (message.author.id != '434353523065487360') return;
        const data = discloud.log()

        const embed = new MessageEmbed()
        .setTitle('ERROR LOG')
        .setColor('#ff0000')
        .setDescription(`\`\`\`${await (await data).logs}\`\`\``)
        .setTimestamp()

        return message.reply({ embeds: [embed] })
    }
}