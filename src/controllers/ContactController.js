const contactService = require('../services/ContactService');

const handleServiceError = (error, res) => {
    if (error.message === 'INVALID_NAME' || error.message === 'INVALID_PHONE') {
        return res.status(400).json({ error: error.message });
    }
    if (error.message === 'CONTACT_NOT_FOUND') {
        return res.status(404).json({ error: error.message });
    }
    
    console.error(error);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
};

const listContacts = async (req, res) => {
    try {
        const contacts = await contactService.findAllContacts();
        return res.status(200).json(contacts);
    } catch (error) {
        return handleServiceError(error, res);
    }
};

const addContact = async (req, res) => {
    try {
        const newContact = await contactService.createNewContact(req.body);
        return res.status(201).json(newContact);
    } catch (error) {
        return handleServiceError(error, res);
    }
};

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await contactService.updateExistingContact(id, req.body);
        return res.status(200).json(updatedContact);
    } catch (error) {
        return handleServiceError(error, res);
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        await contactService.removeContact(id);
        return res.status(204).send();
    } catch (error) {
        return handleServiceError(error, res);
    }
};

module.exports = {
    listContacts,
    addContact,
    updateContact,
    deleteContact
};