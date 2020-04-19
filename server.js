require('module-alias/register')

const express = require('express')
const path = require('path')
const ejs = require('ejs')
const env = require('@env')
const hashtag = require('./models/hashtag');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();


app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, '/dist'))

app.use(express.static(path.join(__dirname, '/dist')))
app.use(express.json({ limit: '50mb' }));
app.use(cors());


app.get('/', (req, res) => {
  res.render('index');
});

mongoose.Promise = global.Promise;
mongoose.connect(env.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if (err) throw err;
});


app.post('/v1/hashtag', async (req, res) => {
  await new hashtag(req.body).save();
  res.json({
    ok: true
  })
})

app.listen(Number(env.port), () => {
  console.log(`Website started on port ${env.port}`)
})
