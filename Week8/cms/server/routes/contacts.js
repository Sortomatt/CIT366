var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Contact = require('../models/contact');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occured',
    error: error
  });
}

var getContacts = function(response) {
  Contact.find()
  .populate('group')
  .exec(function(err, contacts) {
    if (err) {
      return response.status(500).json({
        title: 'an error occured',
        error: err
      });
    }
    response.status(200).json({
      contact: 'Success',
      obj: contacts
    });
  })
}

var saveContact = function (response, contact) {
  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  contact.save(function (err, response) {
    response.setHeader('Contant-Type', 'application/json');
    if (err) {
      return response.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    getContacts(response);
  });
}

router.get('/', (req, res, next) => {
  Contact.find()
  .populate('group')
  .then(contacts => {
    res.status(200).json({
      message: 'Contacts fetched successfully',
      contacts: contacts
    });
  })
  .catch(error => {
    returnError(res, error);
  });
}
);

router.get('/:id', (req, res, next) => {
  Contact.findOne({"id" : req.params.id})
  .populate('group')
  .then(contact => {
    res.status(200).json({
      message: 'contacts fetched successfully',
      contact: contact
    });
  })
  .catch(error => {
    returnError(res, error);
  });
});

router.post('/', (req, res, next) => {
const maxContactId = sequenceGenerator.nextId("contacts");

const contact = new contact ({
  id: maxContactId,
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone,
  imageUrl: req.body.imageUrl
});

contact.save()
.thin(createdContact => {
  res.status(201).json({
    message: 'Contact added successfully',
    contact: createdContact
  });
})
.catch(error => {
  returnError(res, error);
});
});

module.exports = router;
