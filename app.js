const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.set('port',process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.json());

// app.use(bodyParser.json({limit: '100mb'}));
// app.use(bodyParser.urlencoded({limit: '100mb'}));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', 'http://kito7408.github.io/basicE-commerceFront');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

//routes
require('./routes/userRoutes')(app);
require('./routes/userTypeRoutes')(app);
require('./routes/categoriaRoutes')(app);
require('./routes/productoRoutes')(app);
require('./routes/carritoRoutes')(app);


app.listen(app.get('port'), () => {
	console.log('server on port 3000');
});