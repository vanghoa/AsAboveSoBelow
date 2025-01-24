var myDoc = app.activeDocument;
var selection = myDoc.selection;
var execCount = 0;
const vLigDes = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const oLigDes = [1, 14, 27, 41, 55, 68, 82, 97];
const vLigCap = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
const oLigCap = [2, 13, 24, 35, 47, 57, 69, 80];

if (selection.length > 0) {
    var code = {};
    var list = new (function () {
        this._construct = function (
            varter,
            width,
            ps_up,
            ps_down,
            st_up,
            vl_up,
            st_down,
            vl_down,
            cap,
            ps_up_for_f,
            charcode
        ) {
            ps_up = ps_up == undefined ? [] : ps_up;
            ps_down = ps_down == undefined ? [] : ps_down;
            st_up = st_up == undefined ? false : st_up;
            vl_up = vl_up == undefined ? 0 : vl_up;
            st_down = st_down == undefined ? false : st_down;
            vl_down = vl_down == undefined ? 0 : vl_down;
            cap = cap == undefined ? false : cap;
            ps_up_for_f = ps_up_for_f == undefined ? [] : ps_up_for_f;
            charcode = charcode == undefined ? varter.charCodeAt(0) : charcode;
            code[charcode] = this[varter] = {
                width: width / 7,
                //width_: width / 7,
                ps_up: ps_up, //(o duoi)
                ps_down: ps_down, //(o tren)
                st_up: st_up,
                vl_up: vl_up,
                st_down: st_down,
                vl_down: vl_down,
                cap: cap,
                ps_up_for_f: ps_up_for_f,
            };
        };

        this.as = function (varter, width, ps_up, ps_down, vl, ps_up_for_f) {
            this._construct(
                varter,
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

        this.des = function (varter, width, ps_up, ps_down, vl, ps_up_for_f) {
            this._construct(
                varter,
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

        this.cap = function (varter, width, ps_up, ps_down, ps_up_for_f) {
            this._construct(
                varter,
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

        this.lowercase = function (varter, width, ps_up, ps_down, ps_up_for_f) {
            this._construct(
                varter,
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

        this.code = function (
            code,
            varter,
            width,
            ps_up,
            ps_down,
            ps_up_for_f
        ) {
            this._construct(
                varter,
                width,
                ps_up,
                ps_down,
                false,
                0,
                false,
                0,
                false,
                ps_up_for_f,
                code
            );
        };

        return this;
    })();

    //font width and stem pos
    {
        list.as('b', 70, [2], [2], 2, [5]);
        list.as('d', 70, [9], [9], 9, [5]);
        list.as('f', 35, [3], [], 4);
        list.as('h', 63, [2, 8], [2], 2);
        list.as('k', 56, [2, 8], [2], 2);
        list.as('l', 21, [2], [2], 2);
        // descender
        list.des('g', 70, [], [9], 8);
        list.des('j', 21, [], [2], 1);
        list.des('p', 70, [2], [2], 2, [5]);
        list.des('q', 70, [9], [9], 9, [5]);
        list.des('y', 63, [8], [2, 8], 8, [3]);
        list.des('t', 35, [3], [3], 3);
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
        list.lowercase('(', 35);
        list.lowercase(')', 35);
        list.lowercase(']', 35);
        list.lowercase('[', 35);
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
        // line break
        list.lowercase('\n', 0);
        list.lowercase('\r', 0);
        // code for punctuation
        list.lowercase('"', 35);
        list.code(8221, '“', 35);
        list.code(8220, '”', 35);
        list.lowercase("'", 21);
        list.code(8217, '’', 21);
        list.code(8216, '‘', 21);
        list.lowercase('-', 56);
        list.code(8211, '–', 63);
        list.code(8212, '—', 84);
        list.lowercase('_', 63);
        //
    }

    for (var _ = 0; _ < selection.length; _++) {
        var checkexecute = true;
        var target = selection[_];

        if (target instanceof Text) {
            target = target.parentTextFrames[0];
        }

        if (!(target instanceof TextFrame)) {
            continue;
        }

        // Retrieve the font name
        var text = target.parentStory.texts[0];
        if (text.length == 0) {
            continue;
        }
        var font_fam = text.appliedFont.fontFamily;
        if (font_fam.indexOf('As Above, So Below') == -1) {
            checkexecute = false;
            alert(
                'There is a text frame that does not have "As Above, So Below" in its name. Please change.'
            );
            continue;
        }

        var textconsole = [''];
        var leading = text.leading;
        var leadingUnit =
            leading === Leading.AUTO
                ? (text.autoLeading * text.pointSize) / 100
                : leading;

        //var alt = app.fonts.itemByName(font_fam + '	Ligature Lower'); // --lig
        //var altshort = app.fonts.itemByName(font_fam + '	Ligature Upper'); // --lig_cap
        var regular = app.fonts.itemByName(font_fam + '	Neutral');
        // --lig_des
        // letter t calc(var(--lig) + var(--lig_extra));
        // letter t calc(var(--lig_cap) + var(--lig_extra));
        var lh = leadingUnit / (3.64 * text.pointSize);
        var lig = clamp(getLig(lh));
        var ligdes = clamp(getLigAlt(lh, vLigDes, oLigDes));
        var ligcap = clamp(getLigAlt(lh, vLigCap, oLigCap));
        var ligcapt = clamp(ligcap + 9);
        var ligt = clamp(lig + 9);

        target.parentStory.tracking = 0;
        if (target.overflows == true) {
            target.fit(FitOptions.FRAME_TO_CONTENT);
            text.leading = 0;
            /*
            checkexecute = false;
            alert(
                'resize the frame so that there is no text overset & try again'
            );
            continue;*/
        }
        for (var i = 0; i < target.lines.length; i++) {
            for (var k = 0; k < target.lines[i].contents.length; k++) {
                var charcode = target.lines[i].contents.charCodeAt(k);
                var stringfromcode = String.fromCharCode(charcode);
                if (
                    list[stringfromcode] == undefined &&
                    code[charcode] == undefined
                ) {
                    checkexecute = false;
                    alert(
                        'text includes unsupported glyph: "' +
                            stringfromcode +
                            '" (character code: ' +
                            charcode +
                            ') at line ' +
                            (i + 1) +
                            ', character number ' +
                            (k + 1)
                    );
                }
            }
        }
        if (checkexecute) {
            target.parentStory.appliedFont = regular;
            if (target.overflows == true) {
                // target.fit(FitOptions.FRAME_TO_CONTENT); should not be possible?
                alert(
                    'text is too long :( please make sure that there is no text overset (by making fontsize smaller, widen or make the text frame taller)'
                );
            } else {
                calculateLigature();
                //text.leading = (44 / 12) * text.pointSize;
                text.leading = leading;
                execCount++;
            }
        }

        function calculateLigature() {
            var up_arr = [];
            var up_arr_tong = [];
            up_arr_tong.push((up_arr = []));
            var down_arr_span = [];
            var down_arr_span_tong = [];
            down_arr_span_tong.push((down_arr_span = []));
            var down_arr = [];
            var down_arr_tong = [];
            down_arr_tong.push((down_arr = []));
            var render_arr = [[]];

            render_arr_create();

            function render_arr_create() {
                //main area
                for (var count = 0; count < target.lines.length; count++) {
                    var tong = 0;
                    var targetline_chars = target.lines[count].characters;
                    textconsole[count] = '';

                    for (var k = 0; k < targetline_chars.length; k++) {
                        var check = false;
                        var string = String.fromCharCode(
                            target.lines[count].contents.charCodeAt(k)
                        );
                        var stringnxt = String.fromCharCode(
                            target.lines[count].contents.charCodeAt(k + 1)
                        );
                        textconsole[count] += string;
                        var charac = list[string];
                        charac =
                            charac == undefined
                                ? code[
                                      target.lines[count].contents.charCodeAt(k)
                                  ]
                                : charac;
                        if (charac == undefined) {
                            return;
                        }
                        var kern = 0;
                        var kernr = 0;
                        // kern
                        if (tong != 0 && string != '\n' && string != '\r') {
                            kern =
                                +targetline_chars[k].insertionPoints[0]
                                    .kerningValue / 70;
                        }
                        if (
                            k < targetline_chars.length - 1 &&
                            stringnxt != '\n' &&
                            stringnxt != '\r'
                        ) {
                            kernr =
                                +targetline_chars[k].insertionPoints[1]
                                    .kerningValue / 70;
                        }
                        tong += kern;
                        // check
                        if (count > 0) {
                            if (charac.st_up) {
                                var ua =
                                    up_arr_tong[count - 1][
                                        tong + charac.vl_up - 1
                                    ]; // + kern
                                ua =
                                    ua == undefined
                                        ? { chek: true, for_f: false }
                                        : ua;
                                if (ua.chek) {
                                    if (ua.for_f) {
                                        check = string == 'f';
                                    } else {
                                        check = true;
                                    }
                                }
                            }
                        } else {
                            if (charac.st_up) {
                                check = true;
                            }
                        }
                        if (charac.st_down) {
                            check = true;
                        }

                        // render_arr
                        var span = {
                            is: false,
                            //altshort: false,
                            kernl: kern,
                            kernr: kernr,
                            axis: 0,
                        };
                        if (check) {
                            span = {
                                is: true,
                                //altshort: false,
                                kernl: kern,
                                kernr: kernr,
                                axis: lig,
                            };
                            if (string == 't') {
                                span.isT = true;
                            }
                            if (charac.st_down) {
                                span.axis = ligdes;
                                down_arr_span.push({
                                    string: string,
                                    tempvl: tong + charac.vl_down - 1,
                                    nested1: count,
                                    nested2: render_arr[count].length,
                                });
                            }
                        }
                        render_arr[count].push(span);

                        // up_arr
                        for (var i = 1; i <= charac.width; i++) {
                            up_arr.push({
                                chek: false,
                                for_f: false,
                            });
                        }

                        for (var i = 0; i < charac.ps_up.length; i++) {
                            up_arr[tong + charac.ps_up[i] - 1].chek = true;
                            up_arr[tong + charac.ps_up[i] - 1].for_f = false;
                        }

                        for (var i = 0; i < charac.ps_up_for_f.length; i++) {
                            up_arr[
                                tong + charac.ps_up_for_f[i] - 1
                            ].chek = true;
                            up_arr[
                                tong + charac.ps_up_for_f[i] - 1
                            ].for_f = true;
                        }
                        // down_arr
                        for (var i = 1; i <= charac.width; i++) {
                            down_arr.push([false, charac.cap, string]);
                        }
                        for (var i = 0; i < charac.ps_down.length; i++) {
                            down_arr[tong + charac.ps_down[i] - 1] = [
                                true,
                                charac.cap,
                                string,
                            ];
                        }

                        tong += charac.width;
                    }

                    up_arr_tong.push((up_arr = []));
                    down_arr_span_tong.push((down_arr_span = []));
                    down_arr_tong.push((down_arr = []));
                    render_arr.push([]);
                }

                //descender
                for (var i = 0; i < down_arr_span_tong.length - 1; i++) {
                    var spans = down_arr_span_tong[i];
                    var arrs = down_arr_tong[i + 1];

                    for (var a = 0; a < spans.length; a++) {
                        if (arrs[spans[a].tempvl] == undefined) {
                            continue;
                        } else if (arrs[spans[a].tempvl][0]) {
                            /*
                            render_arr[spans[a].nested1][
                                spans[a].nested2
                            ].altshort = arrs[spans[a].tempvl][1]
                                ? true
                                : false;*/
                            if (arrs[spans[a].tempvl][1]) {
                                render_arr[spans[a].nested1][
                                    spans[a].nested2
                                ].axis = ligcap;
                            }
                        } else {
                            render_arr[spans[a].nested1][
                                spans[a].nested2
                            ].is = false;
                        }
                    }
                }
            }

            // fully render
            for (var i = 0; i < render_arr.length; i++) {
                for (var k = 0; k < render_arr[i].length; k++) {
                    if (render_arr[i][k].is) {
                        /*
                        target.lines[i].characters[k].appliedFont = render_arr[
                            i
                        ][k].altshort
                            ? altshort
                            : alt;*/
                        var axis = render_arr[i][k].axis;
                        if (render_arr[i][k].isT) {
                            axis = axis == ligcap ? ligcapt : ligt;
                        }
                        target.lines[i].characters[k].setNthDesignAxis(0, axis);

                        if (render_arr[i][k].kernr != 0) {
                            target.lines[i].characters[k].tracking =
                                render_arr[i][k].kernr * 70;
                        }
                        if (k > 0 && render_arr[i][k].kernl != 0) {
                            target.lines[i].characters[k - 1].tracking =
                                render_arr[i][k].kernl * 70;
                        }
                    }
                }
            }
        }
    }
}

if (execCount == 0) {
    alert(
        'No text frame was transformed, please make sure you:' +
            '\n-select the text frame with the Selection Tool (V)' +
            "\n-the text frame's applied font has 'As Above, So Below' in its name"
    );
}

function getLig(lh) {
    return Math.min(88, Math.max(8 + ((lh - 0.3) / 0.7) * (88 - 8), 8));
}
function getLigAlt(lh, vLig, oLig) {
    if (lh <= 0.3) {
        return 0;
    }
    const c = Math.max(vLig[0], Math.min(lh, vLig[vLig.length - 1]));
    const i = findIndex(vLig, function (val) {
        return val >= c;
    });
    return i === -1
        ? oLig[oLig.length - 1]
        : oLig[i - 1] +
              ((c - vLig[i - 1]) / (vLig[i] - vLig[i - 1])) *
                  (oLig[i] - oLig[i - 1]);
}

function clamp(value) {
    return Math.max(0, Math.min(100, value));
}

function findIndex(array, callback, thisArg) {
    if (array == null) {
        throw new TypeError('findIndex called on null or undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    var length = array.length >>> 0; // Ensure length is a 32-bit unsigned integer

    for (var i = 0; i < length; i++) {
        if (i in array && callback.call(thisArg, array[i], i, array)) {
            return i; // Return the index of the first matching element
        }
    }
    return -1; // No matching element found
}

// Script Credits: written by Bao Anh Bui @bao.anh.bui on instagram
