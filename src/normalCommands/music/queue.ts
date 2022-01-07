import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message, MessageEmbed } from 'discord.js'
import DisTube from 'distube'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'queue',
            description: 'Mostra as músicas que estão sendo tocadas.',
            aliases: ['fila'],
            category: 'Música',
            howToUse: 'queue'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {
        const queue = (<DisTube>this.client.distube).getQueue(message)
        if (!queue) return message.reply({ content: `A Fila está vazia.` })

        const embed = new MessageEmbed()
        .setTitle('Fila de Músicas')
        .setColor('#ff0000')

        queue.songs.length = 10
        for (const i in queue.songs) {
            if (parseInt(i) > queue.songs.length) break;
            embed.addField(`${parseInt(i)+1}. ${queue.songs[i].name}`, `**Duração:** ${queue.songs[i].formattedDuration}, **Adicionado por:** ${queue.songs[i].member?.user.tag} ([link](${queue.songs[i].url}))`)
        }

        return message.reply({ embeds: [embed] })
    }
}