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
const nav_numth = 5;
nav_trans.ontransitionend = async function () {
    nav.classList.add('anim');
    await wait(500);
    nav.classList.toggle('help');
};
const fonturl = getprop('--fonturl').slice(1, -1);
//let nav_anim_arr = [];
let font, posarr, nav_left;
let nav_fontsz = parseFloat(getComputedStyle(nav).fontSize);
let nav_padding =
    parseFloat(getComputedStyle(nav).getPropertyValue('--nav_padding')) *
    nav_fontsz;
let nav_unit = nav_fontsz / (20 / 1.4);
let nav_tongtrans = [0, 0];
const debounce = {
    first: true,
    timeout: null,
    _: function () {
        let this_ = this;
        if (this.first) {
            nav.classList.remove('anim', 'small');
            posarr[nav_numth + 1].elem.classList.remove('dropdown');
            this.first = false;
        }

        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(function () {
            this_.timeout = null;
            this_.first = true;
            if (
                nav_trans.getBoundingClientRect().width <
                0.6 * nav_fontsz + nav_padding * 2
            ) {
                nav_resize_small();
            } else {
                nav.classList[
                    nav_trans.getBoundingClientRect().width <
                    12.3 * nav_fontsz + nav_padding * 2
                        ? 'add'
                        : 'remove'
                ]('medium');
                nav_resize_handle();
            }
        }, 300);
    },
};
// resizeobserver
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

// data
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
        list.lowercase('&nbsp;', 49);
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
        list.lowercase('|', 35, [3], [3]);
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
                event.rect.left > 3.5 * nav_fontsz + nav_padding * 2
                    ? event.rect.left
                    : 0;
            setprop('--nav_left_max', `${nav_left}px`);
            setprop('--nav_top', `${event.rect.top}px`);
        });
}

onresize = () => {
    nav_fontsz = parseFloat(getComputedStyle(nav).fontSize);
    nav_padding =
        parseFloat(getComputedStyle(nav).getPropertyValue('--nav_padding')) *
        nav_fontsz;
    nav_unit = nav_fontsz / (20 / 1.4);
};

function readyToExecute_nav() {
    let span2_;
    let checkfirst = 0;
    let modelarr = [
        'A: Adversaries',
        'B: Orchid Mantis',
        'C: Marrow Codex',
        'D: 黑科技',
        'E: Nomad Lexis ',
    ];
    let modelurl = [
        'https://formandagency.vercel.app/modelA',
        'https://formandagency.vercel.app/modelB',
        'https://formandagency.vercel.app/modelC',
        'https://formandagency.vercel.app/modelD',
        'https://formandagency.vercel.app/modelE',
    ];
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
            ascspan: [],
            desspan: [],
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
            let tong2 = calc(ln[1], false, true, 'ln', tong1[1])[0];
            obj.ln.tong = tong1[0] > tong2 ? tong1[0] : tong2;
        }
        //
        let baretxt = '';
        let span1 = $create('span');
        if (checkfirst == 0) {
            let spang = $create('span');
            spang.classList.add('mark');
            spang.innerHTML = 'g';
            let spany = $create('span');
            spany.classList.add('mark', 'y');
            spany.innerHTML = 'y';
            span1.append(
                'a',
                spang,
                'enc',
                spany,
                $create('br'),
                $create('br')
            );
        } else {
            span1.innerHTML = text[0];
        }
        let span2 = $create('span');
        obj.nln.tong = calc(text, true, true, 'nln')[0]; //
        span2.append(baretxt);
        elem.innerHTML = '';
        elem.append(span1, span2);
        if (checkfirst == nav_numth + 1) {
            span2_ = span2;
            span2.onclick = modeldrop;
            let modelspan = Array.from(modelarr, (x, k) => {
                let a = $create('a');
                a.target = '_blank';
                a.href = modelurl[k];
                let span_ = $create('span');
                span_.innerHTML = `model ${x[0]}`;
                let span__ = $create('span');
                span__.innerHTML = x.substring(1);
                a.append(span_, span__);
                a.classList.add('model');
                return a;
            });
            elem.append(...modelspan);
        }
        //
        checkfirst++;
        return obj;
        //
        function calc(text, firstline, secondline, prefix, extra = [0, 0]) {
            let render = firstline && secondline;
            let tong = 0;
            //
            let [asc_count, des_count] = extra;
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
                        obj[prefix].out.asc.push([
                            tong + char.vl_up - 1,
                            asc_count,
                        ]);
                    }
                    for (let i = 0; i < char.ps_down.length; i++) {
                        obj[prefix].in.des.push(tong + char.ps_down[i] - 1);
                    }
                }
                if (secondline) {
                    if (char.st_down) {
                        obj[prefix].out.des.push([
                            tong + char.vl_down - 1,
                            des_count,
                        ]);
                    }
                    for (let i = 0; i < char.ps_up.length; i++) {
                        obj[prefix].in.asc.push(tong + char.ps_up[i] - 1);
                    }
                }
                if (render) {
                    if (char.st_up) {
                        obj.ascspan.push(render_('asc'));
                    } else if (char.st_down) {
                        obj.desspan.push(render_('des'));
                    } else {
                        baretxt += string;
                    }
                    function render_(class_) {
                        let kernl = 0,
                            kernr = 0;
                        if (k > 0) {
                            kernl =
                                font.getKerningValue(
                                    font.charToGlyph(text[k - 1]),
                                    font.charToGlyph(text[k])
                                ) / 70;
                        }
                        if (k < text.length - 1) {
                            kernr =
                                font.getKerningValue(
                                    font.charToGlyph(text[k]),
                                    font.charToGlyph(text[k + 1])
                                ) / 70;
                        }
                        let span = $create('span');
                        span.innerHTML = text[k];
                        span.style.marginLeft = `calc(${kernl} * var(--nav_unit))`;
                        span.style.marginRight = `calc(${kernr} * var(--nav_unit))`;
                        span.classList.add(class_, 'mark');
                        span2.append(baretxt, span);
                        baretxt = '';
                        return span;
                    }
                }
                tong += char.width;
                asc_count += char.st_up ? 1 : 0;
                des_count += char.st_down ? 1 : 0;
            }
            return [tong, [asc_count, des_count]];
        }
    }
    //nav_resize_handle();
    resizeObserver.observe(nav);
}

function nav_resize_handle() {
    let tongtrans = 0;
    let navw = Math.floor(nav_trans.getBoundingClientRect().width / nav_unit);
    for (let i = 0; i < posarr.length; i++) {
        posarr[i].desspan.forEach((elem) => {
            elem.classList.remove('alt');
        });
        posarr[i].ascspan.forEach((elem) => {
            elem.classList.remove('alt');
        });
    }
    for (let i = 1; i < posarr.length; i++) {
        calcPos(i);
    }
    nav_trans.classList.toggle('trans');

    async function calcPos(index) {
        let prefix = {
            last:
                posarr[index - 1].elem.children[1].clientHeight > nav_fontsz + 2
                    ? 'ln'
                    : 'nln',
            curr:
                posarr[index].elem.children[1].clientHeight > nav_fontsz + 2
                    ? 'ln'
                    : 'nln',
        };
        let objcurrw = posarr[index][prefix.curr].tong;
        //
        let objlast = posarr[index - 1][prefix.last].out.des;
        let objcurr = posarr[index][prefix.curr].in.des;
        let objlast_as = posarr[index - 1][prefix.last].in.asc;
        let objcurr_as = posarr[index][prefix.curr].out.asc;
        //
        let ascORdes = objcurr_as.length > 0 && Math.random() > 0.5;
        let ascForce = false;
        ascORdes = objlast.length > 0 ? ascORdes : (ascForce = true);
        //console.log(ascForce);
        let inasc, outasc, indes, outdes, ascpass;
        if (ascORdes) {
            [ascpass, inasc, outasc] = outinasc_(
                objlast_as,
                objcurr_as,
                navw,
                objcurrw,
                tongtrans,
                !ascForce
            );
            if (!ascpass) {
                [indes, outdes] = outindes();
                ascORdes = false;
            }
        } else {
            [indes, outdes] = outindes();
        }
        //
        let translateby =
            (ascORdes ? inasc - outasc[0] : outdes[0] - indes) + tongtrans;
        //let translateby = outdes[0] + tongtrans - indes;
        posarr[
            index
        ].elem.style.left = `calc(${translateby} * var(--nav_unit))`;
        if (index == nav_numth + 1) {
            nav_tongtrans = tongtrans;
        }
        tongtrans = translateby;
        // render
        if (ascORdes) {
            posarr[index]['ascspan'][outasc[1]].classList.add('alt');
        } else {
            posarr[index - 1]['desspan'][outdes[1]].classList.add('alt');
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
    for (let i = 1; i < posarr.length; i++) {
        posarr[i].elem.style.left = '';
    }
}

function outinasc_(
    objlast_as,
    objcurr_as,
    navw,
    objcurrw,
    tongtrans,
    ascchk = true
) {
    let index_end = null,
        index_start = null,
        outas_i = objcurr_as.length - 1,
        pass = true;
    //start
    while (pass) {
        for (let i = objlast_as.length - 1; i >= 0; i--) {
            if (objlast_as[i] + tongtrans >= objcurr_as[outas_i][0]) {
                index_end = i;
            } else {
                break;
            }
        }

        if (index_end == null) {
            if (outas_i > 0) {
                outas_i--;
            } else {
                index_end = objlast_as.length - 1;
                pass = false;
                if (ascchk) {
                    return [false, 0, 0];
                }
            }
        } else if (
            outas_i > 0 &&
            objlast_as[0] + tongtrans >= objcurr_as[outas_i - 1][0] &&
            objlast_as[0] + tongtrans - objcurr_as[outas_i - 1][0] <=
                navw - objcurrw - 40
        ) {
            outas_i--;
        } else {
            pass = false;
        }
    }
    //end
    for (let i = index_end; i < objlast_as.length; i++) {
        if (
            objlast_as[i] + tongtrans - objcurr_as[outas_i][0] <=
            navw - objcurrw - 40
        ) {
            index_start = i;
        } else {
            break;
        }
    }
    if (index_start == null) {
        index_start = index_end;
        if (ascchk) {
            return [false, 0, 0];
        }
    }
    //return
    return [
        true,
        objlast_as[getRandomInteger(index_end, index_start)],
        objcurr_as[outas_i],
    ];
}

async function modeldrop() {
    let span2 = this.parentElement;
    if (!span2.classList.contains('dropdown')) {
        for (let i = posarr.length - 2; i < posarr.length; i++) {
            posarr[i].desspan.forEach((elem) => {
                elem.classList.remove('alt');
            });
            if (i == posarr.length - 1) {
                posarr[i].ascspan.forEach((elem) => {
                    elem.classList.remove('alt');
                });
            }
        }
        let prefix =
            posarr[nav_numth].elem.children[1].clientHeight > nav_fontsz + 2
                ? 'ln'
                : 'nln';
        let objlast_as = posarr[nav_numth][prefix].in.asc;
        let objcurr_as = posarr[nav_numth + 1].nln.out.asc;
        let [ascpass, inasc, outasc] = outinasc_(
            objlast_as,
            objcurr_as,
            Math.floor(nav_trans.getBoundingClientRect().width / nav_unit),
            posarr[nav_numth + 1].nln.tong + 123,
            nav_tongtrans,
            false
        );
        let translateby = inasc - outasc[0] + nav_tongtrans;
        posarr[
            nav_numth + 1
        ].elem.style.left = `calc(${translateby} * var(--nav_unit))`;
        posarr[nav_numth + 1]['ascspan'][outasc[1]].classList.add('alt');
        //
        span2.classList.add('show');
        await wait(50);
        span2.classList.add('dropdown');
    } else {
        span2.classList.remove('dropdown');
        await wait(1050);
        span2.classList.remove('show');
    }
    await wait(500);
    nav.classList.toggle('help');
    //
}

function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
