/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var analizador = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,9],$V2=[1,11],$V3=[1,13],$V4=[1,14],$V5=[1,15],$V6=[1,16],$V7=[1,17],$V8=[1,12],$V9=[2,5,12,17,19,20,21,22,23,44,46],$Va=[1,26],$Vb=[1,33],$Vc=[1,27],$Vd=[1,28],$Ve=[1,29],$Vf=[1,30],$Vg=[1,31],$Vh=[1,32],$Vi=[1,39],$Vj=[1,40],$Vk=[1,41],$Vl=[1,42],$Vm=[1,43],$Vn=[1,44],$Vo=[1,45],$Vp=[1,46],$Vq=[1,47],$Vr=[1,48],$Vs=[1,49],$Vt=[1,50],$Vu=[1,51],$Vv=[1,52],$Vw=[11,15,24,25,26,27,28,29,30,31,32,33,34,35,36,37],$Vx=[11,15,36,37],$Vy=[11,15,24,25,30,31,32,33,34,35,36,37],$Vz=[11,15,24,25,26,27,28,30,31,32,33,34,35,36,37],$VA=[11,15,30,31,32,33,34,35,36,37];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"INI":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"IMPRIMIR":7,"DECLARACION":8,"ASIGNACION":9,"CONDICIONIF":10,"PTCOMA":11,"RESPRINT":12,"PARABRE":13,"EXPRESION":14,"PARCIERRA":15,"TIPODATO":16,"IDENTIFICADOR":17,"IGUAL":18,"RESINT":19,"RESCHAR":20,"RESBOOL":21,"RESDOUBLE":22,"RESSTRING":23,"MAS":24,"MENOS":25,"POR":26,"DIVI":27,"MOD":28,"POTENCIA":29,"COMPARACION":30,"DIFERENTE":31,"MAYOR":32,"MENOR":33,"MAYORIGUAL":34,"MENORIGUAL":35,"AND":36,"OR":37,"NOT":38,"ENTERO":39,"DECIMAL":40,"CADENA":41,"BOOLEANO":42,"CARACTER":43,"RESIF":44,"LLAVEABRE":45,"LLAVECIERRA":46,"RESELSE":47,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"PTCOMA",12:"RESPRINT",13:"PARABRE",15:"PARCIERRA",17:"IDENTIFICADOR",18:"IGUAL",19:"RESINT",20:"RESCHAR",21:"RESBOOL",22:"RESDOUBLE",23:"RESSTRING",24:"MAS",25:"MENOS",26:"POR",27:"DIVI",28:"MOD",29:"POTENCIA",30:"COMPARACION",31:"DIFERENTE",32:"MAYOR",33:"MENOR",34:"MAYORIGUAL",35:"MENORIGUAL",36:"AND",37:"OR",38:"NOT",39:"ENTERO",40:"DECIMAL",41:"CADENA",42:"BOOLEANO",43:"CARACTER",44:"RESIF",45:"LLAVEABRE",46:"LLAVECIERRA",47:"RESELSE"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[6,1],[6,2],[7,5],[8,3],[8,5],[16,1],[16,1],[16,1],[16,1],[16,1],[9,4],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,3],[14,2],[14,1],[14,1],[14,1],[14,1],[14,1],[14,1],[10,7],[10,11],[10,9]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
if($$[$0]!=false)$$[$0-1].push($$[$0]);this.$=$$[$0-1];
break;
case 3:
this.$=($$[$0]!=false) ?[$$[$0]]:[];
break;
case 4: case 5: case 6: case 7:
this.$=$$[$0];
break;
case 8:
inicio.listaErrores.push(new errores.default('ERROR SINTACTICO',"",_$[$0-1].first_line,_$[$0-1].first_column));console.log("sinta "); this.$=false;
break;
case 9:
this.$=new print.default($$[$0-2],_$[$0-4].first_line,_$[$0-4].first_column);
break;
case 10:
this.$= new declaracion.default($$[$0-2],_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-1]);
break;
case 11:
this.$= new declaracion.default($$[$0-4],_$[$0-4].first_line,_$[$0-4].first_column,$$[$0-3],$$[$0-1]);
break;
case 12:
this.$= new Tipo.default(Tipo.tipoDato.ENTERO);
break;
case 13:
this.$= new Tipo.default(Tipo.tipoDato.CARACTER);
break;
case 14:
this.$= new Tipo.default(Tipo.tipoDato.BOOLEANO);
break;
case 15:
this.$= new Tipo.default(Tipo.tipoDato.DECIMAL);
break;
case 16:
this.$= new Tipo.default(Tipo.tipoDato.CADENA);
break;
case 17:
this.$=new asignacion.default($$[$0-3],$$[$0-1],_$[$0-3].first_line,_$[$0-3].first_column);
break;
case 18:
this.$= new aritmeticas.default(aritmeticas.Operadores.SUMA,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 19:
this.$= new aritmeticas.default(aritmeticas.Operadores.RESTA,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 20:
this.$= new aritmeticas.default(aritmeticas.Operadores.MULTIPLICACION,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 21:
this.$= new aritmeticas.default(aritmeticas.Operadores.DIVISION,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 22:
this.$= new aritmeticas.default(aritmeticas.Operadores.MODULADOR,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 23:
this.$= new aritmeticas.default(aritmeticas.Operadores.POTENCIA,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 24:
this.$=$$[$0-1];
break;
case 25:
this.$= new relacional.default(relacional.Relacionales.IGUAL,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 26:
this.$= new relacional.default(relacional.Relacionales.DIFERENTE,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 27:
this.$= new relacional.default(relacional.Relacionales.MAYOR,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 28:
this.$= new relacional.default(relacional.Relacionales.MENOR,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 29:
this.$= new relacional.default(relacional.Relacionales.MAYORIGUAL,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 30:
this.$= new relacional.default(relacional.Relacionales.MENORIGUAL,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 31:
this.$=new logicas.default(logicas.Logicas.AND,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 32:
this.$=new logicas.default(logicas.Logicas.OR,_$[$0-2].first_line,_$[$0-2].first_column,$$[$0-2],$$[$0]);
break;
case 33:
this.$=new logicas.default(logicas.Logicas.NOT,_$[$0-1].first_line,_$[$0-1].first_column,$$[$0]);
break;
case 34:
this.$= new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 35:
this.$= new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 36:
this.$= new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 37:
this.$= new nativo.default(new Tipo.default(Tipo.tipoDato.BOOLEANO),$$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 38:
this.$= new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$$[$0].replace(/['"]+/g, ""),_$[$0].first_line,_$[$0].first_column);
break;
case 39:
this.$=new identificador.default($$[$0],_$[$0].first_line,_$[$0].first_column);
break;
case 40:
this.$= new condIf.default(_$[$0-6].first_line,_$[$0-6].first_column,$$[$0-4],$$[$0-1],false);
break;
case 41:
this.$= new condIf.default(_$[$0-10].first_line,_$[$0-10].first_column,$$[$0-8],$$[$0-5],true,$$[$0-1]);
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8},{1:[3]},{2:$V0,5:[1,18],6:19,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8},o($V9,[2,3]),o($V9,[2,4]),o($V9,[2,5]),o($V9,[2,6]),o($V9,[2,7]),{11:[1,20]},{13:[1,21]},{17:[1,22]},{18:[1,23]},{13:[1,24]},{17:[2,12]},{17:[2,13]},{17:[2,14]},{17:[2,15]},{17:[2,16]},{1:[2,1]},o($V9,[2,2]),o($V9,[2,8]),{13:$Va,14:25,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{11:[1,34],18:[1,35]},{13:$Va,14:36,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:37,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{15:[1,38],24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu,37:$Vv},{13:$Va,14:53,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:54,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},o($Vw,[2,34]),o($Vw,[2,35]),o($Vw,[2,36]),o($Vw,[2,37]),o($Vw,[2,38]),o($Vw,[2,39]),o($V9,[2,10]),{13:$Va,14:55,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{11:[1,56],24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu,37:$Vv},{15:[1,57],24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu,37:$Vv},{11:[1,58]},{13:$Va,14:59,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:60,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:61,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:62,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:63,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:64,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:65,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:66,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:67,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:68,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:69,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:70,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:71,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{13:$Va,14:72,17:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf,42:$Vg,43:$Vh},{15:[1,73],24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu,37:$Vv},o($Vx,[2,33],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt}),{11:[1,74],24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu,37:$Vv},o($V9,[2,17]),{45:[1,75]},o($V9,[2,9]),o($Vy,[2,18],{26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($Vy,[2,19],{26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($Vz,[2,20],{29:$Vn}),o($Vz,[2,21],{29:$Vn}),o($Vz,[2,22],{29:$Vn}),o($Vz,[2,23]),o($VA,[2,25],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($VA,[2,26],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($VA,[2,27],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($VA,[2,28],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($VA,[2,29],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($VA,[2,30],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn}),o($Vx,[2,31],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt}),o([11,15,37],[2,32],{24:$Vi,25:$Vj,26:$Vk,27:$Vl,28:$Vm,29:$Vn,30:$Vo,31:$Vp,32:$Vq,33:$Vr,34:$Vs,35:$Vt,36:$Vu}),o($Vw,[2,24]),o($V9,[2,11]),{2:$V0,4:76,6:3,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8},{2:$V0,6:19,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8,46:[1,77]},o($V9,[2,40],{47:[1,78]}),{10:80,44:$V8,45:[1,79]},{2:$V0,4:81,6:3,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8},o($V9,[2,42]),{2:$V0,6:19,7:4,8:5,9:6,10:7,12:$V1,16:10,17:$V2,19:$V3,20:$V4,21:$V5,22:$V6,23:$V7,44:$V8,46:[1,82]},o($V9,[2,41])],
defaultActions: {13:[2,12],14:[2,13],15:[2,14],16:[2,15],17:[2,16],18:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

//codigo js
const print=require('./Instrucciones/print');
const nativo= require('./Expresiones/Nativo');
const errores= require('./Excepciones/Errores');
const inicio= require('../indexControllers');
const aritmeticas= require('./Expresiones/Aritmetica');
const Tipo= require('./Simbolos/Tipo');
const logicas= require("./Expresiones/Logica");
const relacional= require("./Expresiones/Relacional");
const declaracion= require("./Instrucciones/Declaracion");
const identificador=require("./Expresiones/Identificador");
const asignacion= require("./Instrucciones/Asignacion");
const condIf= require("./Instrucciones/Condicionales/condIf");
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3://comentario simple
break;
case 4://comentario multiple
break;
case 5:return 44;
break;
case 6:return 47;
break;
case 7:return 12;
break;
case 8:return 19;
break;
case 9:return 20;
break;
case 10:return 22;
break;
case 11:return 21;
break;
case 12:return 23;
break;
case 13:return 45;
break;
case 14:return 46;
break;
case 15:return 37;
break;
case 16:return 36;
break;
case 17:return 11;
break;
case 18:return 13;
break;
case 19:return 15;
break;
case 20:return 24;
break;
case 21:return 25;
break;
case 22:return 27;
break;
case 23:return 26;
break;
case 24:return 28;
break;
case 25:return 29;
break;
case 26:return 30;
break;
case 27:return 35;
break;
case 28:return 34;
break;
case 29:return 18;
break;
case 30:return 31;
break;
case 31:return 38;
break;
case 32:return 33;
break;
case 33:return 32;
break;
case 34: yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2); return 41; 
break;
case 35:return 40;
break;
case 36:return 39;
break;
case 37:return 43;
break;
case 38:return 42;
break;
case 39:return 17;
break;
case 40:return 5;
break;
case 41:inicio.listaErrores.push(new errores.default('ERROR LEXICO',yy_.yytext,this._$.first_line,this._$.first_column)); console.log("lexi "+yy_.yytext);
break;
}
},
rules: [/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:\s+)/i,/^(?:\/\/.*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:print\b)/i,/^(?:int\b)/i,/^(?:char\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:string\b)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\/)/i,/^(?:\*)/i,/^(?:%)/i,/^(?:\^)/i,/^(?:==)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:!)/i,/^(?:<)/i,/^(?:>)/i,/^(?:"[^\"]*")/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:'[^\']')/i,/^(?:(true|false)\b)/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = analizador;
exports.Parser = analizador.Parser;
exports.parse = function () { return analizador.parse.apply(analizador, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}