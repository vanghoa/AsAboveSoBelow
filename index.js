'use strict';
// 'b,d,f,h,k,l,t';
// 'g,j,p,q,y';
// binding method

const divx = $('#viewer div');
const div = $$('#viewer div')[1];
const viewer = $('#viewer');
let resizecheck = true;
//let pnode = px.firstChild;
let timeout = null;
let ready = 0;
let unit =
    parseFloat(getComputedStyle(document.documentElement).fontSize) /
    (20 / 1.4);
setprop('--unit', `${unit}px`);
const scrollbarwidth = getScrollbarWidth();
const stylecopy = (width) => `
    @font-face {
        font-family: 'asabovesobelow';
        src: url('${window.location.href.replace('index.html', '')}${fonturl}');
    }

    :root {
        --unit: ${unit}px;
    }

    * {
        box-sizing: border-box;
        font-family: asabovesobelow;
        font-size: 20px;
        line-height: 3.64em;
        margin: 0;
        padding: 0;
        font-variation-settings: 'wght' 0;
        color: white;
        font-kerning: normal;
    }

    body {
        background-color: black;
    }

    p {
        width: ${width};
    }

    span {
        transition: font-variation-settings 0.5s;
        font-variation-settings: 'wght' 0;
        font-kerning: none;
    }

    span.alt {
        font-variation-settings: 'wght' 100;
    }

    span.altshort {
        font-variation-settings: 'wght' 90;
    }
`;
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
            width: font.charToGlyph(letter).advanceWidth / 70,
            width_: width / 7,
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

    this.cap = function (
        letter,
        width,
        ps_up = [],
        ps_down = [],
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
            true,
            ps_up_for_f
        );
    };

    this.lowercase = function (
        letter,
        width,
        ps_up = [],
        ps_down = [],
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

buffer.then((data) => {
    font = opentype.parse(data);
    /*
    let glyphA = font.charToGlyph('r');
    let glyphV = font.charToGlyph('e');
    console.log();
    font.getKerningValue(font.charToGlyph('r'), font.charToGlyph('e'))/10
    */
    // ascender
    list.as('b', 70, [2], [], 2, [5]);
    list.as('d', 70, [9], [], 9, [5]);
    list.as('f', 35, [3], [], 4);
    list.as('h', 63, [2, 8], [], 2);
    list.as('k', 56, [2, 8], [], 2);
    list.as('l', 21, [2], [], 2);
    // descender
    list.des('g', 70, [], [9], 8);
    list.des('j', 21, [], [2], 1);
    list.des('p', 70, [], [2], 2, [5]);
    list.des('q', 70, [], [9], 9, [5]);
    list.des('y', 63, [], [2, 8], 8, [3]);
    list.des('t', 35, [], [3], 3);
    // lowercase
    list.lowercase('a', 56, [7], [], [3, 4]);
    list.lowercase('c', 56, [], [], [4, 5]);
    list.lowercase('ç', 56);
    list.lowercase('e', 56, [], [], [4]);
    list.lowercase('é', 56, [], [], [4]);
    list.lowercase('ê', 56, [], [], [4]);
    list.lowercase('è', 56, [], [], [4]);
    list.lowercase('i', 21, [2], [2]);
    list.lowercase('m', 84, [2, 11], [2]);
    list.lowercase('n', 63, [2, 8], [2]);
    list.lowercase('ñ', 63, [2, 8], [2]);
    list.lowercase('o', 63, [], [], [4, 5]);
    list.lowercase('r', 42, [2], [2]);
    list.lowercase('s', 49, [], [], [5]);
    list.lowercase('u', 63, [8], [2, 8], [3, 4]);
    list.lowercase('ü', 63, [8], [], [3, 4]);
    list.lowercase('v', 49, [], [1]);
    list.lowercase('w', 84, [], [1, 6]);
    list.lowercase('x', 49, [7], [1]);
    list.lowercase('z', 49);
    // punctuation
    list.lowercase(' ', 49);
    list.lowercase('.', 28);
    list.lowercase(',', 21, [2], []);
    list.lowercase(';', 28, [3], []);
    list.lowercase(':', 28);
    list.cap('!', 35, [], [3]);
    list.cap('?', 49, [], [3, 5]);
    list.lowercase('#', 77, [2, 5], [], [8]);
    list.cap('/', 35, [], [5]);
    list.lowercase('-', 56);
    list.lowercase('–', 63);
    list.lowercase('—', 84);
    list.lowercase('_', 63);
    list.lowercase('(', 35);
    list.lowercase(')', 35);
    list.lowercase(']', 35);
    list.lowercase('[', 35);
    list.lowercase('"', 35);
    list.lowercase('“', 35);
    list.lowercase('”', 35);
    list.lowercase("'", 21);
    list.lowercase('’', 21);
    list.lowercase('‘', 21);
    list.lowercase('@', 84);
    list.lowercase('&', 77, [8], []);
    list.lowercase('$', 70, [5], [5]);
    list.lowercase('+', 63);
    list.lowercase('=', 63);
    list.lowercase('>', 63);
    list.lowercase('<', 63);
    list.lowercase('~', 56);
    list.lowercase('^', 42);
    //cap
    list.cap('A', 63, [9], [5]);
    list.cap('B', 63, [2]);
    list.cap('C', 63, [], [], [6, 7]);
    list.cap('D', 77, [2]);
    list.cap('E', 49, [2], []);
    list.cap('F', 49, [2], []);
    list.cap('G', 84, [11], [], [7, 8]);
    list.cap('H', 70, [2, 9], [2, 9]);
    list.cap('I', 21, [2], [2]);
    list.cap('J', 21, [], [2]);
    list.cap('K', 63, [2, 9], [2]);
    list.cap('L', 49, [], [2]);
    list.cap('M', 91, [2, 7, 11], [2]);
    list.cap('N', 77, [2, 10], [2, 10]);
    list.cap('O', 84, [], [], [6, 7]);
    list.cap('P', 63, [2], []);
    list.cap('Q', 84, [7], [], [6]);
    list.cap('R', 63, [2, 9], []);
    list.cap('S', 63, [], [], [4, 5, 6]);
    list.cap('T', 63, [5], []);
    list.cap('U', 77, [], [2, 10], [5, 6]);
    list.cap('V', 56, [], [1]);
    list.cap('W', 105, [], [1, 8]);
    list.cap('X', 63, [9], [1]);
    list.cap('Y', 63, [5], [1, 9]);
    list.cap('Z', 70, [], []);
    // number
    list.lowercase('0', 56, [], [], [4, 5]);
    list.lowercase('1', 21, [2]);
    list.cap('2', 49);
    list.lowercase('3', 42);
    list.lowercase('4', 49);
    list.cap('5', 49);
    list.cap('6', 56, [], [], [4]);
    list.lowercase('7', 49);
    list.cap('8', 63);
    list.lowercase('9', 63);

    for (const i in list) {
        if (list[i].width) {
            if (list[i].width != list[i].width_) {
                console.log(i, list[i].width, list[i].width_);
            }
        }
    }

    readyToExecute();
});

window.addEventListener('load', readyToExecute);

function readyToExecute() {
    if (++ready == 2) {
        extractLinesFromTextNode();
    }
}

async function extractLinesFromTextNode() {
    await wait(200);
    div.innerHTML = '';

    let parr = divx.querySelectorAll('p');
    let up_arr_prev = [];
    let down_arr_span_prev = [];
    let render_arr_arr = [];

    for (let i = 0; i < parr.length; i++) {
        let textNode = parr[i].firstChild;
        if (textNode.nodeType !== 3) {
            throw new Error('Lines can only be extracted from text nodes.');
        }
        textNode.textContent = collapseWhiteSpace(textNode.textContent);
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
        let all_span = [];

        let count = 0;
        let tong = 0;
        let spancount = 0;

        let render_arr = [[]];

        let textconsole = [''];
        let baretxt = '';

        lines.push((lineCharacters = []));
        up_arr_tong.push((up_arr = []));
        down_arr_span_tong.push((down_arr_span = []));
        down_arr_tong.push((down_arr = []));

        render_arr_create();

        //console.log(textconsole);

        render_arr_arr.push(render_arr);
        up_arr_prev = up_arr_tong[up_arr_tong.length - 1];
        down_arr_span_prev = down_arr_span_tong[down_arr_span_tong.length - 1];

        function render_arr_create() {
            //main area
            for (let i = 0; i < textContent.length; i++) {
                range.setStart(textNode, 0);
                range.setEnd(textNode, i + 1);
                if (count != range.getClientRects().length - 1) {
                    count++;
                    textconsole[count] = '';
                    tong = 0;
                    lines.push((lineCharacters = []));
                    up_arr_tong.push((up_arr = []));

                    down_arr_span_tong.push((down_arr_span = []));
                    down_arr_tong.push((down_arr = []));

                    render_arr.push([]);
                }
                let check = false;
                let string = textContent[i];
                let char = list[string];
                let kern = 0;
                let kernr = 0;
                if (tong != 0) {
                    kern =
                        font.getKerningValue(
                            font.charToGlyph(textContent[i - 1]),
                            font.charToGlyph(string)
                        ) / 70;
                }
                if (i + 1 < textContent.length) {
                    kernr =
                        font.getKerningValue(
                            font.charToGlyph(string),
                            font.charToGlyph(textContent[i + 1])
                        ) / 70;
                }
                tong += kern;
                //
                textconsole[count] += string;
                // do not need to check
                if (char.st_up) {
                    let ua =
                        count > 0
                            ? up_arr_tong[count - 1][tong + char.vl_up - 1]
                            : up_arr_prev[tong + char.vl_up - 1]; // + kern
                    ua = ua == undefined ? { chek: true, for_f: false } : ua;
                    if (ua.chek) {
                        if (ua.for_f) {
                            check = string == 'f';
                        } else {
                            check = true;
                        }
                    }
                }
                //

                if (char.st_down) {
                    check = true;
                }

                // render_arr
                if (check) {
                    let span = $create('span');
                    span.append(string);
                    span.wght = 'alt';
                    span.style.marginLeft = `calc(${kern} * var(--unit))`;
                    span.style.marginRight = `calc(${kernr} * var(--unit))`;
                    if (char.st_down) {
                        let tempvl = tong + char.vl_down - 1;
                        //let count = spancount;
                        down_arr_span.push({
                            tempvl,
                            count: spancount,
                            nested1: count,
                            nested2:
                                baretxt == ''
                                    ? render_arr[count].length
                                    : render_arr[count].length + 1,
                        });
                    }

                    if (baretxt == '') {
                        render_arr[count].push(span);
                        //p_.append(span);
                    } else {
                        render_arr[count].push(baretxt, span);
                        //p_.append(baretxt, span);
                    }

                    baretxt = '';
                    spancount++;
                } else {
                    baretxt += string;
                    //p_.append(string);
                }

                // + kern
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
                // + kern
                for (let i = 1; i <= char.width; i++) {
                    down_arr.push([false, char.cap]);
                }
                for (let i = 0; i < char.ps_down.length; i++) {
                    down_arr[tong + char.ps_down[i] - 1][0] = true;
                }
                // + kern

                tong += char.width;
                lineCharacters.push(textContent.charAt(i));
            }
            if (baretxt !== '') {
                render_arr[count].push(baretxt);
            }

            //spacing below
            let descenderlength = down_arr_span_tong.length;
            if (i == parr.length - 1) {
                let span_ = $create('span');
                span_.innerHTML = 'a';
                span_.style.visibility = 'hidden';
                render_arr[count].push($create('br'), span_);
                descenderlength--;
            }

            //descender_prev
            {
                let spans = down_arr_span_prev;
                let arrs = down_arr_tong[0];
                let render_arr = render_arr_arr[render_arr_arr.length - 1];
                for (let a = 0; a < spans.length; a++) {
                    if (arrs[spans[a].tempvl] == undefined) {
                        render_arr[spans[a].nested1][spans[a].nested2].wght =
                            'alt';
                    } else if (arrs[spans[a].tempvl][0]) {
                        render_arr[spans[a].nested1][spans[a].nested2].wght =
                            arrs[spans[a].tempvl][1] ? 'altshort' : 'alt';
                    } else {
                        render_arr[spans[a].nested1][spans[a].nested2] =
                            render_arr[spans[a].nested1][
                                spans[a].nested2
                            ].innerHTML;
                    }
                }
            }
            //descender
            for (let i = 0; i < descenderlength; i++) {
                let spans = down_arr_span_tong[i];
                let arrs = down_arr_tong[i + 1];

                for (let a = 0; a < spans.length; a++) {
                    if (i == down_arr_span_tong.length - 1) {
                        continue;
                    } else if (arrs[spans[a].tempvl] == undefined) {
                        render_arr[spans[a].nested1][spans[a].nested2].wght =
                            'alt';
                    } else if (arrs[spans[a].tempvl][0]) {
                        render_arr[spans[a].nested1][spans[a].nested2].wght =
                            arrs[spans[a].tempvl][1] ? 'altshort' : 'alt';
                    } else {
                        render_arr[spans[a].nested1][spans[a].nested2] =
                            render_arr[spans[a].nested1][
                                spans[a].nested2
                            ].innerHTML;
                    }
                }
            }
        }
    }

    // fully render
    for (let x = 0; x < render_arr_arr.length; x++) {
        let p_ = $create('p');
        //spacing above
        if (x == 0 || render_arr_arr[x][0].length == 0) {
            p_.append($create('br'));
        }
        for (let i = 0; i < render_arr_arr[x].length; i++) {
            let baretxt = '';
            for (let k = 0; k < render_arr_arr[x][i].length; k++) {
                if (typeof render_arr_arr[x][i][k] == 'string') {
                    baretxt += render_arr_arr[x][i][k];
                } else {
                    if (baretxt == '') {
                        p_.append(render_arr_arr[x][i][k]);
                    } else {
                        p_.append(baretxt, render_arr_arr[x][i][k]);
                    }
                    baretxt = '';
                }
            }
            if (baretxt != '') {
                p_.append(baretxt);
            }
        }
        div.append(p_);
    }

    // animation
    await wait(100);
    let allspan = viewer.querySelectorAll('span');
    for (let i = 0; i < allspan.length; i++) {
        allspan[i].classList.add(allspan[i].wght);
    }
    //
    if (resizecheck) {
        resizeObserver.observe(viewer);
        resizecheck = false;
    }
}

function collapseWhiteSpace(value) {
    return value.trim().replace(/\s+/g, ' ');
}

function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}

async function setText() {
    resizeObserver.disconnect();
    resizecheck = true;
    //console.log(document.getElementById('textareabox').value);
    let text = document
        .getElementById('textareabox')
        .value.replace(/[%*{}]/g, '');
    document.getElementById('textareabox').value = text;
    //
    let textarr = text.split('\n');
    divx.innerHTML = '';
    for (let i = 0; i < textarr.length; i++) {
        let p__ = $create('p');
        let textnode = document.createTextNode(textarr[i]);
        p__.appendChild(textnode);
        divx.append(p__);
    }

    extractLinesFromTextNode();
}

//window.onresize = onresize_;
const resizeObserver = new ResizeObserver(onresize_);

let checkrs = true;
function onresize_() {
    if (checkrs) {
        let spanani =
            div.querySelector('span.alt') || div.querySelector('span.altshort');
        if (spanani) {
            let spaninit = div.querySelectorAll('span');
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
        extractLinesFromTextNode();
        timeout = null;
        checkrs = true;
    }, 600);
}

function pdfprint() {
    let wh = div.getBoundingClientRect();
    let WinPrint = window.open(
        '',
        '',
        `left=0,top=0,width=${wh.width + scrollbarwidth + 20},height=${
            wh.height
        },toolbar=0,scrollbars=0,status=0`
    );
    let style = $create('style');
    style.innerHTML = stylecopy(wh.width);
    WinPrint.document.head.append(style);
    WinPrint.document.body.innerHTML = div.outerHTML;
    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(() => {
        WinPrint.print();
        WinPrint.close();
    }, 1000);
}

function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}
