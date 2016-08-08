var User = require('../models/user.js');
var Contact = require('../models/contact.js');

exports.newContact = newContact;
exports.getAllContacts = getAllContacts;
exports.getContactById = getContactById;
exports.updateContact = updateContact;
exports.deleteContact = deleteContact;


function newContact(req, res) {

    User.findOne({customId: req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        } else {
            var contact = new Contact();      // create a new instance of the contact model
            contact.name = req.body.name;
            user.contacts.push(contact);

            user.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'contact created!' });
            });
        }
    });

}

function getAllContacts(req, res) {

    User.findOne({customId: req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        } else {
            res.json(user.contacts);
        }
    });
}

function getContactById(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        for (var i = 0; i < user.contacts.length; i++) {
            if (user.contacts[i]._id == req.params.contactId) {
                res.json(user.contacts[i]);
            }
        }
    });
}

function updateContact(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        var index = null;
        for (var i = 0; i < user.contacts.length; i++) {
            if (user.contacts[i]._id == req.params.contactId) {
                index = i;
            }
        }
        if (index > -1) {
            user.contacts[index].name = req.body.name;
            user.save(function(err) {
                if (err){res.send(err);}
                res.json({ message: 'contact updated!' });
            });
        } else {
            res.json({ message: 'contact does not exists!' });
        }
    });
}

function deleteContact(req, res) {

    User.findOne({customId:req.params.userId}, function(err, user) {
        if (err){
          res.send(err);
        }
        var index = null;
        for (var i = 0; i < user.contacts.length; i++) {
            if (user.contacts[i]._id == req.params.contactId) {
                index = i;
            }
        }
        if (index > -1) {
            user.contacts.splice(index, 1);
            user.save(function(err) {
                if (err){res.send(err);}
                res.json({ message: 'contact deleted!' });
            });
        } else {
            res.json({ message: 'contact does not exists!' });
        }
    });
}
