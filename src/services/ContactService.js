const contactRepository = require('../repositories/ContactRepository');

const isValidContactName = (fullName) => {
    if (!fullName || typeof fullName !== 'string') {
        return false;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const hasAtLeastTwoWords = nameParts.length >= 2;
    const allWordsHaveValidLength = nameParts.every(word => word.length >= 3);
    return hasAtLeastTwoWords && allWordsHaveValidLength;
};

const validateContactData = (name, phone) => {
    if (!isValidContactName(name)) {
        throw new Error('INVALID_NAME');
    }
    if (!phone || String(phone).trim() === '') {
        throw new Error('INVALID_PHONE');
    }
};

const findAllContacts = async () => {
    return await contactRepository.findAll();
};

const createNewContact = async (contactData) => {
    const { name, phone } = contactData;

    validateContactData(name, phone);

    const newContactId = await contactRepository.create({ name, phone });
    
    return { id: newContactId, name, phone };
};

const updateExistingContact = async (id, contactData) => {
    const { name, phone } = contactData;

    const existingContact = await contactRepository.findById(id);
    if (!existingContact) {
        throw new Error('CONTACT_NOT_FOUND');
    }

    validateContactData(name, phone);

    await contactRepository.update(id, { name, phone });
    
    return { id: Number(id), name, phone };
};

const removeContact = async (id) => {
    const existingContact = await contactRepository.findById(id);
    if (!existingContact) {
        throw new Error('CONTACT_NOT_FOUND');
    }

    await contactRepository.remove(id);
};

module.exports = {
    findAllContacts,
    createNewContact,
    updateExistingContact,
    removeContact
};