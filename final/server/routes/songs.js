var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Song = require('../models/song');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occured',
    error: error
  });
}

router.get('/', function (request, response, next) {
  Song.find()
  .then(songs => {
    res.status(200).json({
      message: 'song fetched successfully',
      songs: songs
    });
  })
  .catch(error => {
    returnError(res, error);
  });
});

router.post('/', function (request, response, next) {
  var maxSongId = sequenceGenerator.nextId("songs");
  var song = new Song ({
    id: maxSongId,
    name: request.body.name,
    description: request.body.description,
    author: request.body.author
  });
  song.save(function (err, response) {
    if (err) {
      return response.status(500).json({
        title: 'an error occured',
        error: err
      });
    }
  })
  });

  router.patch('/:id', function (request, response, next) {
    Song.findOne({id: request.params.id}, function (err, song) {
      if (err || !song) {
        return response.status(500).json({
          title: 'No song found',
          error: {song: 'Song not found'}
        });
      }
      song.name = request.body.name;
      song.description = request.body.description;
      song.url = request.body.author;

      saveSong(response, song);
    });
  });

  router.delete('/:id', function (request, response, next) {
    var query = {id: request.params.id};

    Song.findOne(query, function (err, song) {
      if (err) {
        return response.status(500).json({
          title: 'no Song Found',
          error: err
        });
      }
      if (!song) {
        return response.status(500).json({
          title: 'no song found!',
          error: {songId: request.params.id}
        })
      }

      Song.remove()
      .catch(error => {
        returnError(res, error);
      });
    });
  });

  module.exports = router;
