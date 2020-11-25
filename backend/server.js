const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const app = express();

// Importing routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`Server corriendo desde el puerto ${app.get('port')}`);
});