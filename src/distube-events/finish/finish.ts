import { DistEvent } from '../../structures/DistEvents'
import { CustomClient } from '../../structures/Client'
import { Queue } from 'distube'
import { MessageEmbed } from 'discord.js'

export = class extends DistEvent {
    constructor(client: CustomClient) {
        super(client, {
            name: 'finish'
        })
    }

    run = async (queue: Queue) => {
        const embed = new MessageEmbed()
        .setTitle('Não há mais músicas a serem tocadas, então, a sessão foi finalizada.')
        .setColor('#ff0000')
        return queue.textChannel?.send({ embeds: [embed] });
    }
}