const mongoose = require('mongoose')
const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.login = (req, res, next) => {

  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'missing credentials');
  }

    User.findOne({ email: email })
    .then(user => {
        if (user) {
            user.checkPassword(password)
            .then(match => {
                if (match) {
                    req.session.user = user
                    res.json(user)
                } else {
                    throw createError(400, 'Invalid password');
                }
            })
        } else {
            throw createError(400, 'User not found');
        }
    })
    .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.status(204).json()
}

module.exports.register = (req, res, next) => {
    const {name, email, age, gender, password, description} = req.body
    const file = req.file;
    const user = new User({
        age: age,
        description: description,
        email: email,
        gender: gender,
        image: file ? req.file.url : '/img/undefined.png',
        name: name,
        password: password
      })
    
      user.save()
        .then((user) => res.status(201).json(user))
        .catch(next)
}

module.exports.getFeed = (req, res, next) => {
    res.json()
}

module.exports.getProfile = (req, res, next) => {
    res.json()
}

module.exports.updateProfile = (req, res, next) => {
    res.json()
}