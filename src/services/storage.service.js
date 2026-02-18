const {ImageKit} = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadOnImageKit(buffer) {
    const result = await client.files.upload({
        file: buffer,
        fileName: "music_" + Date.now(),
        folder:"lotify-backend/songs"
    });

    return result;
}

module.exports = {uploadOnImageKit};

