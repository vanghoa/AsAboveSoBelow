const gpt_msg = [];
const disconnector = (pause = true) => {
    resizeObserver.disconnect();
    interact(nav_handle).draggable(false);
    pause && terminal.pause();
};
const connector = () => {
    resizeObserver.observe(divx);
    interact(nav_handle).draggable(true);
    terminal.resume();
};
const commands = {
    /*
    leading: {
        run(arg) {
            const vl = parseFloat(arg);
            if (isNaN(vl) || vl < 1 || vl > 100) {
                throw new Error(
                    `Order 'leading' requires the argument to be a number from 1 to 100`
                );
            }
            setLeading(((vl - 1) / (100 - 1)) * (88 - 8) + 8);
            connector();
        },
    },
    */
    cast: {
        run(arg) {
            setText(arg);
        },
    },
    'fore-cast': {
        run(arg) {
            if (arg.length > 200) {
                throw new Error(
                    `Please input a shorter text! Due to limited tokens, we cannot handle a long chat-gpt inquiry.`
                );
            }
            const newgpt_msg = { role: 'user', content: `${arg}` };
            gpt_msg.push(newgpt_msg);
            fetch(
                'https://asabovesobelow.azurewebsites.net/api/asabovesobelow',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: gpt_msg,
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.msg);
                    } else {
                        data = data.completion;
                        // prettier-ignore
                        terminal.echo(`[[;${color.p};]${data.model} usage at ${data.created}:
        [[;${color.w};]+ prompt_tokens:] ${data.usage.prompt_tokens}
        [[;${color.w};]+ completion_tokens:] ${data.usage.completion_tokens}
        [[;${color.w};]+ total_tokens:] ${data.usage.total_tokens}]`)
                        gpt_msg.push({
                            role: 'assistant',
                            content: `${data.choices[0].message.content}`,
                        });
                        setText(data.choices[0].message.content);
                    }
                })
                .catch((err) => {
                    connector();
                    terminal.error(err);
                });
        },
    },
    'spell-cast': {
        run() {
            toggleLig();
            connector();
        },
        noarg: true,
    },
    'death-cast': {
        run() {
            pdfprint();
            connector();
        },
        noarg: true,
    },
    /*
    'get-command': {
        options: ['name', 'age', 'description', 'address'],
        args: ['clear'],
    },
    git: {
        args: ['commit', 'push', 'pull'],
        options: ['amend', 'hard', 'version', 'help'],
    },
    */
};
const color = {
    w: $('html').css('--white'),
    p: $('html').css('--purple'),
};
//const uap = new UAParser().getResult();
const terminal = $('#terminal').terminal(
    function (cmd) {
        try {
            disconnector();
            cmd = $.terminal.parse_command(cmd);
            if (!commands[cmd.name]) {
                // prettier-ignore
                throw new Error(`Order '${cmd.name}' not found! Plese check the spelling of the command again.
At line:1 char:1`);
            } else if (cmd.rest == '' && !commands[cmd.name]?.noarg) {
                throw new Error(`Order '${cmd.name}' requires 1 argument(s) to be specified; found 0. Please do not use empty '' argument!
At line:1 char:${cmd.name.length}`);
            } else if (commands[cmd.name]?.run) {
                commands[cmd.name].run(cmd.rest);
            } else {
            }
        } catch (err) {
            terminal.error(err);
            connector();
        }
    },
    {
        autocompleteMenu: true,
        completion: function () {
            let term = this;
            return new Promise(function (resolve) {
                let command = term.get_command();
                let name = command.match(/^([^\s]*)/)[0];
                let list = [];
                if (name) {
                    let word = term.before_cursor(true);
                    let regex = new RegExp('^' + $.terminal.escape_regex(word));
                    if (name == word) {
                        list = Object.keys(commands);
                    } else if (command.match(/\s/)) {
                        if (commands[name]) {
                            if (word.match(/^--/)) {
                                list = commands[name]?.options.map(function (
                                    option
                                ) {
                                    return '--' + option;
                                });
                            } else {
                                list = commands[name]?.args;
                            }
                        }
                    }
                }
                resolve(list || []);
            });
        },
        greetings: `
This is The Alphabetical Order beta@1.0
        
Here is the list of orders you can use:
  > [[;${color.w};${color.p}] cast ] followed by [[;${color.w};${color.p}] text ] : print out text;
    Example: [[;${color.w};${color.p}] cast the alphabetical order ] will print out 'the alphabetical order';
  > [[;${color.w};${color.p}] spell-cast ] : toggle the ligature option;
  > [[;${color.w};${color.p}] death-cast ] : give you the vector file of the text;
  > [[;${color.w};${color.p}] fore-cast ] followed by [[;${color.w};${color.p}] inquiry ] : ask chat-gpt whatever your inquiry is. Please use this order sparingly as the chat-gpt AI costs real money;
    Example: [[;${color.w};${color.p}] fore-cast can you access the internet? ] will input the inquiry to chat-gpt and the answer will be printed out;

Some shortcuts that might be helpful:
  > [[;black;${color.w}] tab ] : autocompletion;
  > [[;black;${color.w}] arrow key up ] / [[;black;${color.w}] arrow key down ] : access previous orders;`,
        mobileDelete: true,
        prompt: `
[[;${color.w};]> ]` /* `[[;${color.w};]
@:\\${uap.os.name
            .replace(' ', '')
            .replace('OS', '')}-OS\\${uap.browser.name.replace(
            ' ',
            '-'
        )}-browser User$ ]`*/,
        /*
        onBlur: () => false,
        */
    }
);
