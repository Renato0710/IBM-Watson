const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

var port = 6001;
var tone;

var toneAnalyzer = new watson.ToneAnalyzerV3({
    iam_apikey: 'iTxYttEzaS8qb_0UyTYe3lOviSY510aTVb5VbVRdkr1c',
    version: '2016-05-19',
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api/'
});

app.get('/', function (req, res) {
    res.render('home', {tone});
});

app.post('/tone', function (req, res) {
    var texto = req.body.texto;
    toneAnalyzer.tone(
        {
          tone_input: texto,
          content_type: 'text/plain'
        },
        function(err, tone) {
          if (err) {
            console.log(err);
          } else {
            tone = tone;
            res.json(tone);
          }
        }
      );
});

app.listen(port, () => {
    console.log('Server listening on port: ' + port);
});