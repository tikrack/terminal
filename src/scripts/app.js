// Vars

const elm_body = document.querySelector('body');
const elm_root = document.querySelector('#root');
const elm_reader = document.querySelector('#reader');
const elm_reader_input = document.querySelector('#reader_input');

const commands = [{
    command: '', type: 0, result: ''
}, {
    command: 'clear', type: 1
}]

// Commands

const cClear = () => {
    const cmds = document.querySelectorAll('.command')

    cmds.forEach((cmd, i) => {
        if (cmd.nextElementSibling.id !== "reader") {
            cmd.nextElementSibling.remove()
        }
        cmd.remove()
    })
}

// Functions

const handleCommandRun = (cmd) => {
    if (cmd.command === "clear") cClear()
}

const runCommand = (command) => {
    if (!commands.map(item => item.command).flat().includes(command)) {
        addCommandResult("Command not found!");
    }

    const cmd = commands.find(item => item.command === command);

    if (cmd?.type === 0) {
        addCommandResult(cmd.result);
    } else if (cmd?.type === 1) {
        handleCommandRun(cmd)
    } else {
    }
}

const addCommand = (command) => {
    elm_reader_input.value = '';
    elm_reader.insertAdjacentHTML('beforebegin', `
    <div class="command">
        <span>[tikrack@tikrack ~]$</span>
        <input type="text" readonly autofocus autocomplete="off" value="${command}">
    </div>
    `);
}

const addCommandResult = (result = "") => {
    const cmds = document.querySelectorAll('.command')
    const cmd = cmds[cmds.length - 1]

    cmd.insertAdjacentHTML('afterend', `
        <div class="result">${result}</div>
    `)

    window.scrollTo(0, elm_body.scrollHeight);
}

// Events

elm_root.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.contains(elm_reader)) {
        elm_reader_input.focus();
    }
})

window.addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') return null;

    const command = elm_reader_input.value.trim();
    addCommand(command);
    runCommand(command);
})