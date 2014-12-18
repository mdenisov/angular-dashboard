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
                    console.log(fileData);
                    results.push(fileData);
                    next();
                }
            };

        //async.map(paramNames, function(file, cb) {
		//
        //    req.file(file).upload(function (err, files) {
		//
        //        // save the file, and then:
        //        return cb(err, files);
		//
        //    });
		//
        //}, function doneUploading(err, files) {
		//
        //    // If any errors occurred, show server error
        //    if (err) {return res.serverError(err);}
        //    // Otherwise list files that were uploaded
        //    return res.json(files);
		//
        //});

        sails.log.debug(req.file('file'));

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

