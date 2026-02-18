const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadOnImageKit } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function uploadMusic(req, res) {

        const { title } = req.body;
        const file = req.file;

        const result = await uploadOnImageKit(file.buffer.toString('base64'));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id,

        })

        res.status(201).json({
            message: "Music uploaded sucessfully",
            music: {
                id: music._id,
                title: music.title,
                uri: music.uri,
                artist: music.artist
            }
        });
}

async function createAlbum(req, res) {

        const {title,musics} = req.body;

        const album = await albumModel.create({
            title,
            musics,
            artist: req.user.id
        });

        res.status(201).json({
            message:"Album created successfully",
            album:{
                id: album._id,
                title: album.title,
                musics: album.musics,
                artist: album.artist
            }
        });
}

async function getAllMusics(req, res) {
    const musics = await musicModel.find().populate("artist", "username");

    res.status(200).json({
        message:"Musics fetched successfully",
        musics,
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find();

    res.status(200).json({
        message:"All Albums fetched successfully"
    })
}



module.exports = { uploadMusic, createAlbum, getAllMusics };