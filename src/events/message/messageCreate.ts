import { Event } from '../../structures/Event'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'

export = class extends Event {
    constructor(client: CustomClient) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (message: Message) => {

        if (message.author.bot) return;
        if (message.channel.type === "DM") return;
        if (![`${process.env.MUSIC_TEXTCHANNEL}`].includes(message.channel.id)) return;

        const prefix = process.env.DEFAULT_PREFIX

        try {
            if (!message.content.toLowerCase().startsWith((<string>prefix))) return;

            var args = message.content.slice((<string>prefix).length).split(' ');
            const cmd = (<string>args.shift()).toLowerCase();

            if (cmd.length === 0) return;

            const command = this.client.normalCommands.find((c: { name: string }) => c.name == cmd) || this.client.normalCommands.find((a: { aliases: string[] }) => a.aliases && a.aliases.includes(cmd));

            if (!command) return;
            if (!['help', 'ajuda'].includes(command.name) && !message.member?.voice.channel || `${process.env.MUSIC_CHANNEL}` != `${message.member?.voice.channel?.id}`) return message.reply({ content: `Você precisa estar em um canal de voz para executar este comando.` })
            if (command) command.run(this.client, message, args);
        } catch (error) {
            console.log('Erro em messageCreate.js', error)
        }
    }
}