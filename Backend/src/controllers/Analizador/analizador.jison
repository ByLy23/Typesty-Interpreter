



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
[0-9]+\b               return 'ENTERO';
[0-9]+("."[0-9]+)\b     return 'DECIMAL';
([^\t\n\r ])\b          return 'CARACTER';
("true"|"false")\b      return 'BOOLEANO';


<<EOF>>                 return 'EOF';


.   {console.log('ERROR lexico en: '+yytext+' , en la linea tal y tal xd');}
/lex
%{
//codigo js
const print=require('./Instrucciones/print');
const nativo= require('./Expresiones/Nativo');
%}
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
    |error PTCOMA {console.error('error sintactico');};
IMPRIMIR: RESPRINT PARABRE EXPRESION PARCIERRA PTCOMA          {$$=new print.default($3,@1.first_line,@1.first_column);} 
;//{};

EXPRESION: EXPRESION MAS EXPRESION
    |EXPRESION MENOS EXPRESION
    |EXPRESION POR EXPRESION
    |EXPRESION DIVI EXPRESION
    |ENTERO                     {$$= new nativo.default($1,@1.first_line,@1.first_column);}
    |DECIMAL                    {$$= new nativo.default($1,@1.first_line,@1.first_column);}
    |CADENA                     {$$= new nativo.default($1,@1.first_line,@1.first_column);}
    |BOOLEANO                   {$$= new nativo.default($1,@1.first_line,@1.first_column);}
    ;
