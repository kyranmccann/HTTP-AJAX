const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let nextId = 10;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    avatar: 'horse',
    name: 'Ben',
    age: 30,
    email: 'ben@lambdaschool.com',
  },
  {
    id: 2,
    avatar: 'dragon',
    name: 'Austen',
    age: 32,
    email: 'austen@lambdaschool.com',
  },
  {
    id: 3,
    avatar: 'frog',
    name: 'Ryan',
    age: 35,
    email: 'ryan@lambdaschool.com',
  },
  {
    id: 4,
    avatar: 'dove',
    name: 'Sean',
    age: 35,
    email: 'sean@lambdaschool.com',
  },
  {
    id: 5,
    avatar: 'dog',
    name: 'Michelle',
    age: 67,
    email: 'michelle@gmail.com',
  },
  {
    id: 6,
    avatar: 'cat',
    name: 'Luis',
    age: 47,
    email: 'luis@lambdaschool.com',
  },
  {
    id: 7,
    avatar: 'kiwi',
    name: 'Sam',
    age: 24,
    email: 'sam@lambdaschool.com',
  },
  {
    id: 8,
    avatar: 'otter',
    name: 'Stephanie',
    age: 57,
    email: 'stephanie@lambdaschool.com',
  },
  {
    id: 9,
    avatar: 'horse',
    name: 'Jasmine',
    age: 22,
    email: 'jasmine@lambdaschool.com',
  },
];

app.use(cors());
app.use(bodyParser.json());

app.get('/friends', (req, res) => {
  res.status(200).json(friends);
});

app.get('/friendById/:id', (req, res) => {
  const { id } = req.params;
  const findFriendById = friend => {
    return friend.id == id;
  };
  const foundFriend = friends.find(findFriendById);
  if (!foundFriend) {
    return sendUserError('No friend found by that ID', res);
  } else {
    res.json(foundFriend); 
  }
})

app.post('/friends', (req, res) => {
  const friend = { id: getNewId(), ...req.body };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.put('/friends/:id', (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);

  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res
      .status(404)
      .json({ message: `The friend with id ${id} does not exist.` });
  }
});

app.delete('/friends/:id', (req, res) => {
	friends = friends.filter(friend => friend.id != req.params.id);
	res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
