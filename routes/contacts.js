const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Get all contacts'
 */
router.get('/', contactsController.getAllContacts);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Get a single contact by ID'
 * #swagger.parameters['id'] = {
 *   description: 'Contact ID',
 *   required: true
 * }
 */
router.get('/:id', contactsController.getSingleContact);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Create a new contact'
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: {
 *         $ref: "#/components/schemas/Contact"
 *       }
 *     }
 *   }
 * }
 */
router.post('/', contactsController.createContact);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Update a contact by ID'
 * #swagger.parameters['id'] = {
 *   description: 'Contact ID',
 *   required: true
 * }
 * #swagger.requestBody = {
 *   required: true,
 *   content: {
 *     "application/json": {
 *       schema: {
 *         $ref: "#/components/schemas/Contact"
 *       }
 *     }
 *   }
 * }
 */
router.put('/:id', contactsController.updateContact);

/**
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Delete a contact by ID'
 * #swagger.parameters['id'] = {
 *   description: 'Contact ID',
 *   required: true
 * }
 */
router.delete('/:id', contactsController.deleteContact);

module.exports = router;

