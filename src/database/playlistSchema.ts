import { Schema, model } from 'mongoose'

const playlistSchema = new Schema({
    serverID: { type: String, require: true, default: undefined },
    playlists: [
        {
            name: { type: String, require: true, default: undefined },
            musics: [String]
        }
    ]
})

export = model('playlists', playlistSchema)