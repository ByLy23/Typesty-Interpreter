



%{
//codigo js
const print=require('./Instrucciones/print');
const nativo= require('./Expresiones/Nativo');
const errores= require('./Excepciones/Errores');
const inicio= require('../indexControllers');
const aritmeticas= require('./Expresiones/Aritmetica');
const Tipo= require('./Simbolos/Tipo');
%}
//definicion lexica
%lex 


%options case-insensitive
//inicio analisis lexico
%%
"print"         return 'RESPRINT';
";"             return 'PTCOMA';
"("             return 'PARABRE';
")"             return 'PARCIERRA';
"+"             return 'MAS';
"-"             return 'MENOS';
"/"             return 'DIVI';
"*"             return 'POR';
[ \r\t]+ {}
\n {}
//comentario simple
//"\/\/" [^\r\n]* [^\r\n]     {}
//comentario multi
//"/""*" [^/] ~"*""/"       {}
//espacios en blanco
//cadena
\"[^\"]*\"             { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
[0-9]+\b                return 'ENTERO';
\'[^\']\'               return 'CARACTER';
("true"|"false")\b      return 'BOOLEANO';

<<EOF>>                 return 'EOF';


.   {inicio.listaErrores.push(new errores.default('ERROR LEXICO',yytext,this._$.first_line,this._$.first_column)); console.log("lexi "+yytext);}
/lex
//Precedencia
%left 'POR' 'DIVI'
%left 'MAS' 'MENOS'

%start INI
//Inicio
//Definicion de gramatica
%%
/*
Tokens
comentario simple
comentario multiple
\n salto linea
\\ barra invertida
\" comilla doble
\' comilla simple
\t tabulacion
int resInt
double resDouble
boolean resBool
char resChar
string resString
if resIf
else resElse
new resNuevo
list resLista
add resAdd
print resImprimir
switch resSwitch
case resCase
default resDefault
break resBreak
while resWhile
do resDo
for resFor
continue resContinue
return resReturn
void resVoid
tolower resToLower
toupper resToUpper
length resLength
truncate resTruncate
round resRound
typeof resTypeof
toString resTostring
tochararray resTochararray
exec resExec
++ masmas
-- menosmenos
[ corchete abierto
] corchete cerrado
entero
doble
cadena
booleano
caracter
+ mas
- menos
* por
/ dividido
% mod
^ elevado
-num
= igual
== opIgual
!= opDiferente
< opMenor
> opMayor
<= opMenorIgual
>= opMayorIgual
? opTernario
: dosPuntos
|| opOr
&& opAnd
! opNegacion
( parentesis abierto
) parentesis cerrado
{ llave abierta
} llave cerrada
; punto y coma
*/
INI: INSTRUCCIONES EOF {return $1;}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     {$1.push($2);$$=$1;}
|INSTRUCCION                                 {$$=[$1];}
;

INSTRUCCION: 
    IMPRIMIR                            {$$=$1;}
    //|CONDICION
    //|CICLO
    |error PTCOMA {inicio.listaErrores.push(new errores.default('ERROR SINTACTICO',"",@1.first_line,@1.first_column));console.log("sinta ");};
IMPRIMIR: RESPRINT PARABRE EXPRESION PARCIERRA PTCOMA          {$$=new print.default($3,@1.first_line,@1.first_column);} 
;//{};

EXPRESION: EXPRESION MAS EXPRESION      {$$= new aritmeticas.default(aritmeticas.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENOS EXPRESION          {$$= new aritmeticas.default(aritmeticas.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION POR EXPRESION            {$$= new aritmeticas.default(aritmeticas.Operadores.MULTIPLICACION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION DIVI EXPRESION           {$$= new aritmeticas.default(aritmeticas.Operadores.DIVISION,@1.first_line,@1.first_column,$1,$3);}
    |ENTERO                     {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    |DECIMAL                    {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
    |CADENA                     {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    |BOOLEANO                   {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.BOOLEANO),$1,@1.first_line,@1.first_column);}
    |CARACTER                   {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
    ;
