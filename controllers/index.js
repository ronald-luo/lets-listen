const youtubedl = require('youtube-dl-exec')

const index = (req, res, next) => {
    res.render('index');
}

const download = (req, res, next) => {

    if (req.body.audioOrVideo === 'video') {
        youtubedl(req.body.url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: req.body.url
            })
        .then(output => {
            if (!output) {
                res.json({error: 'invalid url type'})
            }
            for (let format of output.formats) {
                console.log(format.vcodec)
                if (format.acodec === 'mp4a.40.2' && format.vcodec === 'avc1.42001E') {
                    res.redirect(format.url)
                }
            }
        })
        .catch(error => {
            res.json({error: error})
        })
    } else {
        youtubedl(req.body.url, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            referer: req.body.url
            })
        .then(output => {
            if (!output) {
                res.json({error: 'invalid url type'})
            }
            for (let format of output.formats) {
                if (format.acodec === 'mp4a.40.2' && format.resolution === 'audio only') {
                    res.redirect(format.url)
                }
            }
        })
        .catch(error => {
            res.json({error: error})
        })
    }

}

module.exports = {
    index, 
    download,
}

// audio only medium quality (6)
// ext: 'm4a'
// audio_ext: 'm4a'
// video ext: 'none'
// resolution: 'audio only'
// acodec: 'mp4a.40.2'
// vcodec: 'none',

// video and audio 360p (17)
// ext: 'mp4'
// audio_ext: 'none'
// video_ext: 'mp4',
// resolution: '480x360',
// acodec: 'mp4a.40.2',
// vcodec: 'avc1.42001E',