const express = require('express');
const contactController = require('../controllers/ContactController');

const router = express.Router();

router.post('/contatos', contactController.addContact);
router.get('/contatos', contactController.listContacts);
router.patch('/contatos/:id', contactController.updateContact);
router.delete('/contatos/:id', contactController.deleteContact);

module.exports = router;