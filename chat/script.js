const
    fileInput = document.getElementById('avatar'),
    loginInput = document.getElementById('login'),
    avatarImage = document.getElementById('avatar-image'),
    enterButton = document.getElementById('enter'),
    loginForm = document.getElementById('login-form'),
    exitButton = document.getElementById('exit');
if (exitButton){
    exitButton.addEventListener("click", function(e){
        e.preventDefault();
        localStorage.removeItem('username');
        window.location.reload();
    });
}
let
    avatar = localStorage.getItem('avatar'),
    username = localStorage.getItem('username');
if (avatar && avatarImage) {
    avatarImage.src = avatar;
}
if (!username) {
    if (enterButton) {
        enterButton.addEventListener("click", function (e) {
            e.preventDefault();
            if (loginInput && loginInput.value.trim()) {
                localStorage.setItem('username', loginInput.value);
                window.location.reload();
            }
        });
    }
    if (loginInput) {
        loginInput.value = username;
        loginInput.addEventListener("keyup", function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (e.keyCode == 13) {
                if (enterButton) {
                    enterButton.dispatchEvent(new Event('click'));
                }
            }
        });
    }
    if (fileInput && avatarImage) {
        fileInput.addEventListener('change', function (e) {
            const el = e.target;
            if (el.files.length) {
                const file = el.files[0]
                if (file.size <= 2 * 1024 * 1024) {
                    if (/.+\/(png|jpe?g|gif)$/.test(file.type)) {
                        const fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onloadend = function () {
                            avatar = fileReader.result;
                            avatarImage.src = avatar;
                            localStorage.setItem('avatar', avatar)
                        }
                    }
                }
            }
        });
    }
} else {
    loginForm.style.display = "none";
    const
        chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.style.display = "inherit";
        chatForm.querySelector("header span").innerHTML = "Привет, " + username;
        const image = './assets/7.png'


        const
            button = document.getElementById('button'),
            input = document.getElementById('message'),
            content = document.getElementById('content'),
            audio = document.getElementById('audio-send');
        input.focus();
        if (button) {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (input) {
                    let text = input.value;
                    if (text.length > 0) {
                        let block = `
                    <article class="message">
                        <div class="image">
                            <img src="${avatar ? avatar : image}" alt="">
                        </div>
                        <div class="text">
                            <div class="head">
                                <div class="name">Вы</div>
                                <div class="time">Минуту назад</div>
                            </div>
                            <div class="body">
                                ${text}
                            </div>
                        </div>
                    </article>
                `;
                        if (content) {
                            content.innerHTML += block;
                        }
                        if (audio) {
                            audio.play()
                        }
                    }
                    input.value = '';
                    input.dispatchEvent(new Event('focus'));
                }
            });
        }
        if (input) {
            input.addEventListener("keyup", function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                if (e.keyCode == 13) {
                    if (button) {
                        button.dispatchEvent(new Event('click'));
                    }
                }
            });
        }
    }
}




