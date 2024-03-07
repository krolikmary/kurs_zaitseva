
let userInfo = {};

let input = document.getElementById("user_name");
input.addEventListener( 'input',
    ()=>{
        userInfo.name = input.value;
    }
);

let startButton = document.getElementById("start");
startButton.addEventListener('click', (event)=>{
    event.preventDefault();
    if (userInfo.name){
        level_selection(false);
    }
    else { shake_button(startButton); }
});

let startAllLevelsButton = document.getElementById("startAllLevels");
startAllLevelsButton.addEventListener('click', (event)=>{
    event.preventDefault();
    if (userInfo.name){
        level_selection(true);
    }
    else { shake_button(startAllLevelsButton); }
});

function shake_button(item){
    let startButtonClassList = item.classList;
    startButtonClassList.add('shaked');
    setTimeout(()=>
        startButtonClassList.remove('shaked')
    , 1000);
}

function level_selection(allLevel){
    let conteiner = document.querySelector('.conteiner');
    conteiner.replaceChildren();

    if (allLevel){
        conteiner.insertAdjacentHTML('afterbegin',
            `<h class="title">choose lvl</h>
            <form class="level_selection" action="./game.html">
                <button class="level unlocked" value="1">1</button>
                <button class="level unlocked" value="2">2</button>
                <button class="level unlocked" value="3">3</button>
            <form>`
        );
    }
    else {
        conteiner.insertAdjacentHTML('afterbegin',
            `<h class="title">choose lvl</h>
            <form class="level_selection" action="./game.html">
                <button class="level unlocked" value="1">1</button>
                <button class="level locked" value="2">2</button>
                <button class="level locked" value="3">3</button>
            <form>`
        );
        let scores = String(localStorage.getItem(userInfo.name) || 0);
        scores = scores.split(',');
        for (let i = 0; i < scores.length; i++){
            if (+scores[i] >= 5 && i < 2) {
                let item = document.querySelector('.level_selection').children[i+1];
                if (item.classList.contains('locked')){ 
                    item.classList.remove('locked');
                    item.classList.add('unlocked');
                }
            }
        }
    }

    document.querySelectorAll('.locked').forEach( item =>{
        item.disabled = 'disabled';
    })

    document.querySelectorAll('.level').forEach((item)=>{
        item.addEventListener('click', ()=>{
            localStorage.setItem("last_player", userInfo.name);
            localStorage.setItem("last_level", item.value);
            let scores = localStorage.getItem(userInfo.name);
            if (!scores) { localStorage.setItem(userInfo.name, "") }
        })
    });
}
