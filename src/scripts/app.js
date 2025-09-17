// Vars
const elm_body = document.querySelector('body');
const elm_root = document.querySelector('#root');
const elm_reader = document.querySelector('#reader');
const elm_reader_input = document.querySelector('#reader_input');

const commands = [{command: '', type: 0, result: ''}, {command: 'clear', type: 1}, {
    command: 'help',
    type: 0,
    result: 'Available commands:\n- clear\n- help\n- about'
}, {command: 'about', type: 0, result: 'Tiki Terminal v1.0\nMade by tikrack.'}];

// History
let history = [];
let historyIndex = -1;

// Commands
const cClear = () => {
    const cmds = document.querySelectorAll('.command');
    cmds.forEach((cmd) => {
        if (cmd.nextElementSibling && cmd.nextElementSibling.id !== "reader") {
            cmd.nextElementSibling.remove();
        }
        cmd.remove();
    });
};

// Functions
const handleCommandRun = (cmd) => {
    if (cmd.command === "clear") cClear();
};

const runCommand = (command) => {
    const cmd = commands.find(item => item.command === command);
    if (!cmd) {
        addCommandResult("Command not found!");
        return;
    }

    if (cmd.type === 0) {
        addCommandResult(cmd.result);
    } else if (cmd.type === 1) {
        handleCommandRun(cmd);
    }
};

const addCommand = (command) => {
    elm_reader_input.value = '';
    elm_reader.insertAdjacentHTML('beforebegin', `
    <div class="command">
        <span>[tikrack@tikrack ~]$</span>
        <input type="text" readonly value="${command}">
    </div>
    `);
};

const addCommandResult = (result = "") => {
    const cmds = document.querySelectorAll('.command');
    const cmd = cmds[cmds.length - 1];

    cmd.insertAdjacentHTML('afterend', `
        <div class="result">${result}</div>
    `);

    window.scrollTo({top: elm_body.scrollHeight, behavior: "smooth"});
};

// Events
elm_root.addEventListener('click', (e) => {
    if (elm_reader.contains(e.target)) {
        elm_reader_input.focus();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = elm_reader_input.value.trim();
        if (command) {
            history.push(command);
            historyIndex = history.length;
        }
        addCommand(command);
        runCommand(command);
    }

    if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            elm_reader_input.value = history[historyIndex];
        }
    }

    if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            elm_reader_input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            elm_reader_input.value = '';
        }
    }

    if (e.key === 'Tab') {
        e.preventDefault();
        const inputVal = elm_reader_input.value.trim();
        if (inputVal) {
            const match = commands.find(c => c.command.startsWith(inputVal));
            if (match) {
                elm_reader_input.value = match.command;
            }
        }
    }
});
