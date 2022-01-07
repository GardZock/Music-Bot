import { NormalCommands } from '../../structures/NormalCommands'
import { CustomClient } from '../../structures/Client'
import { Message, MessageEmbed, TextChannel, VoiceChannel } from 'discord.js'
import DisTube from 'distube'
import { playlists } from '../../assets/json/playlists.json'

export = class extends NormalCommands {
    constructor(client: CustomClient) {
        super(client, {

            name: 'radio',
            description: 'Toca a playlist do servidor.',
            aliases: ['r'],
            category: 'Música',
            howToUse: 'r [playlist]'
        })
    }

    run = async (client: CustomClient, message: Message, args: string[]) => {

        if (message.member?.permissions.has('ADMINISTRATOR')) {

            if (this.client.radioMode) {
                if (args[0]) {
                    const getPlaylists = playlists.find(m => m.name == args[0])
                    if (getPlaylists) {
                    const playlist = await (<DisTube>this.client.distube).handler.createCustomPlaylist(message.member, (<string[]><unknown>getPlaylists?.musics), { name: `${getPlaylists?.name}` }, true);
                    (<DisTube>this.client.distube).playVoiceChannel((<VoiceChannel>client.channels.cache.get(`${process.env.MUSIC_CHANNEL}`)), playlist, { skip: true, unshift: false, textChannel: (<TextChannel>message.channel), message })
                    return message.reply({ content: `Playlist encontrada, tocando músicas... *${getPlaylists?.name}*` })
                    }
                }
                this.client.radioMode = false;
                (<DisTube>this.client.distube).stop(message);
                return message.reply({ content: `Modo rádio desativado com sucesso!` })
            }
            var getPlaylists;
            if (args[0]) {
                getPlaylists = playlists.find(m => m.name == args[0])
                if (!getPlaylists) return message.reply({ content: `Playlist não encontrada.` })
            } else {
                const embed = new MessageEmbed()
                    .setTitle('Playlists Disponíveis')
                    .setColor('#ff0000')

                getPlaylists = []
                playlists.length = 10
                for (const i in playlists) {
                    if (playlists[i] == undefined) break;
                    getPlaylists.push(`**Nome:** ${playlists[i].name}, **Músicas:** ${playlists[i].musics.length}`)
                }

                embed.setDescription(`${getPlaylists.length <= 0 ? 'Nenhuma playlist disponível.' : getPlaylists.join('\n')}`)
                return message.reply({ embeds: [embed] })
            }
            const playlist = await (<DisTube>this.client.distube).handler.createCustomPlaylist(message.member, (<string[]><unknown>getPlaylists?.musics), { name: `${getPlaylists?.name}` }, true);
            (<DisTube>this.client.distube).playVoiceChannel((<VoiceChannel>client.channels.cache.get(`${process.env.MUSIC_CHANNEL}`)), playlist, { skip: true, unshift: false, textChannel: (<TextChannel>message.channel), message }).then(async () => {
                setTimeout(async () => { await (<DisTube>this.client.distube).setRepeatMode(message, 2) }, 3000)
            });
            this.client.radioMode = true;
            return message.reply({ content: `Playlist encontrada, tocando músicas... *${getPlaylists?.name}*` })
        } else {
            return message.reply({ content: `O Modo rádio está **${this.client.radioMode ? 'ativado' : 'desativado'}**, mas apenas administradores tem acesso a ele.` })
        }
    }
}