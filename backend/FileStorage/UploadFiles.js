const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('MongoDB connection established');
});

let gfs;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.CONNECTION_STRING,
    file: (req, file) => {
        return {
            bucketName: 'uploads', // Setting collection name, default name is fs
            filename: file.originalname,
        };
    }
});

module.exports = {
    upload: multer({ storage })
};
