var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occured',
    error: error
  });
}

router.get('/', function (request, response, next) {
  Message.find()
.then(messages => {
  res.status(200).json({
    message: 'message fetched successfully',
    messages: messages
  });
})
.catch(error => {
  returnError(res, error);
});
});

router.post('/', function (request, response, next) {
  var maxMessageId = sequenceGenerator.nextId("messages");
  var Message = new Message ({
    id: maxMessageId,
    subject: request.body.subject,
    msgText: request.body.msgText,
    sender: request.body.sender
  });
  saveMessage(response, message);
  });

  router.patch('/:id', function (request, response, next) {
    Message.findOne({id: request.params.id}, function (err, message) {
      if (err || !message) {
        return response.status(500).json({
          title: 'No message found',
          error: {message: 'Message not found'}
        });
      }
      message.subject = request.body.subject;
      message.msgText = request.body.msgText;
      message.sender = request.body.sender;

      saveMessage(response, message);
    });
  });

  router.delete('/:id', function (request, response, next) {
    var query = {id: request.params.id};

    Message.findOne(query, function (err, message) {
      if (err) {
        return response.status(500).json({
          title: 'no Message Found',
          error: err
        });
      }
      if (!message) {
        return response.status(500).json({
          title: 'no message found!',
          error: {messageId: request.params.id}
        })
      }

      Message.remove()
  .catch(error => {
    returnError(res, error);
  });
    then(message => {
      getMessages()
  });
    });
  });

  module.exports = router;
