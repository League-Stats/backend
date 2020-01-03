const router = require('express').Router();

const fav = require('./favorites-model');
const restricted = require('../../auth/restricted-middleware');