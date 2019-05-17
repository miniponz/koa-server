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

const clientRes = {
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
        expect(res.body.data).toEqual(clientRes);
      });
  });

  it('gets all clients', () => {
    return Promise.all([
      Client.create(fakeClient),
      Client.create(fakeClient)
    ])
      .then(() => {
        return request(app.callback())
          .get('/api/v1/clients?all=true')
          .then(res => {
            expect(res.body.data).toEqual([clientRes, clientRes]);
          });
      });
  });

  it('gets a client by id', () => {
    return Promise.all([
      Client.create(fakeClient),
      Client.create(fakeClient)
    ])
    //eslint-disable-next-line
      .then(([client1, client2]) => {
        return request(app.callback())
          .get(`/api/v1/clients/id?_id=${client1._id}`)
          .then(res => {
            expect(res.body.data).toEqual([JSON.parse(JSON.stringify(client1))]);
          });
      });
  });

  it('gets a client by name', () => {
    return request(app.callback())
      .post('/api/v1/clients')
      .send(fakeClient)
      .then(res => res.body.data)
      .then(() => {
        return request(app.callback())
          .get('/api/v1/clients/name?first=Caroline&last=Ponzini')
          .then(res => {
            expect(res.body.data).toEqual([clientRes]);
          });
      });
  });
});
