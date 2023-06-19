'use strict';
// 'b,d,f,h,k,l,t';
// 'g,j,p,q,y';
// binding method
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
const px = $('p');
const p = $$('p')[1];
let pnode = px.firstChild;
let timeout = null;
const list = new (function () {
    this._construct = function (
        letter,
        width,
        ps_up,
        ps_down,
        st_up = false,
        vl_up = 0,
        st_down = false,
        vl_down = 0,
        cap = false,
        ps_up_for_f = []
    ) {
        this[letter] = {
            width: width / 7,
            ps_up, //(o duoi)
            ps_down, //(o tren)
            st_up,
            vl_up,
            st_down,
            vl_down,
            cap,
            ps_up_for_f,
        };
    };

    this.as = function (letter, width, ps_up, ps_down, vl, ps_up_for_f = []) {
        this._construct(
            letter,
            width,
            ps_up,
            ps_down,
            true,
            vl,
            false,
            0,
            false,
            ps_up_for_f
        );
    };

    this.des = function (letter, width, ps_up, ps_down, vl, ps_up_for_f = []) {
        this._construct(
            letter,
            width,
            ps_up,
            ps_down,
            false,
            0,
            true,
            vl,
            false,
            ps_up_for_f
        );
    };

    this.cap = function (letter, width, ps_up, ps_down, ps_up_for_f = []) {
        this._construct(
            letter,
            width,
            ps_up,
            ps_down,
            false,
            0,
            false,
            0,
            true,
            ps_up_for_f
        );
    };

    this.lowercase = function (
        letter,
        width,
        ps_up,
        ps_down,
        ps_up_for_f = []
    ) {
        this._construct(
            letter,
            width,
            ps_up,
            ps_down,
            false,
            0,
            false,
            0,
            false,
            ps_up_for_f
        );
    };

    return this;
})();
list.as('b', 70, [2], [2], 2, [5]);
list.as('d', 70, [9], [9], 9, [5]);
list.as('f', 35, [3], [], 4);
list.as('h', 63, [2, 8], [2], 2);
list.as('k', 56, [2, 8], [2], 2);
list.as('l', 21, [2], [2], 2);

list.des('g', 70, [], [9], 8);
list.des('j', 21, [], [2], 1);
list.des('p', 70, [], [2], 2, [5]);
list.des('q', 70, [], [9], 9, [5]);
list.des('y', 63, [8], [2, 8], 8, [3]);
list.des('t', 35, [3], [3], 3);

list.lowercase('a', 56, [7], [], [3, 4]);
list.lowercase('c', 56, [], [], [4, 5]);
list.lowercase('e', 56, [], [], [4]);
list.lowercase('i', 21, [2], [2]);
list.lowercase('m', 84, [2, 11], [2, 6, 11]);
list.lowercase('n', 63, [2, 8], [2, 8]);
list.lowercase('o', 63, [], [], [4, 5]);
list.lowercase('r', 42, [2], [2]);
list.lowercase('s', 49, [], [], [3, 4]);
list.lowercase('u', 63, [8], [2, 8], [3, 4]);
list.lowercase('v', 49, [], [1]);
list.lowercase('w', 84, [2, 3, 7, 8, 11], [2, 11]);
list.lowercase('x', 49, [1, 7], [1, 7]);
list.lowercase('z', 42, [2, 3, 4, 5], [2, 3, 4, 5]);

list.lowercase(' ', 49, [], []);
list.lowercase('.', 28, [], []);
list.lowercase(',', 21, [2], []);
list.lowercase(';', 28, [3], []);
list.lowercase(':', 28, [], []);
list.cap('!', 35, [], [3]);
list.cap('?', 35, [], [2, 4]);
list.lowercase('#', 77, [2, 5], [], [8]);
list.cap('/', 35, [], [5]);
list.lowercase('-', 63, [], []);
list.lowercase('_', 63, [], []);
list.lowercase('(', 35, [], []);
list.lowercase(')', 35, [], []);
list.lowercase(')', 35, [], []);
list.lowercase('"', 35, [], []);
list.lowercase("'", 21, [], []);
list.lowercase('@', 84, [], []);
list.lowercase('&', 77, [8], []);
list.lowercase('$', 70, [5], [5]);
list.lowercase('+', 63, [], []);
list.lowercase('=', 63, [], []);

list.cap('A', 63, [1, 9], [5]);
list.cap('B', 63, [2], [2]);
list.cap('C', 63, [], [], [6, 7]);
list.cap('D', 70, [2], [2]);
list.cap('E', 49, [2, 3, 4, 5], [2, 3, 4, 5, 6]);
list.cap('F', 49, [2], [2, 3, 4, 5, 6]);
list.cap('G', 84, [11], [], [7, 8]);
list.cap('H', 70, [2, 9], [2, 9]);
list.cap('I', 21, [2], [2]);
list.cap('J', 21, [1], [2]);
list.cap('K', 63, [2, 9], [2]);
list.cap('L', 49, [2, 3, 4, 5, 6], [2]);
list.cap('M', 91, [2, 7, 11], [2]);
list.cap('N', 77, [2, 10], [2, 10]);
list.cap('O', 84, [6, 7], [6, 7], [6]);
list.cap('P', 63, [2], [2]);
list.cap('Q', 84, [7], [6, 7]);
list.cap('R', 63, [2, 9], [2, 3, 4, 5]);
list.cap('S', 63, [5], [5], [4, 5]);
list.cap('T', 49, [4], [2, 3, 4, 5, 6]);
list.cap('U', 77, [6], [2, 10], [5, 6]);
list.cap('V', 56, [], [1]);
list.cap('W', 112, [], [2, 9]);
list.cap('X', 63, [1, 9], [1, 9]);
list.cap('Y', 63, [5], [1, 9]);
list.cap('Z', 70, [5], [5]);

function extractLinesFromTextNode(textNode) {
    if (textNode.nodeType !== 3) {
        throw new Error('Lines can only be extracted from text nodes.');
    }
    textNode.textContent = collapseWhiteSpace(textNode.textContent);
    let p_ = document.createDocumentFragment();
    p_.append($create('br'));
    let textContent = textNode.textContent;
    let range = document.createRange();
    let lines = [];
    let lineCharacters = [];
    let up_arr = [];
    let up_arr_tong = [];

    let down_arr_span = [];
    let down_arr_span_tong = [];
    let down_arr = [];
    let down_arr_tong = [];
    let up_arr_span = [];

    let count = 0;
    let tong = 0;
    let spancount = 0;

    lines.push((lineCharacters = []));
    up_arr_tong.push((up_arr = []));
    down_arr_span_tong.push((down_arr_span = []));
    down_arr_tong.push((down_arr = []));

    myEndFunction();

    async function myEndFunction() {
        for (let i = 0; i < textContent.length; i++) {
            range.setStart(textNode, 0);
            range.setEnd(textNode, i + 1);
            if (count != range.getClientRects().length - 1) {
                count++;
                tong = 0;
                lines.push((lineCharacters = []));
                up_arr_tong.push((up_arr = []));

                down_arr_span_tong.push((down_arr_span = []));
                down_arr_tong.push((down_arr = []));
            }

            let check = false;
            let char = list[textContent[i]];
            //
            for (let i = 1; i <= char.width; i++) {
                up_arr.push({
                    chek: false,
                    for_f: false,
                });
            }

            for (let i = 0; i < char.ps_up.length; i++) {
                up_arr[tong + char.ps_up[i] - 1].chek = true;
            }

            for (let i = 0; i < char.ps_up_for_f.length; i++) {
                up_arr[tong + char.ps_up_for_f[i] - 1].chek = true;
                up_arr[tong + char.ps_up_for_f[i] - 1].for_f = true;
            }
            // do not need to check
            if (count > 0) {
                if (char.st_up) {
                    let ua = up_arr_tong[count - 1][tong + char.vl_up - 1];
                    ua = ua == undefined ? { chek: true, for_f: true } : ua;
                    if (ua.chek) {
                        if (ua.for_f) {
                            check = textContent[i] == 'f';
                        } else {
                            check = true;
                        }
                    }
                }

                for (let i = 1; i <= char.width; i++) {
                    down_arr.push([false, char.cap]);
                }
                for (let i = 0; i < char.ps_down.length; i++) {
                    down_arr[tong + char.ps_down[i] - 1][0] = true;
                }
            } else {
                if (char.st_up) {
                    check = true;
                }
            }
            //

            if (char.st_down) {
                check = true;
            }

            // render
            if (check) {
                let span = $create('span');
                span.append(textContent[i]);
                p_.append(span);
                if (char.st_down) {
                    let tempvl = tong + char.vl_down - 1;
                    let count = spancount;
                    down_arr_span.push({ tempvl, count });
                } else {
                    up_arr_span.push(spancount);
                }
                spancount++;
            } else {
                p_.append(textContent[i]);
            }

            tong += char.width;
            lineCharacters.push(textContent.charAt(i));
        }

        let span_ = $create('span');
        span_.innerHTML = 'a';
        p_.append($create('br'), span_);
        p.innerHTML = '';
        p.append(p_);

        await wait(100);
        //descender
        const desspan = p.querySelectorAll('span');
        for (let i = 0; i < down_arr_span_tong.length - 1; i++) {
            let spans = down_arr_span_tong[i];
            let arrs = down_arr_tong[i + 1];

            for (let a = 0; a < spans.length; a++) {
                if (arrs[spans[a].tempvl] == undefined) {
                    desspan[spans[a].count].classList.add('alt');
                    continue;
                }
                if (arrs[spans[a].tempvl][0]) {
                    desspan[spans[a].count].classList.add(
                        arrs[spans[a].tempvl][1] ? 'altshort' : 'alt'
                    );
                }
            }
        }
        //ascender
        for (let i = 0; i < up_arr_span.length; i++) {
            desspan[up_arr_span[i]].classList.add('alt');
        }
        //lastline
        let spans = down_arr_span_tong[down_arr_span_tong.length - 1];
        for (let a = 0; a < spans.length; a++) {
            desspan[spans[a].count].classList.add('alt');
        }
    }
}

function collapseWhiteSpace(value) {
    return value.trim().replace(/\s+/g, ' ');
}

window.addEventListener('load', function () {
    extractLinesFromTextNode(pnode);
});

function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

function setText() {
    let text = document
        .getElementById('textareabox')
        .value.replace(/[0-9]/g, '');
    px.innerHTML =
        p.innerHTML =
        document.getElementById('textareabox').value =
            text;
    pnode = px.firstChild;
    extractLinesFromTextNode(pnode);
}

window.onresize = onresize_;
let checkrs = true;
function onresize_(e) {
    if (checkrs) {
        let spanani =
            p.querySelector('span.alt') || p.querySelector('span.altshort');
        if (spanani) {
            let spaninit = p.querySelectorAll('span');
            for (let i = 0; i < spaninit.length; i++) {
                spaninit[i].className = '';
            }
        }
        checkrs = false;
    }

    if (timeout !== null) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        extractLinesFromTextNode(pnode);
        timeout = null;
        checkrs = true;
    }, 600);
}
