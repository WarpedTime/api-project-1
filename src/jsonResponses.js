const crypto = require('crypto');

const users = {};
const teams = {};

teams.cynthia = {
  teamName: 'Cynthia',
  pkmn1: 'Spiritomb',
  move1_1: 'Dark Pulse',
  move1_2: 'Psychic',
  move1_3: 'Silver Wind',
  move1_4: 'Ominous Wind',

  pkmn2: 'Roserade',
  move2_1: 'Energy Ball',
  move2_2: 'Sludge Bomb',
  move2_3: 'Shadow Ball',
  move2_4: 'Extrasensory',

  pkmn3: 'Togekiss',
  move3_1: 'Air Slash',
  move3_2: 'Aura Sphere',
  move3_3: 'Water Pulse',
  move3_4: 'Psychic',

  pkmn4: 'Lucario',
  move4_1: 'Aura Sphere',
  move4_2: 'Dragon Pulse',
  move4_3: 'Psychic',
  move4_4: 'Earthquake',

  pkmn5: 'Milotic',
  move5_1: 'Surf',
  move5_2: 'Ice Beam',
  move5_3: 'Mirror Coat',
  move5_4: 'Aqua Ring',

  pkmn6: 'Garchomp',
  move6_1: 'Dragon Rush',
  move6_2: 'Earthquake',
  move6_3: 'Brick Break',
  move6_4: 'Giga Impact',
};

// const dex = JSON.parse(fs.readFileSync(`${__dirname}/../hosted/dex.json`));

let etag = crypto.createHash('sha1').update(JSON.stringify(teams));
let digest = etag.digest('hex');

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
    etag: digest,
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
    etag: digest,
  };

  response.writeHead(status, headers);
  response.end();
};

const getTeams = (request, response) => {
  const responseJSON = {
    teams,
  };

  if (request.headers['if-none-match'] === digest) {
    return respondJSONMeta(request, response, 304);
  }

  console.log('Sending team data');
  return respondJSON(request, response, 200, responseJSON);
};

const getTeamsMeta = (request, response) => {
  if (request.headers['if-none-match'] === digest) {
    return respondJSONMeta(request, response, 304);
  }

  return respondJSONMeta(request, response, 200);
};

const addTeam = (request, response, body) => {
  // console.dir(body);

  const responseJSON = {
    message: '.........',
  };

  // TODO: add more checks ()for now just need one pokemon with one move
  let missingParams = false;
  if (body.pkmn1 === '') {
    missingParams = true;
  } else if (body.move1_1 === '') {
    missingParams = true;
  } else if (!body.pkmn2 === '' && body.move2_1 === '') {
    missingParams = true;
  } else if (!body.pkmn3 === '' && body.move3_1 === '') {
    missingParams = true;
  } else if (!body.pkmn4 === '' && body.move4_1 === '') {
    missingParams = true;
  } else if (!body.pkmn5 === '' && body.move5_1 === '') {
    missingParams = true;
  } else if (!body.pkmn6 === '' && body.move6_1 === '') {
    missingParams = true;
  }
  if (missingParams === true) {
    responseJSON.id = 'missingParams'; // error id
    return respondJSON(request, response, 400, responseJSON);
  }

  // console.dir(body.pkmn1);  
  let responseCode = 201;

  if (teams[body.teamName]) {
    responseCode = 204;
    console.log('update user');
    responseJSON.message = 'Updated successfully';
    console.log(`Updated user: [${body.teamName}]`);
  } else {
    teams[body.teamName] = {};
    responseJSON.message = 'Created successfully';
    console.log(`Added user: [${body.teamName}]`);
  }

  teams[body.teamName] = body;

  etag = crypto.createHash('sha1').update(JSON.stringify(teams));
  digest = etag.digest('hex');

  return respondJSON(request, response, responseCode, responseJSON);
};

// TODO remove old code vv
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  if (request.headers['if-none-match'] === digest) {
    return respondJSONMeta(request, response, 304);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  if (request.headers['if-none-match'] === digest) {
    return respondJSONMeta(request, response, 304);
  }

  return respondJSONMeta(request, response, 200);
};

const addUser = (request, response, body) => {
  console.dir(body);

  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams'; // error id
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
    console.log('update user');
    responseJSON.message = 'Updated successfully';
  } else {
    users[body.name] = {};
    console.log('add user');
    responseJSON.message = 'Created successfully';
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  etag = crypto.createHash('sha1').update(JSON.stringify(users));
  digest = etag.digest('hex');

  return respondJSON(request, response, responseCode, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getUsers,
  addUser,
  getUsersMeta,
  notFound,
  notFoundMeta,
  addTeam,
  getTeams,
  getTeamsMeta,
};
