"use strict"

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

app.use((req, res, next) => {
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    var randNum = Math.random().toString();
    randNum = randNum.substring(2, randNum.length);
    res.cookie('cookieName', randNum, { maxAge: 1800000 });
    console.log(`cookie created successfully: ${cookie}`);
  } else {
    console.log(`cookie exists: ${cookie}`);
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
}));

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(`${__dirname}/bower_components`));

client.connect( (err) => {
  if (err) { return console.error('could not connect to postgres'); }
});

app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});

app.get('/search', (req, res) => {
  res.sendFile('/public/views/index.html');
});

// used to show products when viewing a category
app.get('/product-in-categories', (req, res) => {
  var category = req.query.category;
  var type = req.query.type;
  if (type) {
    client.query(`SELECT * FROM "Product" INNER JOIN "Category" ON "Product"."categoryID" = "Category"."categoryID" WHERE "Category"."categoryName" = '${type}'`, (err, result) => {
      if (err) { return console.error('error running query'); }
      res.send(result.rows);
    });
  } else {
    client.query(`SELECT * FROM "Product" INNER JOIN "Category" ON "Product"."categoryID" = "Category"."categoryID" WHERE "Category"."parent" = '${category}'`, (err, result) => {
      if (err) { return console.error('error running query'); }
      res.send(result.rows);
    });
  }
});

// used for subcategories when viewing a category
app.get('/category-list', (req, res) => {
  var parent = req.query.parent;
  client.query(`SELECT "categoryName" FROM "Category" WHERE "parent" = '${parent}'`, (err, result) => {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display search results
app.get('/search-products', (req, res) => {
  let term = req.query.term;
  if (term.includes("'")) {
    var append = "'" + term.substring(term.indexOf("'"));
    term = term.substring(0, term.indexOf("'")) + append;
  }
  client.query(`SELECT * FROM "Product" WHERE LOWER("productName") LIKE LOWER('%${term}%') OR "productID" = '${term}'`, (err, result) => {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display live search results
app.get('/live-search', (req, res) => {
  let term = req.query.term;
  if (term.includes("'")) {
    var append = "'" + term.substring(term.indexOf("'"));
    term = term.substring(0, term.indexOf("'")) + append;
  }
  client.query(`SELECT * FROM "Product" WHERE LOWER("productName") LIKE LOWER('%${term}%') OR "productID" = '${term}' LIMIT 4`, (err, result) => {
    if (err) { return console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to display product detail
app.get('/product-detail', (req, res) => {
  var id = req.query.id;
  client.query(`SELECT * FROM "Product" WHERE "productID" = '${id}'`, (err, result) => {
    if (err) { console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to get categories and subcategories when viewing a product
app.get('/category-names', (req, res) => {
  var id = req.query.id;
  client.query(`SELECT * FROM "Category" WHERE "categoryID" = '${id}'`, (err, result) => {
    if (err) { console.error('error running query'); }
    res.send(result.rows);
  });
});

// used to add a product to the cart
app.get('/add-to-cart', (req, res) => {
  var cookie = req.cookies.cookieName;
  var prodID = req.query.id;
  var name = req.query.name;
  var price = req.query.price;
  var quantity = Number(req.query.quantity);
  var time = Date.now();

  if (name.includes("'")) {
    var append = "'" + name.substring(name.indexOf("'"));
    name = name.substring(0, name.indexOf("'")) + append;
  }

  client.query(`SELECT * FROM "CartLine" WHERE "cartID" = '${cookie}' AND "productID" = '${prodID}'`, (er, result) => {
    if (er) { err('error running query'); }
    if (result.rows.length === 0) {
      client.query(`INSERT INTO "CartLine" ("cartID", "productID", "productName", "price", "quantity", "time") VALUES ('${cookie}', '${prodID}', '${name}', '${price}', ${quantity}, ${time})`, (err, result) => {
        if (err) { console.error('error running query', err); }

        res.send('insert');
      });
    } else {
      client.query(`UPDATE "CartLine" SET "quantity" = ${quantity} WHERE "cartID" = '${cookie}' AND "productID" = '${prodID}'`, (err, result) => {
        if (err) { console.error('error running query'); }

        res.send('update');
      });
    }
  });

});

app.get('/delete-from-cart', (req, res) => {
  var cart = req.cookies.cookieName;
  var product = req.query.productID;
  client.query(`DELETE FROM "CartLine" WHERE "cartID" = '${cart}' AND "productID" = '${product}'`, (err, result) => {
    if (err) { console.log('error running query'); }

    res.send(result);
  })
});

app.get('/clear-cart', (req, res) => {
  var cart = req.cookies.cookieName;
  client.query(`DELETE FROM "CartLine" WHERE "cartID" = '${cart}'`, (err, result) => {
    if (err) { console.error('error running query'); }

    res.send(result);
  });
});

app.get('/cart-items', (req, res) => {
  client.query(`SELECT * FROM "CartLine" WHERE "cartID" = '${req.cookies.cookieName}'`, (err, result) => {
    if (err) { console.log('error running query'); }

    res.send(result.rows);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(port);
console.log(`working on port: ${port}`);
