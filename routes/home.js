const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('This is the home route')
})



module.exports = router