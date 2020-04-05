var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Document = require('../models/document');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occured',
    error: error
  });
}

router.get('/', function (request, response, next) {
  Document.find()
  .then(documents => {
    res.status(200).json({
      message: 'document fetched successfully',
      documents: documents
    });
  })
  .catch(error => {
    returnError(res, error);
  });
});

router.post('/', function (request, response, next) {
  var maxDocumentId = sequenceGenerator.nextId("documents");
  var document = new Document ({
    id: maxDocumentId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });
  document.save(function (err, response) {
    if (err) {
      return response.status(500).json({
        title: 'an error occured',
        error: err
      });
    }
  })
  });

  router.patch('/:id', function (request, response, next) {
    Document.findOne({id: request.params.id}, function (err, document) {
      if (err || !document) {
        return response.status(500).json({
          title: 'No document found',
          error: {document: 'Document not found'}
        });
      }
      document.name = request.body.name;
      document.description = request.body.description;
      document.url = request.body.url;

      saveDocument(response, document);
    });
  });

  router.delete('/:id', function (request, response, next) {
    var query = {id: request.params.id};

    Document.findOne(query, function (err, document) {
      if (err) {
        return response.status(500).json({
          title: 'no Document Found',
          error: err
        });
      }
      if (!document) {
        return response.status(500).json({
          title: 'no document found!',
          error: {documentId: request.params.id}
        })
      }

      Document.remove()
      .catch(error => {
        returnError(res, error);
      });
    });
  });

  module.exports = router;
