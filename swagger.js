const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
    components: {
  schemas: {
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john.doe@email.com' },
        favoriteColor: { type: 'string', example: 'Blue' },
        birthday: { type: 'string', example: '1990-01-01' }
      }
    }
  }
  },
  paths: {
    '/contacts': {
      get: {
        tags: ['Contacts'],
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'List of contacts',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Contact' }
                }
              }
            }
          },
          500: { description: 'Server error' }
        }
      }
    },
    '/contacts/{id}': {
      get: {
        tags: ['Contacts'],
        summary: 'Get a single contact',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          200: {
            description: 'Contact found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Contact' }
              }
            }
          },
          400: { description: 'Invalid contact ID' },
          404: { description: 'Contact not found' },
          500: { description: 'Server error' }
        }
      }
    },
    '/contacts': {
      post: {
        tags: ['Contacts'],
        summary: 'Create a new contact',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contact' }
            }
          }
        },
        responses: {
          201: { description: 'Contact created' },
          400: { description: 'All fields are required' },
          500: { description: 'Server error' }
        }
      }
    },
  '/contacts/{id}': {
    get: {
      tags: ['Contacts'],
      summary: 'Get a single contact',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: {
          description: 'Contact found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Contact' }
            }
          }
        },
        400: { description: 'Invalid contact ID' },
        404: { description: 'Contact not found' },
        500: { description: 'Server error' }
      }
    },
    put: {
      tags: ['Contacts'],
      summary: 'Update an existing contact',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Contact' }
          }
        }
      },
      responses: {
        204: { description: 'Contact updated successfully' },
        400: { description: 'Invalid contact ID or missing fields' },
        404: { description: 'Contact not found' },
        500: { description: 'Server error' }
      }
    },
    delete: {
      tags: ['Contacts'],
      summary: 'Delete a contact',
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string' }
        }
      ],
      responses: {
        200: { description: 'Contact deleted successfully' },
        400: { description: 'Invalid contact ID' },
        404: { description: 'Contact not found' },
        500: { description: 'Server error' }
      }
    }
  }
}

};




const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
