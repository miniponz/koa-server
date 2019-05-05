require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');
// const Client = require('../lib/models/Client');

describe('client routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a client', () => {
    return request(app)
      .post('/api/v1/clients')
      .send({
        name: {
          first: 'Caroline',
          middle: 'J.',
          last: 'Ponzini',
          pref: 'Cara'
        },
        address: {
          street: '555 NW Bond St.',
          city: 'Bend',
          state: 'OR',
          zip: '97703'
        },
        telephone: [{
          number: 5415551212,
          phoneType: 'cell',
          safe: true
        }],
        email: 'client@blah.net',
        referredBy: 'your mom',
        notes: 'this client is an elephant'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: {
            first: 'Caroline',
            middle: 'J.',
            last: 'Ponzini',
            pref: 'Cara'
          },
          address: {
            street: '555 NW Bond St.',
            city: 'Bend',
            state: 'OR',
            zip: '97703'
          },
          telephone: [{
            _id: expect.any(mongoose.Types.ObjectId),
            number: 5415551212,
            phoneType: 'cell',
            safe: true
          }],
          email: 'client@blah.net',
          matters: [],
          referredBy: 'your mom',
          notes: 'super heady brah',
          _id: expect.any(mongoose.Types.ObjectId)
        });
      });
  });
});
