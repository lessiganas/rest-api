
import User from "./config/models/User";

const express = require('express');
   const mongoose = require('mongoose');
   require('dotenv').config();

   const app = express();

   // Connect to the database
   mongoose.connect(process.env.DB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
     .then(() => console.log('Connected to the database'))
     .catch(err => console.error(err));

   // Define routes
   app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

 app.post('/users', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
});
   app.put('/users/:id', (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.send(404);
  } else {
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  }
});

   app.delete('/users/:id', (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.send(404);
  } else {
    user.remove((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  }
});
   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

