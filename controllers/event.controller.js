const Event = require('../models/event.model');
const createError = require('http-errors');
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
    Event.find()
      .then(events => res.json(events))
      .catch(error => next(error));
  }


  module.exports.get = (req, res, next) => {
    Event.findById(req.params.id)
      .then(event => {
        if (!event) {
          throw createError(404, 'Phone not found');
        } else {
          res.json(event);
        }
      })
      .catch(error => {
        next(error);
      });
  }

  module.exports.create = (req, res, next) => {
    const event = new Event(req.body);
    
    event.save()
      .then(event => res.status(201).json(event))
      .catch(error => next(error));
  }

  module.exports.delete = (req, res, next) => {
    Event.findOneAndDelete({_id: req.params.id})
      .then(event => {
        if (!event) {
          throw createError(404, 'Event not found');
        } else {
          res.status(204).json();
        }
      })
      .catch(error => next(error));
  }