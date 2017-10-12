'use strict';

var handleResponse = function handleResponse(xhr, parseResponse) {
  var content = document.querySelector('#content');

  //print etag number
  console.log(xhr.getResponseHeader('etag'));

  //show true status code
  console.log(xhr.status);
  switch (xhr.status) {
    case 200:
      content.innerHTML = '<b>Success</b>';
      break;
    case 201:
      content.innerHTML = '<b>Created</b>';
      break;
    case 204:
      content.innerHTML = '<b>Updated</b>';
      parseResponse = false;
      break;
    case 304:
      content.innerHTML = '<b>Not Modified</b>';
      parseResponse = false;
      break;
    case 400:
      content.innerHTML = '<b>Bad request</b>';
      break;
    case 404:
      content.innerHTML = '<b>Resource Not Found</b>';
      break;
    default:
      content.innerHTML = '<b>Error code not implemented</b>';
      break;
  }

  if (parseResponse) {
    var obj = JSON.parse(xhr.response);
    console.dir(obj);
    if (obj.message != undefined) content.innerHTML += '<br><b> ' + obj.message + '</b>';
  } else {
    console.dir(xhr.responseText);
    console.log('recieved');
  }
};

var requestUpdate = function requestUpdate(e, userForm) {
  var url = userForm.querySelector('#urlField').value;
  //get method selected
  var method = userForm.querySelector('#methodSelect').value;

  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  //if get request or head request
  if (xhr.status == 304 || xhr.status == 204) {
    xhr.onload = function () {
      return handleResponse(xhr, false);
    };
    //console.log('supposed to work');
  } else if (method == 'get' || method === 'post') {
    //set onload to parse request and get json message
    xhr.onload = function () {
      return handleResponse(xhr, true);
    };
  } else {
    //set onload to check meta data and NOT message
    xhr.onload = function () {
      return handleResponse(xhr, false);
    };
  }

  xhr.send();

  e.preventDefault();
  return false;
};

var sendPost = function sendPost(e, teamForm) {
  var teamAction = teamForm.getAttribute('action');
  var teamMethod = teamForm.getAttribute('method');
  var teamNameField = teamForm.querySelector('#teamNameField');

  var pkmn1Field = teamForm.querySelector('#pkmn1Field');
  var move1_1Field = teamForm.querySelector('#move1_1Field');
  var move1_2Field = teamForm.querySelector('#move1_2Field');
  var move1_3Field = teamForm.querySelector('#move1_3Field');
  var move1_4Field = teamForm.querySelector('#move1_4Field');

  var pkmn2Field = teamForm.querySelector('#pkmn2Field');
  var move2_1Field = teamForm.querySelector('#move2_1Field');
  var move2_2Field = teamForm.querySelector('#move2_2Field');
  var move2_3Field = teamForm.querySelector('#move2_3Field');
  var move2_4Field = teamForm.querySelector('#move2_4Field');

  var pkmn3Field = teamForm.querySelector('#pkmn3Field');
  var move3_1Field = teamForm.querySelector('#move3_1Field');
  var move3_2Field = teamForm.querySelector('#move3_2Field');
  var move3_3Field = teamForm.querySelector('#move3_3Field');
  var move3_4Field = teamForm.querySelector('#move3_4Field');

  var pkmn4Field = teamForm.querySelector('#pkmn4Field');
  var move4_1Field = teamForm.querySelector('#move4_1Field');
  var move4_2Field = teamForm.querySelector('#move4_2Field');
  var move4_3Field = teamForm.querySelector('#move4_3Field');
  var move4_4Field = teamForm.querySelector('#move4_4Field');

  var pkmn5Field = teamForm.querySelector('#pkmn5Field');
  var move5_1Field = teamForm.querySelector('#move5_1Field');
  var move5_2Field = teamForm.querySelector('#move5_2Field');
  var move5_3Field = teamForm.querySelector('#move5_3Field');
  var move5_4Field = teamForm.querySelector('#move5_4Field');

  var pkmn6Field = teamForm.querySelector('#pkmn6Field');
  var move6_1Field = teamForm.querySelector('#move6_1Field');
  var move6_2Field = teamForm.querySelector('#move6_2Field');
  var move6_3Field = teamForm.querySelector('#move6_3Field');
  var move6_4Field = teamForm.querySelector('#move6_4Field');

  var xhr = new XMLHttpRequest();
  xhr.open(teamMethod, teamAction);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //same action form sends
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
    return handleResponse(xhr, true);
  };

  //const formData = `teamName=${teamNameField.value}`;

  var formData = 'teamName=' + teamNameField.value + '&pkmn1=' + pkmn1Field.value + '&move1_1=' + move1_1Field.value + '&move1_2=' + move1_2Field.value + '&move1_3=' + move1_3Field.value + '&move1_4=' + move1_4Field.value + '&pkmn2=' + pkmn2Field.value + '&move2_1=' + move2_1Field.value + '&move2_2=' + move2_2Field.value + '&move2_3=' + move2_3Field.value + '&move2_4=' + move2_4Field.value + '&pkmn3=' + pkmn3Field.value + '&move3_1=' + move3_1Field.value + '&move3_2=' + move3_2Field.value + '&move3_3=' + move3_3Field.value + '&move3_4=' + move3_4Field.value + '&pkmn4=' + pkmn4Field.value + '&move4_1=' + move4_1Field.value + '&move4_2=' + move4_2Field.value + '&move4_3=' + move4_3Field.value + '&move4_4=' + move4_4Field.value + '&pkmn5=' + pkmn5Field.value + '&move5_1=' + move5_1Field.value + '&move5_2=' + move5_2Field.value + '&move5_3=' + move5_3Field.value + '&move5_4=' + move5_4Field.value + '&pkmn6=' + pkmn6Field.value + '&move6_1=' + move6_1Field.value + '&move6_2=' + move6_2Field.value + '&move6_3=' + move6_3Field.value + '&move6_4=' + move6_4Field.value;

  xhr.send(formData); //send back the data

  e.preventDefault(); //prevent browser from sending form
  return false; //dont change page
};

var init = function init() {
  //input and make/update team
  var teamForm = document.querySelector('#teamForm');
  var addTeam = function addTeam(e) {
    return sendPost(e, teamForm);
  };
  teamForm.addEventListener('submit', addTeam);

  //refresh list button
  document.querySelector('#refreshButton').onclick = function (e) {
    var url = '/getTeams';
    var method = 'get';

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onload = function () {
      return handleResponse(xhr, true);
    };

    xhr.send();

    e.preventDefault();
    return false;
  };

  //todo remove old code
  var userForm = document.querySelector('#userForm');
  var getUsers = function getUsers(e) {
    return requestUpdate(e, userForm);
  };
  userForm.addEventListener('submit', getUsers);
};

window.onload = init;
