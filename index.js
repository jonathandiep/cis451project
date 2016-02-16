var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 5000;

var pg = require('pg');
var conString = "postgres://jonathandiep:SecurePassword123@localhost/cis";
var client = new pg.Client(conString);

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

client.connect(function(err) {
  if (err) { return console.error('could not connect to postgres'); }
});

app.get('/', function(req, res) {
  res.sendFile('/public/index.html');
});

app.get('/search', function(req, res) {
  res.sendFile('/public/views/index.html');
});

// used to show products when viewing a category
app.get('/product-in-categories', function(req, res) {
  var category = req.query.category;
  var type = req.query.type;
  if (type) {
    client.query('SELECT * FROM product INNER JOIN category ON product.categoryid = category.categoryid WHERE category.categoryname = \'' + type + '\'', function(err, result) {
      if (err) { return console.error('error running query'); }
      res.send(result.rows);
    });
  } else {
    client.query('SELECT * FROM product INNER JOIN category ON product.categoryid = category.categoryid WHERE category.parent = \'' + category + '\'', function(err, result) {
      if (err) { return console.error('error running query'); }
      res.send(result.rows);
    })
  }
});

// used for subcategories when viewing a category
app.get('/category-list', function(req, res) {
  var parent = req.query.parent;
  client.query('SELECT categoryname FROM category WHERE parent = \'' + parent + '\'', function(err, result) {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display search results
app.get('/search-products', function(req, res) {
  var term = req.query.term;
  if (term.includes("'")) {
    var append = "'" + term.substring(term.indexOf("'"));
    term = term.substring(0, term.indexOf("'")) + append;
  }
  client.query('SELECT * FROM product WHERE LOWER(productname) LIKE LOWER(\'%' + term + '%\') OR productid = \'' + term + '\'', function(err, result) {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display live search results
app.get('/live-search', function(req, res) {
  var term = req.query.term;
  if (term.includes("'")) {
    var append = "'" + term.substring(term.indexOf("'"));
    term = term.substring(0, term.indexOf("'")) + append;
  }
  client.query('SELECT * FROM product WHERE LOWER(productname) LIKE LOWER(\'%' + term + '%\') OR productid = \'' + term + '\' LIMIT 3', function(err, result) {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display product detail
app.get('/product-detail', function(req, res) {
  var id = req.query.id;
  client.query('SELECT * FROM product WHERE productid = \'' + id + '\'', function(err, result) {
    if (err) { console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to get categories and subcategories when viewing a product
app.get('/category-names', function(req, res) {
  var id = req.query.id;
  client.query('SELECT * FROM category WHERE categoryid = \'' + id + '\'', function(err, result) {
    if (err) { console.error('error running query'); }
    res.send(result.rows);
  });
});

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('working on port: ' + port);
