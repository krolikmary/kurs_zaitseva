
document.querySelector('.conteiner').insertAdjacentHTML('beforeend',
    `<div class='scroll_stats'> ${ showUsersScore() } </div>`
);

function showUsersScore(){
    let users = getUsers();
    users.sort(function(a, b){
        return sum(b.scores) - sum(a.scores);
    });

    return users.map(
        (user) => `<div class="user"> ${showInfo(user)} </div>`
    ).join('');
}

function showInfo(user){
    let scores = user.scores.split(',');
    return `
        <h3> ${user.name} </h3>
        <div class='wraper'>
            ${scores.map( (item,index) => `<h> lvl ${index+1}: ${item||0} </h>`).join('')}
        </div>
        `;
}


function getUsers(){
    localStorage.removeItem('last_player');
    localStorage.removeItem('last_level');
    localStorage.removeItem('theme');
    let arr = [];
    let name;
    for (let i = 0; i < localStorage.length; i++){
        name = localStorage.key(i);
        arr.push({ name: name, scores: localStorage.getItem(name) });
    }
    return arr
}

function sum(arr){
    arr = arr.split(',');
    arr = arr.map(item => +item);
    console.log(arr);
    return arr.reduce((partialSum, a) => partialSum + a, 0);
}

