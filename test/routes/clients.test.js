require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');
const Client = require('../../lib/Models/Client');

const fakeClient = {
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
};

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
    return request(app.callback())
      .post('/api/v1/clients')
      .send(fakeClient)
      .then(res => {
        expect(res.body.data).toEqual({
          __v: 0,
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
            _id: expect.any(String),
            number: 5415551212,
            phoneType: 'cell',
            safe: true
          }],
          email: 'client@blah.net',
          matters: [],
          referredBy: 'your mom',
          notes: 'this client is an elephant',
          _id: expect.any(String)
        });
      });
  });

  it('gets all clients', () => {
    return Client.create(fakeClient)
      .then(() => {
        return request(app.callback())
          .get('/api/v1/clients')
          .then(res => {
            expect(res.body.data).toEqual([{
              __v: 0,
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
                _id: expect.any(String),
                number: 5415551212,
                phoneType: 'cell',
                safe: true
              }],
              email: 'client@blah.net',
              matters: [],
              referredBy: 'your mom',
              notes: 'this client is an elephant',
              _id: expect.any(String)
            }]);
          });
      });
  });

});
