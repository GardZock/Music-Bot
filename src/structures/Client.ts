import { readdirSync } from "fs";
import { join } from "path";

import { Client, Message, ClientOptions } from 'discord.js';

import Distube, { DisTube } from 'distube'
import SoundCloudPlugin from '@distube/soundcloud'
import SpotifyPlugin from '@distube/spotify'

interface iOfNormal {
    name: string;
    description: string;
    category: string;
    aliases: string[];
    howToUse: string;
    run(client: CustomClient, message: Message, args: string[]): Promise<void>
}

class CustomClient extends Client {

    normalCommands: iOfNormal[];
    distube: Distube | undefined;
    radioMode: boolean | undefined;

    constructor(options: ClientOptions) {
        super(options)

        this.normalCommands = [];
        this.loadEvents();
        this.loadNormalCommands();
        this.dist();
        this.loadDistEvents()
        this.radioMode = false;
    }

    loadEvents() {
        const categories = readdirSync('src/events')

        for (const category of categories) {
            const events = readdirSync(`src/events/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `src/events/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.on(evt.name, evt.run)
            }
        }
    }

    loadNormalCommands() {
        const categories = readdirSync('src/normalCommands')

        for (const category of categories) {
            const commands = readdirSync(`src/normalCommands/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `src/normalCommands/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.normalCommands.push(cmd) || (<iOfNormal[]>this.normalCommands).filter((a: iOfNormal) => {
                    var position = a.aliases.indexOf(cmd.aliases)
                    return a.aliases[position];
                }).push(cmd.aliases)
            }
        }
    }

    async dist () {

        const dist = new DisTube(this, {
            searchSongs: 1,
            searchCooldown: 30,
            leaveOnEmpty: true,
            nsfw: false,
            leaveOnFinish: true,
            leaveOnStop: true,
            emptyCooldown: 0,
            plugins: [new SoundCloudPlugin(), new SpotifyPlugin()]
        })
        this.distube = dist
    }

    loadDistEvents() {
        const categories = readdirSync('src/distube-events')

        for (const category of categories) {
            const events = readdirSync(`src/distube-events/${category}`)

            for (const event of events) {
                const eventClass = require(join(process.cwd(), `src/distube-events/${category}/${event}`))
                const evt = new (eventClass)(this)

                this.distube?.on(evt.name, evt.run)
            }
        }
    }
}

export { iOfNormal, CustomClient }