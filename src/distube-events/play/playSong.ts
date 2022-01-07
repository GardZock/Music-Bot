import { DistEvent } from '../../structures/DistEvents'
import { CustomClient } from '../../structures/Client'
import { Queue, Song } from 'distube'
import { MessageEmbed } from 'discord.js'

export = class extends DistEvent {
    constructor(client: CustomClient) {
        super(client, {
            name: 'playSong'
        })
    }

    run = async (queue: Queue, song: Song) => {

        const embed = new MessageEmbed()
        .setColor('#ff0000')
        .addField('Tocando nova música', `[${song.name}](${song.url})\nDuração: ${song.formattedDuration}`)
        .setFooter({ text: "Possívelmente a música anterior foi finalizada/pulada." })

        return queue.textChannel?.send({ embeds: [embed] })
    }
}