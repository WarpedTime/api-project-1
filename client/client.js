let _teamList = { };

const handleGet = (xhr, parseResponse) => {
  const content = document.querySelector('#content');
  
  //print etag number
  console.log(xhr.getResponseHeader ('etag'));
  
  //show true status code
  let status = xhr.status;
  console.log(`getTeams status: ${status}`);
  
  //do not parse if is head
  if( status === 204 || status === 304){
    parseResponse = false;
    console.dir(xhr.responseText);
    console.log('recieved');
  }

  if(parseResponse){
    const obj = JSON.parse(xhr.response);
    console.dir(obj);
    updateTeams(obj.teams);
  }
};

const handlePost = (xhr, parseResponse) => {
  const content = document.querySelector('#content');
  
  //print etag number
  console.log(xhr.getResponseHeader ('etag'));
  
  //show true status code
  let status = xhr.status;
  console.log(`postTeam status: ${status}`);
  
  //do not parse if is head
  if( status === 204 || status === 304){
    parseResponse = false;
    console.dir(xhr.responseText);
    console.log('recieved');
  }
  
  switch(xhr.status){
  case 200:
    content.innerHTML = '<b>Success</b>';
    break;
  case 201:
    content.innerHTML = '<b>Created</b>';
    getTeams();
    resetForm();
    document.querySelector('#createTeam').style.display = 'none';
    break;
  case 204:
    content.innerHTML = '<b>Updated</b>';
    getTeams();
    resetForm();
    document.querySelector('#createTeam').style.display = 'none';
    break;
  case 304:
    content.innerHTML = '<b>Not Modified</b>';
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
    content.innerHTML += `<br><b> ${obj.message}</b>`;
  }
};

const updateTeams = (teams) =>{
  console.log('updatedList');
  _teamList = teams;
  loadTeams();
}

const resetForm = () => {
  document.querySelector('#teamForm').reset(); 
  
  /*
  teamForm.querySelector('#teamNameField');
  teamForm.querySelector('#descField');
  
  teamForm.querySelector('#pkmn1Field');
  teamForm.querySelector('#move1_1Field');
  teamForm.querySelector('#move1_2Field');
  teamForm.querySelector('#move1_3Field');
  teamForm.querySelector('#move1_4Field');
  
  teamForm.querySelector('#pkmn2Field');
  teamForm.querySelector('#move2_1Field');
  teamForm.querySelector('#move2_2Field');
  teamForm.querySelector('#move2_3Field');
  teamForm.querySelector('#move2_4Field');
  
  teamForm.querySelector('#pkmn3Field');
  teamForm.querySelector('#move3_1Field');
  teamForm.querySelector('#move3_2Field');
  teamForm.querySelector('#move3_3Field');
  teamForm.querySelector('#move3_4Field');
  
  teamForm.querySelector('#pkmn4Field');
  teamForm.querySelector('#move4_1Field');
  teamForm.querySelector('#move4_2Field');
  teamForm.querySelector('#move4_3Field');
  teamForm.querySelector('#move4_4Field');
  
  teamForm.querySelector('#pkmn5Field');
  teamForm.querySelector('#move5_1Field');
  teamForm.querySelector('#move5_2Field');
  teamForm.querySelector('#move5_3Field');
  teamForm.querySelector('#move5_4Field');
  
  teamForm.querySelector('#pkmn6Field');
  teamForm.querySelector('#move6_1Field');
  teamForm.querySelector('#move6_2Field');
  teamForm.querySelector('#move6_3Field');
  teamForm.querySelector('#move6_4Field');
  */
}

const sendPost = (e, teamForm) => {
  const teamAction = teamForm.getAttribute('action');
  const teamMethod = teamForm.getAttribute('method');
  
  const teamNameField = teamForm.querySelector('#teamNameField');
  const teamDesc = teamForm.querySelector('#descField');
  
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
  
  xhr.onload = () => {
    handlePost(xhr, true);
  };
  
  //const formData = `teamName=${teamNameField.value}`;
  
  const formData = `teamName=${teamNameField.value}&teamDesc=${teamDesc.value}&pkmn1=${pkmn1Field.value}&move1_1=${move1_1Field.value}&move1_2=${move1_2Field.value}&move1_3=${move1_3Field.value}&move1_4=${move1_4Field.value}&pkmn2=${pkmn2Field.value}&move2_1=${move2_1Field.value}&move2_2=${move2_2Field.value}&move2_3=${move2_3Field.value}&move2_4=${move2_4Field.value}&pkmn3=${pkmn3Field.value}&move3_1=${move3_1Field.value}&move3_2=${move3_2Field.value}&move3_3=${move3_3Field.value}&move3_4=${move3_4Field.value}&pkmn4=${pkmn4Field.value}&move4_1=${move4_1Field.value}&move4_2=${move4_2Field.value}&move4_3=${move4_3Field.value}&move4_4=${move4_4Field.value}&pkmn5=${pkmn5Field.value}&move5_1=${move5_1Field.value}&move5_2=${move5_2Field.value}&move5_3=${move5_3Field.value}&move5_4=${move5_4Field.value}&pkmn6=${pkmn6Field.value}&move6_1=${move6_1Field.value}&move6_2=${move6_2Field.value}&move6_3=${move6_3Field.value}&move6_4=${move6_4Field.value}`;
  
  xhr.send(formData); //send back the data
  
  e.preventDefault(); //prevent browser from sending form
  window.location.href = "#create";
  document.querySelector('#viewSection').style.display = 'none'
  return false; //dont change page
};

const loadTeams = () => {
  
  let list = document.querySelector('#list');
  list.innerHTML='';
  
  const keys = Object.keys(_teamList);
  for (let i = 0; i < keys.length; i++) {
    const team = keys[i];
    //<div><p class="opt"> name </p></div>

    let div = document.createElement('div');
    let name = document.createElement('p');
    name.classList.add('opt');
    
    name.textContent = team;
    div.onclick= () => {
      loadTeam(_teamList[team]);
    }
    
    div.appendChild(name);
    list.appendChild(div);
    
  }
  
  let div = document.createElement('div');
  let name = document.createElement('p');
  name.classList.add('opt');
  
  name.textContent = '[+] New Team';
  
  div.onclick= () => {
    document.querySelector('#createTeam').style.display = 'block';
    window.location.href = "#create";
  }
  
  div.appendChild(name);
  list.appendChild(div);
    
  
  console.dir(keys)
}

const loadTeam = (team) => {
  document.querySelector('#viewSection').style.display = 'block';
  
  document.querySelector('#teamName').value = team.teamName;
  document.querySelector('#desc').value = team.teamDesc;
  
  document.querySelector('#pkmn1').value = team.pkmn1;
  document.querySelector('#move1_1').value = team.move1_1;
  document.querySelector('#move1_2').value = team.move1_2;
  document.querySelector('#move1_3').value = team.move1_3;
  document.querySelector('#move1_4').value = team.move1_4;
  
  document.querySelector('#pkmn2').value = team.pkmn2;
  document.querySelector('#move2_1').value = team.move2_1;
  document.querySelector('#move2_2').value = team.move2_2;
  document.querySelector('#move2_3').value = team.move2_3;
  document.querySelector('#move2_4').value = team.move2_4;
  
  document.querySelector('#pkmn3').value = team.pkmn3;
  document.querySelector('#move3_1').value = team.move3_1;
  document.querySelector('#move3_2').value = team.move3_2;
  document.querySelector('#move3_3').value = team.move3_3;
  document.querySelector('#move3_4').value = team.move3_4;
  
  document.querySelector('#pkmn4').value = team.pkmn4;
  document.querySelector('#move4_1').value = team.move4_1;
  document.querySelector('#move4_2').value = team.move4_2;
  document.querySelector('#move4_3').value = team.move4_3;
  document.querySelector('#move4_4').value = team.move4_4;
  
  document.querySelector('#pkmn5').value = team.pkmn5;
  document.querySelector('#move5_1').value = team.move5_1;
  document.querySelector('#move5_2').value = team.move5_2;
  document.querySelector('#move5_3').value = team.move5_3;
  document.querySelector('#move5_4').value = team.move5_4;
  
  document.querySelector('#pkmn6').value = team.pkmn6;
  document.querySelector('#move6_1').value = team.move6_1;
  document.querySelector('#move6_2').value = team.move6_2;
  document.querySelector('#move6_3').value = team.move6_3;
  document.querySelector('#move6_4').value = team.move6_4;
}

const getTeams = (e) => {
  const url = '/getTeams'
  const method = 'get'
  
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  
  xhr.onload = () => { 
    handleGet(xhr, true);
  };
  xhr.send();
  
  if(e != undefined) e.preventDefault();
  return false;
}

const init = () => {
  //input and make/update team
  const teamForm = document.querySelector('#teamForm');
  const addTeam = (e) => sendPost(e, teamForm);
  teamForm.addEventListener('submit', addTeam);
  
  //refresh list button
  document.querySelector('#refreshButton').onclick = getTeams;
  document.querySelector('#closeButton').onclick = (e) => {   
    document.querySelector('#viewSection').style.display = 'none';
    window.location.href = "#top";
  };
  getTeams();
  
  window.location.href = "#top";
  
  const getPokemonData = (e) => {
      const url = '/getPokemon'
      const method = 'get'
      
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('Accept', 'application/json');
      
      xhr.onload = (e) => { 
        const content = document.querySelector('#content');
        let parseResponse = true;
        
        //show true status code
        let status = xhr.status;
        console.log(`getPokemon status: ${status}`);
        
        //do not parse if is head
        if( status != 200){
          parseResponse = false;
          console.dir(xhr.responseText);
          console.log('recieved');
        }
        
        if(parseResponse){
          const obj = JSON.parse(xhr.response);
          createAutoComplete(obj);
        }
    };
    xhr.send();
    
    if(e != undefined) e.preventDefault();
    return false;
  };
  getPokemonData();
  
};

//insert an element after another
const insertAfter = (toInsert, toInsertAfter) => {
    toInsertAfter.parentNode.insertBefore(toInsert, toInsertAfter.nextSibling);
};

const createAutoComplete = (data) =>{
  const teamForm = document.querySelector('#teamForm');
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move1_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move1_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move1_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move1_4Field'));
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move2_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move2_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move2_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move2_4Field'));
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move3_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move3_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move3_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move3_4Field'));
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn4Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move4_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move4_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move4_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move4_4Field'));
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn5Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move5_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move5_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move5_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move5_4Field'));
  
  setupAutoComplete(data.pokemon, teamForm.querySelector('#pkmn6Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move6_1Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move6_2Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move6_3Field'));
  setupAutoComplete(data.moves, teamForm.querySelector('#move6_4Field'));
}

const setupAutoComplete = (data, input) => {
  
  //console.dir(data);
  var arr = data;
  
  let dropdown = document.createElement('div');
  let optionsVal = document.createElement('select');
  
  dropdown.classList.add('dropdown');
  dropdown.appendChild(optionsVal);
  insertAfter(dropdown, input);
  
  input.addEventListener('keyup', show);
  input.parentNode.addEventListener('mouseleave', hide);
  
  optionsVal.onclick = function () {
    setVal(this);
  };
  
  //Use this function to replace potential characters that could break the regex
  RegExp.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  
  //shows the list
  function show() {
    dropdown.style.display = 'none';
    
    optionsVal.options.length = 0;
    
    if (input.value) {
      dropdown.style.display = 'block';
      dropdown.style.top = input.offsetTop+input.clientHeight+4 + 'px';
      dropdown.style.left = input.offsetLeft + input.clientWidth/2 - optionsVal.clientWidth/2 + 'px';
      //dropdown.style.width = input.width;
      
      optionsVal.size = 3;
      var textCountry = input.value;
      
      for (var i = 0; i < arr.length; i++) {
        var testableRegExp = new RegExp(RegExp.escape(textCountry), "i");
        if (arr[i].match(testableRegExp)) {
          addValue(arr[i], arr[i]);
          
        }
      }
      
      var size = dropdown.children[0].children;
      if (size.length > 0)
      {
        var defaultSize = 16;
        if (size.length < 10)
        {
          defaultSize *= size.length;
        }
        else
        {
          defaultSize *= 10;
        }
        dropdown.children[0].style.height = defaultSize + "px";
      } else hide();
      
    }
  }
  
  function addValue(text, val) {
    var createOptions = document.createElement('option');
    optionsVal.appendChild(createOptions);
    createOptions.text = text;
    createOptions.value = val;
  }
  
  //Settin the value in the box by firing the click event
  function setVal(selectedVal) {
    input.value = selectedVal.value;
    dropdown.style.display = 'none';
  }
  
  function hide() {
    dropdown.style.display = 'none';
  }
}


window.onload = init;