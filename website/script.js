'use strict';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
// binding method
const root = document.querySelector(':root');
const proproot = getComputedStyle(root);
const getprop = proproot.getPropertyValue.bind(proproot);

// binding method
const rootstyle = root.style;
const setprop = rootstyle.setProperty.bind(rootstyle);

const nav_handle = $('#nav_handle');
const nav = $('nav');
const nav_logo = $$('.logo');
const nav_handle_size = parseInt(getprop('--nav_handle_size'));
const nav_sublinks = $$('.sublink');
const nav_trans = $('#ontransitionend');
nav_trans.ontransitionend = () => {
    nav.classList.add('anim');
};
const fonturl = getprop('--fonturl').slice(1, -1);
let nav_anim_arr = [];
let font, posarr, nav_left;
let nav_fontsz = parseFloat(getComputedStyle(nav).fontSize);
let nav_padding = parseFloat(
    getComputedStyle(nav).getPropertyValue('--nav_padding')
);
let nav_unit = nav_fontsz / (20 / 1.4);
const debounce = {
    first: true,
    timeout: null,
    _: function () {
        let this_ = this;
        if (this.first) {
            nav.classList.remove('anim', 'small');
            this.first = false;
        }

        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(function () {
            this_.timeout = null;
            this_.first = true;
            if (nav_left == 0) {
                nav_resize_small();
            } else {
                nav_resize_handle();
            }
        }, 900);
    },
};
let prevWidth = 0;
const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const width = entry.borderBoxSize?.[0].inlineSize;
        if (typeof width === 'number' && width !== prevWidth) {
            prevWidth = width;
            debounce._();
        }
    }
});

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

fetch(`${window.location.pathname.replace('index.html', '')}${fonturl}`)
    .then((res) => res.arrayBuffer())
    .then((data) => {
        font = opentype.parse(data);
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
        list.lowercase(',', 21);
        list.lowercase(';', 28);
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
        list.cap('G', 77, [10], [], [7, 8]);
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
        list.cap('Y', 77, [6], [2, 10]);
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

        readyToExecute_nav();
    });

//nav reisze
{
    interact(nav_handle)
        .draggable({
            modifiers: [
                interact.modifiers.snap({
                    targets: [
                        interact.snappers.grid({
                            x: nav_handle_size,
                            y: nav_handle_size,
                        }),
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }],
                }),
                interact.modifiers.restrictRect({
                    restriction: $('main'),
                }),
            ],
            inertia: true,
        })
        .on('dragmove', function (event) {
            nav_left =
                event.rect.left > 5.3 * nav_fontsz + nav_padding * 2
                    ? event.rect.left
                    : 0;
            setprop('--nav_left_max', `${nav_left}px`);
            setprop('--nav_top', `${event.rect.top}px`);
        });
}

function readyToExecute_nav() {
    posarr = [nav_logo[1], ...nav_sublinks].map(calcData);
    console.log(posarr);
    function calcData(elem) {
        let text = elem.innerHTML;
        let ln = text.split(' ');
        let obj = {
            nln: {
                out: {
                    asc: [],
                    des: [],
                },
                in: {
                    asc: [],
                    des: [],
                },
                tong: 0,
            },
            elem,
            text,
            ln: {
                out: {
                    asc: [],
                    des: [],
                },
                in: {
                    asc: [],
                    des: [],
                },
                tong: 0,
            },
        };

        if (ln.length > 1) {
            let tong1 = calc(ln[0], true, false, 'ln');
            let tong2 = calc(ln[1], false, true, 'ln', ln[0].length + 1);
            obj.ln.tong = tong1 > tong2 ? tong1 : tong2;
        }
        obj.nln.tong = calc(text, true, true, 'nln');
        return obj;
        function calc(text, firstline, secondline, prefix, secondextra = 0) {
            let tong = 0;
            for (let k = 0; k < text.length; k++) {
                let kern = 0;
                let string = text[k];
                let char = list[string];
                // kern
                if (k > 0) {
                    kern =
                        font.getKerningValue(
                            font.charToGlyph(text[k - 1]),
                            font.charToGlyph(string)
                        ) / 70;
                }
                tong += kern;
                if (firstline) {
                    if (char.st_up) {
                        obj[prefix].out.asc.push([tong + char.vl_up - 1, k]);
                    }
                    for (let i = 0; i < char.ps_down.length; i++) {
                        obj[prefix].in.des.push(tong + char.ps_down[i] - 1);
                    }
                }
                if (secondline) {
                    if (char.st_down) {
                        obj[prefix].out.des.push([
                            tong + char.vl_down - 1,
                            k + secondextra,
                        ]);
                    }
                    for (let i = 0; i < char.ps_up.length; i++) {
                        obj[prefix].in.asc.push(tong + char.ps_up[i] - 1);
                    }
                }
                tong += char.width;
            }
            return tong;
        }
    }
    nav_resize_handle();
    resizeObserver.observe(nav);
}

function nav_resize_handle() {
    for (let i = 0; i < posarr.length; i++) {
        posarr[i].elem.innerHTML = posarr[i].text;
    }
    let tongtrans = 0;
    nav_anim_arr = [];
    let navw = Math.floor(nav_trans.getBoundingClientRect().width / nav_unit);
    for (let i = 1; i < posarr.length; i++) {
        calcPos(i);
    }
    nav_trans.classList.toggle('trans');

    async function calcPos(index) {
        let prefix = {
            last:
                posarr[index - 1].elem.clientHeight > nav_fontsz ? 'ln' : 'nln',
            curr: posarr[index].elem.clientHeight > nav_fontsz ? 'ln' : 'nln',
        };
        let objlast = posarr[index - 1][prefix.last].out.des;
        let objcurr = posarr[index][prefix.curr].in.des;
        let objcurrw = posarr[index][prefix.curr].tong;
        let [indes, outdes] = outindes();
        let translateby = outdes[0] + tongtrans - indes;
        posarr[
            index
        ].elem.style.left = `calc(${translateby} * var(--nav_unit))`;
        tongtrans = translateby;
        // render
        {
            let elemlast = posarr[index - 1].elem;
            let elemlast_text = posarr[index - 1].text;
            elemlast.innerHTML = '';
            let firsthalf =
                outdes[1] == 0 ? '' : elemlast_text.substring(0, outdes[1]);
            let secondhalf =
                outdes[1] == elemlast_text.length - 1
                    ? ''
                    : elemlast_text.substring(
                          outdes[1] + 1,
                          elemlast_text.length
                      );
            let i = outdes[1];
            let kernl = 0,
                kernr = 0;
            if (i > 0) {
                kernl =
                    font.getKerningValue(
                        font.charToGlyph(elemlast_text[i - 1]),
                        font.charToGlyph(elemlast_text[i])
                    ) / 70;
            }
            if (i < elemlast_text.length - 1) {
                kernr =
                    font.getKerningValue(
                        font.charToGlyph(elemlast_text[i]),
                        font.charToGlyph(elemlast_text[i + 1])
                    ) / 70;
            }
            let span = $create('span');
            span.innerHTML = elemlast_text[i];
            span.style.marginLeft = `calc(${kernl} * var(--nav_unit))`;
            span.style.marginRight = `calc(${kernr} * var(--nav_unit))`;
            nav_anim_arr.push(span);
            elemlast.append(firsthalf, span, secondhalf);
        }

        function outindes() {
            let index_end = null,
                index_start = null,
                outdes_i = 0,
                pass = true;
            //end
            while (pass) {
                for (let i = 0; i < objcurr.length; i++) {
                    if (objcurr[i] <= objlast[outdes_i][0] + tongtrans) {
                        index_end = i;
                        /*
                        if (objcurr[i] + tongtrans < 0.4 * navw) {
                            break;
                        }*/
                    } else {
                        break;
                    }
                }

                if (index_end == null) {
                    if (outdes_i < objlast.length - 1) {
                        outdes_i++;
                    } else {
                        index_end = 0;
                        pass = false;
                    }
                } else if (
                    outdes_i < objlast.length - 1 &&
                    objcurr[0] <= objlast[outdes_i + 1][0] + tongtrans &&
                    objlast[outdes_i + 1][0] + tongtrans - objcurr[0] <=
                        navw - objcurrw - 40
                ) {
                    outdes_i++;
                } else {
                    pass = false;
                }
            }
            //start
            for (let i = index_end; i >= 0; i--) {
                if (
                    objlast[outdes_i][0] + tongtrans - objcurr[i] <=
                    navw - objcurrw - 40
                ) {
                    index_start = i;
                } else {
                    break;
                }
            }
            if (index_start == null) {
                index_start = index_end;
            }
            //return
            return [
                objcurr[getRandomInteger(index_start, index_end)],
                objlast[outdes_i],
            ];
        }
    }
}

function nav_resize_small() {
    nav.classList.add('small');
    posarr[0].elem.append($create('br'), $create('br'));
    for (let i = 1; i < posarr.length; i++) {
        posarr[i].elem.innerHTML = posarr[i].text[0];
    }
}

function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
