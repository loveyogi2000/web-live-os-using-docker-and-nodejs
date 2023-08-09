const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Import the required modules
const Docker = require('dockerode');
const docker = new Docker();
const { exec } = require('child_process');
//ejs 
const ejsMate = require('ejs-mate');
app.engine('html', ejsMate);
app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'html');



//mongodb connection and scgema 
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
  email: String,
  phone: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// 



app.use(express.static(path.join(__dirname, 'frontend'), { 
  setHeaders: (res, path, stat) => {
      res.set('Content-Type', 'text/css');
  }
}));

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser()); // use cookie-parser middleware

var message = "";



// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, phone, password: hashedPassword });
    await user.save();
    message = "you have success fully registered";
    res.redirect(`/home/?msg=${message}`);
  } catch (err) {
    res.status(500).send('Internal server error he bhai');
  }
});





// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      message = "user not found please register first";
      res.redirect(`/loginpage/?msg=${message}`);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      message = "incorrect password please try again";
      res.redirect(`/loginpage/?msg=${message}`);
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key');

    // Set the token in a cookie with a path of "/"
    res.cookie('auth-token', token, { path: '/' });
    message = user.email + "user successfully loggedin";
    return res.redirect(`/home/?msg=${message}`);
  } catch (err) {
    res.status(500).send('Internal server error he bhai');
  }
});


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies['auth-token'];
  if (!token) {
    return res.redirect('/loginpage'); // redirect to login page if no token is found
  }
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};




app.get('/loginpage', (req, res) => {
  const filePath = path.join(__dirname, 'frontend', 'login.html');
  res.sendFile(filePath);
});


app.get('/signup', (req, res) => {
  const filePath = path.join(__dirname, 'frontend', 'register.html');
  res.sendFile(filePath);
});






// Protected route
app.get('/lab', verifyToken, async (req, res) => {
  const userId = req.userId; // Fetch the userId from the request object
  const user = await User.findById(userId); // Find the user in the database using the userId
  const port = parseInt(userId.substring(userId.length - 4), 16) + 5000; // Use last 4 digits of hex-encoded user ID and add to 49152 (49152-65535 are the dynamic ports)
  const port2 = parseInt(userId.substring(userId.length - 4), 16) + 4000;
  const email = user.email;
  const containerName = email.split('@')[0];
  try {
    
    // Use port number and user ID to create container name
    const command = `docker run -itd --name ${containerName} -e CONTAINER_NAME=${containerName} -p ${port}:22  opensshimg`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting container for user ${userId}: ${error}`);
        return;
      }
      console.log(`Container started for user ${userId} on port ${port}`);
    });

    // Start a new webtty container for the user
    const command2= `docker run --rm --name ${containerName}_wetty -dp ${port2}:3000 wettyoss/wetty --ssh-host=192.168.1.6 --ssh-port=${port} --allow-iframe --iframe-allow-from=* `;
    exec(command2, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting webtty container for user ${userId}: ${error}`);
        return;
      }
      console.log(`webtty Container started for user ${userId} on port ${port}`);
    });
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  
  res.render('lab',{message:port2,username:containerName})
});




// Logout endpoint
app.get('/logout', async (req, res) => {
  const token = req.cookies['auth-token'];
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
  } catch (err) {}
  
  const userId = req.userId; // Fetch the userId from the request object
  const user = await User.findById(userId); // Find the user in the database using the userId
  const email=user.email;
  const containerName = email.split('@')[0];
  
const command1 =`docker rm -f ${containerName} ; docker rm -f ${containerName}_wetty `
exec(command1, (error, stdout, stderr) => {
  if (error) {
    console.log(`there no such container found with name ${containerName}`)
  }
  console.log(`both container has been stopped`);
});
  
  res.clearCookie('auth-token'); // Clear the auth-token cookie
  res.redirect("/loginpage");
});  // Redirect to the login page









app.get('/home', async (req, res) => {
  const token = req.cookies['auth-token'];
  if (!token) {
    res.render('home',{message:"Welcome to homepage"});
  }else{
    try {
      const decoded = jwt.verify(token, 'secret_key');
      req.userId = decoded.userId;
      next();
    } catch (err) {}
    const userId = req.userId; // Fetch the userId from the request object
    const user = await User.findById(userId); // Find the user in the database using the userId
    const email=user.email; 
    const name = email.split('@')[0];

    res.render('home', {message:"welcome "+name+" you have been sucessfully logged in"}); // Pass the value of global.emails as a local variable
  
  }
  
});






app.listen(3000, () => console.log('Server started'));
