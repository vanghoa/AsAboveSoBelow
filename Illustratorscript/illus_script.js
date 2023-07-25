//#include "opentype_es3.js";

var font = new (function () {
    this.getKerningValue = function (l, r) {
        return this[l + ',' + r] == undefined ? 0 : this[l + ',' + r];
    };
    this.charToGlyph = function (a) {
        return a;
    };
    this.input = function (txt) {
        var textToNumberMap = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6,
            seven: 7,
            eight: 8,
            nine: 9,
            hyphen: '-',
        };
        var arr = txt.split(';');
        arr[0] = arr[0].replace('@MMK_L_', '');
        arr[1] = arr[1].replace('@MMK_R_', '');
        var arr0 = textToNumberMap[arr[0]];
        arr[0] = arr0 == undefined ? arr[0] : arr0;
        var arr1 = textToNumberMap[arr[1]];
        arr[1] = arr1 == undefined ? arr[1] : arr1;

        this[arr[0] + ',' + arr[1]] = +arr[2];
    };
})();

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
        ps_up_for_f
    ) {
        st_up = st_up == undefined ? false : st_up;
        vl_up = vl_up == undefined ? 0 : vl_up;
        st_down = st_down == undefined ? false : st_down;
        vl_down = vl_down == undefined ? 0 : vl_down;
        cap = cap == undefined ? false : cap;
        ps_up_for_f = ps_up_for_f == undefined ? [] : ps_up_for_f;
        this[varter] = {
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
        ps_up = ps_up == undefined ? [] : ps_up;
        ps_down = ps_down == undefined ? [] : ps_down;
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
        ps_up = ps_up == undefined ? [] : ps_up;
        ps_down = ps_down == undefined ? [] : ps_down;
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

    return this;
})();

//font kerning input
{
    font.input('@MMK_L_zero;@MMK_R_five;-70');
    font.input('@MMK_L_zero;@MMK_R_seven;-70');
    font.input('@MMK_L_zero;@MMK_R_two;-70');
    font.input('@MMK_L_nine;@MMK_R_five;-70');
    font.input('@MMK_L_nine;@MMK_R_seven;-70');
    font.input('c;t;-70');
    font.input('@MMK_L_seven;@MMK_R_six;-70');
    font.input('@MMK_L_seven;@MMK_R_o;-70');
    font.input('@MMK_L_seven;@MMK_R_four;-70');
    font.input('@MMK_L_seven;@MMK_R_two;-70');
    font.input('@MMK_L_seven;@MMK_R_seven;-70');
    font.input('@MMK_L_seven;@MMK_R_eight;-70');
    font.input('@MMK_L_seven;@MMK_R_nine;-70');
    font.input('@MMK_L_G;@MMK_R_T;-70');
    font.input('@MMK_L_V;@MMK_R_A;-70');
    font.input('@MMK_L_V;@MMK_R_V;-70');
    font.input('two;five;-70');
    font.input('@MMK_L_Z;@MMK_R_Z;-140');
    font.input('@MMK_L_O;@MMK_R_A;-70');
    font.input('@MMK_L_O;@MMK_R_T;-70');
    font.input('@MMK_L_six;@MMK_R_nine;-70');
    font.input('@MMK_L_six;@MMK_R_four;-70');
    font.input('@MMK_L_six;@MMK_R_five;-70');
    font.input('@MMK_L_six;@MMK_R_seven;-70');
    font.input('@MMK_L_six;@MMK_R_two;-70');
    font.input('@MMK_L_six;@MMK_R_three;-70');
    font.input('@MMK_L_D;@MMK_R_R;-70');
    font.input('@MMK_L_two;@MMK_R_six;-70');
    font.input('@MMK_L_two;@MMK_R_five;-70');
    font.input('@MMK_L_two;@MMK_R_three;-70');
    font.input('@MMK_L_two;@MMK_R_o;-70');
    font.input('@MMK_L_two;@MMK_R_two;-70');
    font.input('@MMK_L_two;@MMK_R_seven;-70');
    font.input('@MMK_L_two;@MMK_R_eight;-70');
    font.input('@MMK_L_two;@MMK_R_nine;-70');
    font.input('@MMK_L_three;@MMK_R_two;-70');
    font.input('@MMK_L_three;@MMK_R_four;-70');
    font.input('@MMK_L_three;@MMK_R_five;-70');
    font.input('@MMK_L_three;@MMK_R_seven;-70');
    font.input('@MMK_L_three;@MMK_R_six;-70');
    font.input('@MMK_L_hyphen;@MMK_R_S;-140');
    font.input('@MMK_L_hyphen;@MMK_R_Z;-140');
    font.input('@MMK_L_L;@MMK_R_U;-70');
    font.input('@MMK_L_L;@MMK_R_C;-70');
    font.input('@MMK_L_L;@MMK_R_G;-70');
    font.input('@MMK_L_L;@MMK_R_T;-140');
    font.input('@MMK_L_L;@MMK_R_O;-70');
    font.input('@MMK_L_L;@MMK_R_S;-70');
    font.input('@MMK_L_L;@MMK_R_V;-140');
    font.input('@MMK_L_L;@MMK_R_Z;-140');
    font.input('@MMK_L_L;@MMK_R_Q;-70');
    font.input('@MMK_L_A;@MMK_R_V;-70');
    font.input('@MMK_L_A;@MMK_R_U;-70');
    font.input('@MMK_L_A;@MMK_R_T;-70');
    font.input('@MMK_L_A;@MMK_R_Z;-70');
    font.input('@MMK_L_P;@MMK_R_A;-70');
    font.input('@MMK_L_five;@MMK_R_nine;-70');
    font.input('@MMK_L_five;@MMK_R_four;-140');
    font.input('@MMK_L_five;@MMK_R_eight;-70');
    font.input('@MMK_L_five;@MMK_R_six;-70');
    font.input('@MMK_L_five;@MMK_R_two;-70');
    font.input('@MMK_L_E;@MMK_R_T;-70');
    font.input('@MMK_L_T;@MMK_R_o;-70');
    font.input('@MMK_L_T;@MMK_R_s;-70');
    font.input('@MMK_L_T;@MMK_R_a;-70');
    font.input('@MMK_L_T;@MMK_R_e;-70');
    font.input('@MMK_L_T;@MMK_R_O;-70');
    font.input('@MMK_L_T;@MMK_R_i;-70');
    font.input('@MMK_L_T;@MMK_R_A;-70');
    font.input('@MMK_L_T;@MMK_R_y;-70');
    font.input('@MMK_L_T;@MMK_R_g;-70');
    font.input('@MMK_L_r;@MMK_R_hyphen;-140');
    font.input('@MMK_L_r;@MMK_R_o;-70');
    font.input('@MMK_L_r;@MMK_R_a;-70');
    font.input('@MMK_L_r;@MMK_R_e;-70');
    font.input('@MMK_L_r;@MMK_R_z;-70');
    font.input('@MMK_L_r;@MMK_R_d;-70');
    font.input('@MMK_L_r;@MMK_R_c;-70');
    font.input('@MMK_L_r;@MMK_R_g;-70');
    font.input('@MMK_L_eight;@MMK_R_o;-70');
    font.input('@MMK_L_eight;@MMK_R_five;70');
    font.input('@MMK_L_eight;@MMK_R_four;-140');
    font.input('@MMK_L_eight;@MMK_R_two;-70');
    font.input('@MMK_L_eight;@MMK_R_seven;-70');
    font.input('@MMK_L_eight;@MMK_R_eight;-70');
    font.input('@MMK_L_eight;@MMK_R_nine;-70');
    font.input('D;A;-70');
    font.input('D;T;-70');
    font.input('D;V;-70');
    font.input('D;W;-70');
    font.input('D;Y;-70');
    font.input('@MMK_L_four;@MMK_R_five;-70');
    font.input('@MMK_L_four;@MMK_R_seven;-70');
    font.input('@MMK_L_B;@MMK_R_A;-70');
    font.input('@MMK_L_B;@MMK_R_V;-70');
    font.input('@MMK_L_B;@MMK_R_T;-70');
    font.input('@MMK_L_F;@MMK_R_A;-70');
    font.input('@MMK_L_F;@MMK_R_o;-70');
    font.input('@MMK_L_F;@MMK_R_e;-70');
    font.input('@MMK_L_F;@MMK_R_a;-70');
    font.input('@MMK_L_U;@MMK_R_A;-70');
}

//font width and stem pos
{
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
}

var myDoc = app.activeDocument;
var target = myDoc.textFrames[0];
var chara1 = myDoc.textFrames[0].lines[0].characters[0].insertionPoints[1];
var chara2 = myDoc.textFrames[0].lines[0].characters[1].insertionPoints[1];

var alt = myDoc.textFrames[1].lines[2].characterAttributes.textFont;
var altshort = myDoc.textFrames[1].lines[1].characterAttributes.textFont;
var regular = myDoc.textFrames[1].lines[0].characterAttributes.textFont;
var textconsole = [''];

calculateLigature();

function calculateLigature() {
    //var textNode = parr[i].firstChild;
    //var textContent = textNode.textContent;
    var lines = [];
    var lineCharacters = [];
    var up_arr = [];
    var up_arr_tong = [];

    var down_arr_span = [];
    var down_arr_span_tong = [];
    var down_arr = [];
    var down_arr_tong = [];
    var tong = 0;

    var render_arr = [[]];

    lines.push((lineCharacters = []));
    up_arr_tong.push((up_arr = []));
    down_arr_span_tong.push((down_arr_span = []));
    down_arr_tong.push((down_arr = []));

    render_arr_create();

    //console.log(textconsole);

    function render_arr_create() {
        //main area
        for (var count = 0; count < target.lines.length; count++) {
            var targetline_chars = target.lines[count].characters;
            textconsole[count] = '';

            for (var k = 0; k < targetline_chars.length; k++) {
                var check = false;
                var string = targetline_chars[k].contents;
                textconsole[count] += string;
                var charac = list[string];
                var kern = 0;
                var kernr = 0;
                // kern
                if (tong != 0) {
                    kern =
                        font.getKerningValue(
                            font.charToGlyph(targetline_chars[k - 1].contents),
                            font.charToGlyph(string)
                        ) / 70;
                }
                if (k < targetline_chars.length - 1) {
                    kernr =
                        font.getKerningValue(
                            font.charToGlyph(string),
                            font.charToGlyph(targetline_chars[k + 1].contents)
                        ) / 70;
                }
                //tong += kern;
                // check
                if (count > 0) {
                    if (charac.st_up) {
                        var ua =
                            up_arr_tong[count - 1][tong + charac.vl_up - 1]; // + kern
                        ua = ua == undefined ? { chek: true, for_f: true } : ua;
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
                    altshort: false,
                };
                if (check) {
                    span = {
                        is: true,
                        altshort: false,
                    };
                    if (charac.st_down) {
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
                    up_arr[tong + charac.ps_up_for_f[i] - 1].chek = true;
                    up_arr[tong + charac.ps_up_for_f[i] - 1].for_f = true;
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

            //count++;
            tong = 0;
            lines.push((lineCharacters = []));
            up_arr_tong.push((up_arr = []));

            down_arr_span_tong.push((down_arr_span = []));
            down_arr_tong.push((down_arr = []));

            render_arr.push([]);
        }
        ////////////////////////////////////////////////////////////////

        //descender
        for (var i = 0; i < down_arr_span_tong.length - 1; i++) {
            var spans = down_arr_span_tong[i];
            var arrs = down_arr_tong[i + 1];

            for (var a = 0; a < spans.length; a++) {
                if (arrs[spans[a].tempvl] == undefined) {
                    continue;
                } else if (arrs[spans[a].tempvl][0]) {
                    render_arr[spans[a].nested1][spans[a].nested2].altshort =
                        arrs[spans[a].tempvl][1] ? true : false;
                } else {
                    render_arr[spans[a].nested1][spans[a].nested2].is = false;
                }
            }
        }
    }

    // fully render
    for (var i = 0; i < render_arr.length; i++) {
        for (var k = 0; k < render_arr[i].length; k++) {
            if (render_arr[i][k].is) {
                target.lines[i].characters[k].characterAttributes.textFont =
                    render_arr[i][k].altshort ? altshort : alt;
            } else {
                target.lines[i].characters[k].characterAttributes.textFont =
                    regular;
            }
        }
    }
}
