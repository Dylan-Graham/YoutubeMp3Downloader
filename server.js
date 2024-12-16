const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
const port = 8000;
const corsOptions ={
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))


app.get('/download', async (req, res) => {
  try {
    const url = decodeURIComponent(req.query.url);
    const info = await ytdl.getInfo(url);
    const stream = ytdl(url, {
      format: 'mp3',
      quality: 'highestaudio',
    });
    res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to download MP3 file' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});