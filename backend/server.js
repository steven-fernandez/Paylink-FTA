const express = require('express');
const app = express();
const PORT = 3000;

// Mock data as per your JSON file
const users = {
  "1": {
    id: 1,
    name: "John Doe",
    socialMediaHandle: "@johndoe",
    profileImgSrc: "https://assets.embarknext.com/assets/d37c2ffb-dcc6-4513-8b13-3356b01d02d0",
    bio: "I'm a software engineer who loves to code and build things.",
    location: "Grantham, UK",
    website: "https://johndoe.com"
  },
  "2": {
    id: 2,
    name: "Jane Smith",
    socialMediaHandle: "@janesmith",
    profileImgSrc: "https://assets.embarknext.com/assets/ac6ca7d9-3049-4155-bceb-5ba9b53d70d9",
    bio: "I’m a creative graphic designer with over five years of experience specializing in brand identity, print design, and digital media, known for my attention to detail and innovative approach.",
    location: "London, UK",
    website: "https://janesmith.com"
  }
};

// Enable CORS for all resources
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route to get user by ID
app.get('/user/:id', (req, res) => {
  const user = users[req.params.id];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
