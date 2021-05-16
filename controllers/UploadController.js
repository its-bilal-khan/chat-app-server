
module.exports = {
    UploadVideo(req, res) {
        console.log(req.file)
        res.send({
            status:true,
            filePath:req.file.filename
        });
    },
    UploadVideos(req, res) {
        console.log(req.files)
        res.send({
            status:true,
            filePath:req.files
        });
    }
};