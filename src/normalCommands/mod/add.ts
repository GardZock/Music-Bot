import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message } from 'discord.js'
import playlistSchema from '../../database/playlistSchema'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'padd',
            description: 'Adiciona um item na database.',
            aliases: ['playlistadd'],
            category: 'Moderação',
            howToUse: 'padd [playlist] [url]'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {

        if (!message.member?.permissions.has('ADMINISTRATOR')) return message.reply({ content: `Você não tem permissão para executar este comando.` })

        const playlistData = await playlistSchema.findOne({ serverID: message.guild?.id })
        const name = args[0]
        if (!name) return message.reply({ content: `Você precisa adicionar o nome da playlist após o comando.` })
        const url = args[1]
        if (!url) return message.reply({ content: `Você precisa adicionar a url da música após o nome.` })

        if (!playlistData) {
            
            await playlistSchema.create({ 
                serverID: message.guild?.id,
                playlists: [
                    { name, music: url }
                ]
            })
            return message.reply({ content: `Playlist criada com sucesso!` })
        }
    }
}