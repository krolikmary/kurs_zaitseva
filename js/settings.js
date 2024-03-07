
document.querySelector("body").insertAdjacentHTML(
    'afterbegin',
    `<header class="header">
        <a href="index.html"><img class="icon_home" src="styles/icons/home.svg" alt="svg"></a>
        <button class="header_button theme_switch" onclick="changeTheme()" type="button"></button>
    </header>`
)

// начальные настройки
if (localStorage.getItem('theme') == 'dark'){
    document.querySelector('body').style.backgroundColor = 'var(--dark_theme_background-color)';
    document.querySelector('body').style.color = 'var(--light_theme_background-color)';
    document.querySelector('.theme_switch').insertAdjacentHTML( 'afterbegin', `<img src="styles/icons/moon.svg" alt="svg">`);
}
else{
    document.querySelector('body').style.backgroundColor = 'var(--light_theme_background-color)';
    document.querySelector('body').style.color = 'var(--dark_theme_background-color)';
    document.querySelector('.theme_switch').insertAdjacentHTML( 'afterbegin', `<img src="styles/icons/sun.svg" alt="svg">`);
}

function changeTheme(){
    let currentSett = document.querySelector('body').style;
    document.querySelector('.theme_switch').replaceChildren();
    if (localStorage.getItem('theme')=='dark'){
        currentSett.backgroundColor = 'var(--light_theme_background-color)';
        currentSett.color = 'var(--dark_theme_background-color)';
        document.documentElement.style.cssText = "--blocks-color: rgb(175 175 175 / 77%);";
        //замена иконки
        document.querySelector('.theme_switch').insertAdjacentHTML( 'afterbegin', `<img src="styles/icons/sun.svg" alt="svg">`);
        localStorage.setItem('theme', 'light');
    }
    else{
        currentSett.backgroundColor = 'var(--dark_theme_background-color)';
        currentSett.color = 'var(--light_theme_background-color)';
        document.documentElement.style.cssText = "--blocks-color: rgb(128 128 128 / 77%);";
        document.querySelector('.theme_switch').insertAdjacentHTML( 'afterbegin', `<img src="styles/icons/moon.svg" alt="svg">`);
        localStorage.setItem('theme', 'dark');
    }
    
}


