/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sid = require('shortid');
var fs = require('fs');
var mkdirp = require('mkdirp');
var skipper = require('skipper');

var UPLOAD_PATH = './.tmp/uploads';

// Setup id generator
sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
sid.seed(42);

function safeFilename(name) {
    name = name.replace(/ /g, '-');
    name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
    name = name.replace(/\.+/g, '.');
    name = name.replace(/-+/g, '-');
    name = name.replace(/_+/g, '_');
    return name;
}

function fileMinusExt(fileName) {
    return fileName.split('.').slice(0, -1).join('.');
}

function fileExtension(fileName) {
    return fileName.split('.').slice(-1);
}

// Where you would do your processing, etc
// Stubbed out for now
function processImage(id, name, path, cb) {
    console.log('Processing image');

    cb(null, {
        'result': 'success',
        'id': id,
        'name': name,
        'path': path
    });
}

module.exports = {
    upload: function (req, res) {
        var file = req.file('image'),
            id = sid.generate(),
            fileName = id + "." + fileExtension(safeFilename(file._files[0].stream.filename)),
            dirPath = UPLOAD_PATH + '/' + id,
            filePath = dirPath + '/' + fileName;

        console.log(file._files[0].stream);

        try {
            mkdirp.sync(dirPath, 0755);
        } catch (e) {
            console.log(e);
        }

        req.file('image').upload({
            dirname: id
        }, function (err, files) {
            if (err) {
                return res.serverError(err);
            }

            return res.json({
                message: files.length + ' Загрузка файл(ов) завершена!',
                files: files
            });
        });
    }
};

