require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');
const port = process.env.PORT || 7890;


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening on ${port}`);
});

