const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect('mongodb://jcontreras:password28@ds127841.mlab.com:27841/jcontreras-wishlist');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening on port 4000');
});