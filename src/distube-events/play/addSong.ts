import { DistEvent } from '../../structures/DistEvents'
import { CustomClient } from '../../structures/Client'
import { Queue, Song } from 'distube'
import { MessageEmbed } from 'discord.js'

export = class extends DistEvent {
    constructor(client: CustomClient) {
        super(client, {
            name: 'addSong'
        })
    }

    run = async (queue: Queue, song: Song) => {

        const embed = new MessageEmbed()
        .setTitle('Nova Música Adicionada')
        .setColor('#ff0000')
        .setDescription(`**Nome:** [${song.name}](${song.url}), **Adicionado por:** ${song.member?.user.tag}`)
        .setFooter({ text: `Duração: ${song.formattedDuration}` })

        return queue.textChannel?.send({ embeds: [embed] })
    }
}