const express = require('express')
const router = express.Router()
const Category = require('../schemas/categorySchema')

module.exports = function(){
    router.get('/',  (req, res) => {
res.send({message:"Hello World"})
    })

    return router
}
