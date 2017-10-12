const handleResponse = (xhr, parseResponse) => {
  const content = document.querySelector('#content');
  
  //print etag number
  console.log(xhr.getResponseHeader ('etag'));
  
  //show true status code
  console.log(xhr.status);
  switch(xhr.status){
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
      content.innerHTML = `<b>Resource Not Found</b>`;
      break;
    default:
      content.innerHTML = '<b>Error code not implemented</b>';
      break;
  }
  
  
  if(parseResponse){
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    if(obj.message != undefined) content.innerHTML += `<br><b> ${obj.message}</b>`;
  } else {
    console.dir(xhr.responseText);
    console.log('recieved');
  }
};

const requestUpdate = (e, userForm) => {
  const url = userForm.querySelector('#urlField').value;
  //get method selected
  const method = userForm.querySelector('#methodSelect').value;
  
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  //if get request or head request
  if(xhr.status == 304 || xhr.status == 204) {
    xhr.onload = () => handleResponse(xhr, false);
    //console.log('supposed to work');
  } else if(method == 'get' || method === 'post') {
    //set onload to parse request and get json message
    xhr.onload = () => handleResponse(xhr, true);
  } else {
    //set onload to check meta data and NOT message
    xhr.onload = () => handleResponse(xhr, false);
  }
  
  xhr.send();
  
  e.preventDefault();
  return false;
};

const sendPost = (e, teamForm) => {
  const teamAction = teamForm.getAttribute('action');
  const teamMethod = teamForm.getAttribute('method');
  const teamNameField = teamForm.querySelector('#teamNameField');
  
  const pkmn1Field = teamForm.querySelector('#pkmn1Field');
  const move1_1Field = teamForm.querySelector('#move1_1Field');
  const move1_2Field = teamForm.querySelector('#move1_2Field');
  const move1_3Field = teamForm.querySelector('#move1_3Field');
  const move1_4Field = teamForm.querySelector('#move1_4Field');
  
  const pkmn2Field = teamForm.querySelector('#pkmn2Field');
  const move2_1Field = teamForm.querySelector('#move2_1Field');
  const move2_2Field = teamForm.querySelector('#move2_2Field');
  const move2_3Field = teamForm.querySelector('#move2_3Field');
  const move2_4Field = teamForm.querySelector('#move2_4Field');
  
  const pkmn3Field = teamForm.querySelector('#pkmn3Field');
  const move3_1Field = teamForm.querySelector('#move3_1Field');
  const move3_2Field = teamForm.querySelector('#move3_2Field');
  const move3_3Field = teamForm.querySelector('#move3_3Field');
  const move3_4Field = teamForm.querySelector('#move3_4Field');
  
  const pkmn4Field = teamForm.querySelector('#pkmn4Field');
  const move4_1Field = teamForm.querySelector('#move4_1Field');
  const move4_2Field = teamForm.querySelector('#move4_2Field');
  const move4_3Field = teamForm.querySelector('#move4_3Field');
  const move4_4Field = teamForm.querySelector('#move4_4Field');
  
  const pkmn5Field = teamForm.querySelector('#pkmn5Field');
  const move5_1Field = teamForm.querySelector('#move5_1Field');
  const move5_2Field = teamForm.querySelector('#move5_2Field');
  const move5_3Field = teamForm.querySelector('#move5_3Field');
  const move5_4Field = teamForm.querySelector('#move5_4Field');
  
  const pkmn6Field = teamForm.querySelector('#pkmn6Field');
  const move6_1Field = teamForm.querySelector('#move6_1Field');
  const move6_2Field = teamForm.querySelector('#move6_2Field');
  const move6_3Field = teamForm.querySelector('#move6_3Field');
  const move6_4Field = teamForm.querySelector('#move6_4Field');
  
  const xhr = new XMLHttpRequest();
  xhr.open(teamMethod, teamAction);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //same action form sends
  xhr.setRequestHeader('Accept','application/json');
  
  xhr.onload = () => handleResponse(xhr, true);
  
  //const formData = `teamName=${teamNameField.value}`;
  
  const formData = `teamName=${teamNameField.value}&pkmn1=${pkmn1Field.value}&move1_1=${move1_1Field.value}&move1_2=${move1_2Field.value}&move1_3=${move1_3Field.value}&move1_4=${move1_4Field.value}&pkmn2=${pkmn2Field.value}&move2_1=${move2_1Field.value}&move2_2=${move2_2Field.value}&move2_3=${move2_3Field.value}&move2_4=${move2_4Field.value}&pkmn3=${pkmn3Field.value}&move3_1=${move3_1Field.value}&move3_2=${move3_2Field.value}&move3_3=${move3_3Field.value}&move3_4=${move3_4Field.value}&pkmn4=${pkmn4Field.value}&move4_1=${move4_1Field.value}&move4_2=${move4_2Field.value}&move4_3=${move4_3Field.value}&move4_4=${move4_4Field.value}&pkmn5=${pkmn5Field.value}&move5_1=${move5_1Field.value}&move5_2=${move5_2Field.value}&move5_3=${move5_3Field.value}&move5_4=${move5_4Field.value}&pkmn6=${pkmn6Field.value}&move6_1=${move6_1Field.value}&move6_2=${move6_2Field.value}&move6_3=${move6_3Field.value}&move6_4=${move6_4Field.value}`;
  
  xhr.send(formData); //send back the data
  
  e.preventDefault(); //prevent browser from sending form
  return false; //dont change page
};

const init = () => {
  //input and make/update team
  const teamForm = document.querySelector('#teamForm');
  const addTeam = (e) => sendPost(e, teamForm);
  teamForm.addEventListener('submit', addTeam);
  
  //refresh list button
  document.querySelector('#refreshButton').onclick = (e) => {
    const url = '/getTeams'
    const method = 'get'
    
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    
    xhr.onload = () => handleResponse(xhr, true);

    xhr.send();
    
    e.preventDefault();
    return false;
  };
  
  //todo remove old code
  const userForm = document.querySelector('#userForm');
  const getUsers = (e) => requestUpdate(e, userForm);
  userForm.addEventListener('submit', getUsers);
};

window.onload = init;