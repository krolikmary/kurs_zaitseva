const count_items = [10, 15, 20];
const count_tasks = 5;
const time_wait = 30;
 
 
const quest_conditions = [
    {condition:'начинающиеся на букву Я',  check: 'я'},
    {condition:'начинающиеся на букву Л', check: 'л'},
    {condition:'начинающиеся на букву А', check: 'а'},
    {condition:'начинающиеся на букву Т', check: 'т'},
    {condition:'означающие животных', check: 'животное'},
    {condition:'означающие фрукт', check: 'фрукт'},
    {condition:'означающие город', check: 'город'}
  
];
 

const words = [
    { word: 'яблоко', condition1: 'фрукт',  condition2: 'я'},
    { word: 'ананас', condition1: 'фрукт', condition2: 'а'},
    { word: 'апельсин', condition1: 'фрукт', condition2: 'а'},
    { word: 'як', condition1: 'животное', condition2: 'я'},
    { word: 'якорь', condition1: 'ничего', condition2: 'я'},
    { word: 'лимон', condition1: 'фрукт', condition2: 'л'},
    { word: 'лось', condition1: 'животное' , condition2: 'л'},
    { word: 'лев', condition1: 'животное', condition2: 'л'},
    { word: 'личи', condition1: 'фрукт', condition2: 'л'},
    { word: 'лайм', condition1: 'фрукт', condition2: 'л'},
    { word: 'абрикос', condition1: 'фрукт', condition2: 'а'},
    { word: 'Архангельск', condition1: 'город', condition2: 'а'},
    { word: 'Адлер', condition1: 'город', condition2: 'а'},
    { word: 'Абакан', condition1: 'город', condition2: 'а'},
    { word: 'Анапа', condition1: 'город', condition2: 'а'},
    { word: 'Арзамас', condition1: 'город', condition2: 'а'},
    { word: 'Тверь', condition1: 'город', condition2: 'т'},
    { word: 'Таганрог', condition1: 'город', condition2: 'т'},
    { word: 'Тамбов', condition1: 'город', condition2: 'т'},
    { word: 'Тигр', condition1: 'животное', condition2: 'т'},
    { word: 'Тюлень', condition1: 'животное', condition2: 'т'},
    { word: 'Тукан', condition1: 'животное', condition2: 'т'}
 
]
 





 
let currentTask = 0;
let countAnsw = 0;
 
let userScore = 0;
let level = localStorage.getItem("last_level");
let task_tracking = document.querySelector('.task_tracking').children;
 

 
// Добавление индикаторов
const taskTracking = document.querySelector('.task_tracking');
for (let i = 0; i < count_tasks; i++) {
    const taskIndicator = document.createElement('div');
    taskIndicator.className = 'task_indicator';
    taskTracking.appendChild(taskIndicator);
}
 
 
 
 
    generate_task();
    animateWords() ;
    showRules();
 
    function showRules() {
        document.querySelector('.timer_slider').style.animationPlayState = 'paused';
    
        const wrapRes = document.createElement('div');
        wrapRes.className = 'wrap_res';
    
        const title = document.createElement('h1');
        title.className = 'title';
        title.textContent = 'Правило';
        wrapRes.appendChild(title);
    
        const description = document.createElement('h');
        description.style.fontSize = '14pt';
        description.textContent = 'Выбрать все слова с заданным свойством';
        wrapRes.appendChild(description);
 
        const form = document.createElement('form');
        const button = document.createElement('button');
        button.className = 'button';
        button.type = 'button';
        button.textContent = 'поехали';
        form.appendChild(button);
        wrapRes.appendChild(form);
        
        
        
    
        const mask = document.createElement('div');
        mask.className = 'mask';
    
        document.querySelector('body').appendChild(wrapRes);
        document.querySelector('body').appendChild(mask);
    
        button.addEventListener('click', () => {
            document.querySelector('.timer_slider').style.animationPlayState = 'running';
            wrapRes.remove();
            mask.remove();
        });
    }
    
 
//генерация задания
function generate_task() {
    let items = document.querySelector('.items');
    let title = document.querySelector('.title_quest');
    countAnsw = 0;
    task_words = []; 

     // выбор условия для задания
     let condition_index = Math.floor(Math.random() * quest_conditions.length);
     let condition = quest_conditions[condition_index][Object.keys(quest_conditions[0])[0]];
     let conditioncheck = quest_conditions[condition_index][Object.keys(quest_conditions[0])[1]];
     title.innerHTML = `Выберите все слова  ${condition}`;

    const index = words.findIndex(item => item.condition1 === conditioncheck || item.condition2 === conditioncheck);

    task_words.push(words[index]);
 
    //выбор случайных слов
    for (let i = 0; i < count_items[level - 1]; i++) {
        task_words.push(words[Math.floor(Math.random() * words.length)]); //тут лежат выбранные слова с подходящими им условиями
    }
 
  
 
    items.replaceChildren(); // очищение от слов
    
  
 
    setWords(task_words).forEach(element => {
        items.appendChild(element)
        
    });
    animateWords() ;
  
 
    isStartTimer(true); // запуск таймера
    
 
    let arrAnswers = quest_conditions[condition_index] 
    //обработка нажатия на ответы
    document.querySelectorAll('.word').forEach(item => {
        item.addEventListener('click', () => { processing(item, arrAnswers, generate_task) })
    });
}
 
 
 
 
 
 
function isStartTimer(a) {
    const timerContainer = document.querySelector('.timer');
 
    if (a) { // добавление таймера
        const timerSlider = document.createElement('div');
        timerSlider.className = 'timer_slider';
        timerSlider.style.animation = `${time_wait}s timer forwards linear`;
 
        timerSlider.addEventListener('animationend', () => {
            task_tracking[currentTask++].style.background = 'brown';
            if (currentTask === count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate_task();
            }
        });
 
        timerContainer.insertAdjacentElement('afterbegin', timerSlider);
    } else { // удаление таймера
        timerContainer.replaceChildren();
    }
}
 
 
function showRes() {
    
    document.querySelector('.timer_slider').remove();
    const wrapRes = document.createElement('div');
    wrapRes.className = 'wrap_res';
 
    const title = document.createElement('h');
    title.className = 'title';
    title.textContent = `Ваш результат: ${userScore}`;
    

    // сохранение результата
    let name = localStorage.getItem("last_player");
    let userScores = localStorage.getItem(name).split(',');
    userScores[level - 1] = userScore > (userScores[level - 1] || 0) ? userScore : userScores[level - 1];
    if (isNaN(userScores[level - 1])) {
        userScores[level - 1] = userScore;
    }
    userScores[level - 1] = +userScores[level - 1];
    localStorage.setItem(name, userScores);
    let res = document.querySelector('.wrap_res');


    
    const form = document.createElement('form');

    if (userScore === 5 && level < 3) {
        alert(level);
        const nextLevelButton = document.createElement('button');
        nextLevelButton.className = 'button';
        nextLevelButton.type = 'button';
        nextLevelButton.textContent = 'next lvl';
        nextLevelButton.addEventListener('click', function(){
            level++;
            localStorage.setItem("last_level", level);
            window.location.href = 'game.html';
            
        });
        form.appendChild(nextLevelButton);
        
    }
    else{
        const restartButton = document.createElement('button');
        restartButton.className = 'button';
        restartButton.type = 'button';
        restartButton.textContent = 'again';
        restartButton.addEventListener('click', function(){
            
            
            window.location.href = 'game.html';
            
        });
        form.appendChild(restartButton);
    }
    
 
    wrapRes.appendChild(title);
    wrapRes.appendChild(form);
 
    const mask = document.createElement('div');
    mask.className = 'mask';
 
    document.querySelector('body').appendChild(wrapRes);
    document.querySelector('body').appendChild(mask);
 
    
}
 
function processing(item, arrAnswers, generate) {
    item.setAttribute("checked", true)
    if (arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") ||  arrAnswers.check == item.getAttribute("condition2")) {
        countAnsw += 1;
        item.style = 'background: rgb(90 169 90)';
        if (noMoreLeft(arrAnswers)) { //!!!
            userScore += 1;
            console.log("userScore=" + userScore)
            console.log("currentTask=" + currentTask)
            console.log("count_tasks="+count_tasks)
            task_tracking[currentTask++].style = 'background: green';
            if (currentTask == count_tasks) {
                showRes();
            } else {
                isStartTimer(false);
                generate();
            }
        }
    } else {
        task_tracking[currentTask++].style = 'background: brown';
        if (currentTask == count_tasks) {
            showRes();
        } else {
            isStartTimer(false);
            generate();
        }
    }
}

function noMoreLeft(arrAnswers) {
    let ans = true
    document.querySelectorAll('.word').forEach(item => {
        if (isCorrect(item, arrAnswers) && item.getAttribute("checked") != "true") {
            ans = false
        }
    });
    return ans
}
 
function isCorrect(item, arrAnswers) {
    return arrAnswers.check == item.textContent[0] || arrAnswers.check == item.getAttribute("condition1") || arrAnswers.check == item.getAttribute("condition2")
}
 
function setWords(words, conditionKey) {
    return words.map(item => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = item['word'];
        wordDiv.setAttribute('condition1', item['condition1'])
        wordDiv.setAttribute('condition2', item['condition2'])
        return wordDiv;
    });
    
}
 
 
function wrapWord(word) {
    return word;
}
function random(n) {
    return Math.floor(Math.random() * n);
}
 
 

 
 
 
function animateWords() {
    const words = document.querySelectorAll('.word');
    const items = document.querySelector('.items');
    
    words.forEach(word => {
        // Генерация случайных начальных координат
        let x = Math.random() * (items.clientWidth - word.clientWidth);
        let y = Math.random() * (items.clientHeight - word.clientHeight);

        // Генерация случайных скоростей
        let speedX = (Math.random() - 0.5) * 2; // от -1 до 1
        let speedY = (Math.random() - 0.5) * 2;

        if(level === 2) {speedX *= 2;  speedY *= 2;} // Увеличение скорости на 100%
        else if (level === 3) {// Увеличение скорости на 200%
            speedX *= 10;  
            speedY *= 10;
        }
        // Анимация перемещения
        function move() {
            // Обновление координат на основе вектора скорости
            x += speedX;
            y += speedY;

            // Проверка на выход за границы items
            if (x < 0 || x > items.clientWidth - word.clientWidth) {
                speedX *= -1; // Изменение направления по оси X
            }

            if (y < 0 || y > items.clientHeight - word.clientHeight) {
                speedY *= -1; // Изменение направления по оси Y
            }

            // Установка координат элемента
            word.style.left = `${x}px`;
            word.style.top = `${y}px`;

            requestAnimationFrame(move);
        }

        // Запуск анимации
        move();
    });
}
