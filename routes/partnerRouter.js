const express = require('express');
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route('/')
.get((req, res, next) => {
  Partner.find()
  .then(partners => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(partners);
  })
  .catch(err => next(err));
})
.post((req, res, next) => {
  Partner.create(req.body)
  .then(partner => {
    console.log('Partner Created: ', partner)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(partner);
  })
  .catch(err => next(err));
  // res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /partners');
})
.delete((req, res, next) => {
  Partner.deleteMany()
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

partnerRouter.route('/:partnerId')
.get((req, res, next) => {
  Partner.findById(req.params.partnerId)
  .then(partner => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.json(partner);
  })
  .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
})
.put((req, res, next) => {
  Partner.findByIdAndUpdate(req.params.partnerId, {
    $set: req.body.name,
    $set: req.body.description
  }, { new: true })
  .then(partner => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(partner);
  })
  .catch(err => next(err));
  // res.write(`Updating the partner: ${req.params.partnerId}\n`);
  // res.end(`Will update the partner: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res, next) => {
  Partner.findByIdAndDelete(req.params.partnerId)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});


module.exports = partnerRouter;
