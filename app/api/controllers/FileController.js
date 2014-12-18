/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid'),
    path = require('path'),
    fs = require('fs'),
    async = require("async");

module.exports = {
    upload: function(req, res) {

        var results = [],
            streamOptions = {
                dirname: "assets/uploads/",
                saveAs: function(file) {
                    var filename = file.filename,
                        newName = uuid.v4() + path.extname(filename);
                    return newName;
                },
                completed: function(fileData, next) {

                    results.push(fileData);

                    next();

                    //Document.create(fileData).exec(function(err, savedFile){
                    //    if (err) {
                    //        next(err);
                    //    } else {
                    //        results.push({
                    //            id: savedFile.id,
                    //            url: '/files/' + savedFile.localName
                    //        });
                    //        next();
                    //    }
                    //});
                }
            };

        req.file('file').upload(Uploader.documentReceiverStream(streamOptions),
            function (err, files) {
                if (err) return res.serverError(err);

                res.json({
                    message: files.length + ' file(s) uploaded successfully!',
                    files: results
                });
            }
        );
    }
};

