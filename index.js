var express = require('express')
var bodyParser = require('body-parser');
var panda = require('panda');

var config = {
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY,
  cloudId: process.env.CLOUD_ID
}

var app = express();

app.set('port', (process.env.PORT || 5000))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.use(bodyParser());

app.get('/', function(request, response) {
  response.render('index.html')
})

app.post('/panda/authorize_upload', function(request, response) {
  var client = panda.createClient(config);
  var payload = JSON.parse(request.body.payload);
  var url;
  var options = {};
  if (payload.filename) {
    url = '/videos/upload.json';
    options.file_name = payload.filename;
    options.file_size = payload.filesize;
    options.profiles = "h264";
  } else {
    url = '/videos.json';
    options.source_url = payload.fileurl;
  }
  client.post(url, options, function(result) {
    console.log(result);
    response.json({upload_url: result.location});
  });
})

app.get('/upload', function(request, response) {
  response.render('upload.html')
})

app.post('/upload', function(request, response) {
  // response.json({video_file_id: request.params.panda_video_id})
  response.redirect('/videos/'+request.params.panda_video_id);
})

app.get('/videos', function(request, response) {
  var client = panda.createClient(config);
  client.get('/videos.json', {}, function(videos) {
    response.render('videos.html', {videos: videos});
  });
})

app.get('/videos/:id', function(request, response) {
  var client = panda.createClient(config);
  client.get('/videos/'+request.params.id+'.json', {}, function(video) {
    client.get('/videos/'+request.params.id+'/encodings.json', {}, function(encodings) {
      response.render('video.html', {video: video, encoding: encodings[0]});
    });
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
