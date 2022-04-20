const tasks = []
let time = 0;
let timer = null;
let timerbreak = null;
let curretn = null;

const btn = document.querySelector("#btn");
const txt = document.querySelector("#txt");
const form = document.querySelector("#action-form");
const taskname = document.querySelector("#time #taskname");

rendertime();
rendertask();

form.addEventListener("submit", e => {
    e.preventDefault();
    if (txt.value !== "") {
        createtask (txt.value);
        txt.value = "";
        rendertask();
    }
});
function createtask(value) {
    const newtask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false,
    };
    tasks.unshift(newtask);
}

function rendertask() {
    const html = tasks.map(task => {
        return `
            <article class="task">
                <span class="completed">${
                    task.completed 
                    ? `<span class="done material-icons">check_circle</span>` 
                    : `<button class="btn-start" data-id="${task.id}">Start</button>`
                }</span>
                <span class="title">${task.title}</span>
            </article>
        `;
    });
    const taskcontainer = document.querySelector('#task');
    taskcontainer.innerHTML = html.join("");

    const startbtn = document.querySelectorAll(".task .btn-start");

    startbtn.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (!timer) {
                const id = button.getAttribute("data-id");
                startHandler(id);
                button.textContent = "In Progress ...";
            }
        })
    });
}

function startHandler(id) {
    time = 25 * 60;
    curretn = id;
    const taskindex = tasks.findIndex(task => task.id === id);
    taskname.textContent = tasks[taskindex].title;
    rendertime();
    timer = setInterval(() => {
        timerHandler(id);
    }, 1000);
}

function timerHandler(id) {
    time--;
    rendertime();

    if (time === 0) {
        clearInterval(timer);
        markcompleted(id);
        timer = null;
        rendertask();
        startbreak();
    }
}

function startbreak() {
    time = 5 * 60;
    taskname.textContent = "Break";
    rendertime();
    timerbreak = setInterval(() => {
        timerbreakHanlder();
    }, 1000);
}

function timerbreakHanlder() {
    time--;
    rendertime();

    if (time === 0) {
        clearInterval(timerbreak);
        curretn = null;
        timerbreak = null;
        taskname.textContent = "";
        rendertask();
    }
}

function rendertime() {
    const timediv = document.querySelector("#time #value");
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timediv.textContent = `${minutes < 10 ? "0" : ""}${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
}

function markcompleted(id) {
    const taskindex = tasks.findIndex((task) => task.id === id);
    tasks[taskindex].completed = true;
}