const mongoose = require('mongoose');
const plugin = require('mongoose-timestamp');

const clientSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    middle: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
    pref: {
      type: String,
    }
  },

  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
  },

  telephone: [{
    number: Number,
    phoneType: {
      type: String,
      enum: ['home', 'work', 'cell', 'other']
    }, 
    safe: Boolean
  }],

  email: String,
  matters: [],
  referredBy: String,
  notes: String
});

const Client = mongoose.model('Client', clientSchema);
clientSchema.plugin(plugin);

module.exports = Client;
