const mongoose = require('mongoose');
const Client = require('../../lib/Models/Client');

describe('Client Model', () => {
  const id = new mongoose.Types.ObjectId;
  it('validates a good client model', () => {
    const client = new Client ({
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
      matters: [id],
      referredBy: 'your mom',
      notes: 'super heady brah',
    });

    expect(client.toJSON()).toEqual({
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
      matters: [id],
      referredBy: 'your mom',
      notes: 'super heady brah',
      _id: expect.any(mongoose.Types.ObjectId)
    });
  });
});
