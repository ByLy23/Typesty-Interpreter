



%{
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
%}
//definicion lexica
%lex 


%options case-insensitive
//inicio analisis lexico
%%

[ \r\t]+ {}
\n {}
\s+ {}//espacios en blanco
"//".*  //comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] //comentario multiple
//reservadas
"print"         return 'RESPRINT';
"int"           return 'RESINT';
"char"          return 'RESCHAR';
"double"        return 'RESDOUBLE';
"boolean"       return 'RESBOOL';
"string"        return 'RESSTRING';
//simbolos
"||"            return 'OR';
"&&"            return 'AND';
";"             return 'PTCOMA';
"("             return 'PARABRE';
")"             return 'PARCIERRA';
"+"             return 'MAS';
"-"             return 'MENOS';
"/"             return 'DIVI';
"*"             return 'POR';
"%"             return 'MOD';
"^"             return 'POTENCIA';
"=="            return 'COMPARACION';
"<="            return 'MENORIGUAL';
">="            return 'MAYORIGUAL';
"="             return 'IGUAL';
"!="            return 'DIFERENTE';
"!"             return 'NOT';
"<"             return 'MENOR';
">"             return 'MAYOR';
//expresiones regulares

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
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

<<EOF>>                 return 'EOF';


.   {inicio.listaErrores.push(new errores.default('ERROR LEXICO',yytext,this._$.first_line,this._$.first_column)); console.log("lexi "+yytext);}
/lex
//Precedencia
%left 'OR'
%left 'AND'
%left 'NOT'
%left 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL' 'COMPARACION' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVI' 'MOD'
%nonassoc 'POTENCIA'

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

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION     {if($2!=false)$1.push($2);$$=$1;}
|INSTRUCCION                                 {$$=($1!=false) ?[$1]:[];}
;

INSTRUCCION: 
    IMPRIMIR                           {$$=$1;}
    |DECLARACION                        {$$=$1;}
    //|CONDICION
    //|CICLO
    |error PTCOMA {inicio.listaErrores.push(new errores.default('ERROR SINTACTICO',"",@1.first_line,@1.first_column));console.log("sinta "); $$=false;}
    ;
IMPRIMIR: RESPRINT PARABRE EXPRESION PARCIERRA  PTCOMA         {$$=new print.default($3,@1.first_line,@1.first_column);}
;//{};

DECLARACION:
    TIPODATO IDENTIFICADOR PTCOMA       {$$= new declaracion.default($1,@1.first_line,@1.first_column,$2);}
    |TIPODATO IDENTIFICADOR IGUAL EXPRESION PTCOMA  {$$= new declaracion.default($1,@1.first_line,@1.first_column,$2,$4);}
    ;
TIPODATO:
    RESINT                      {$$= new Tipo.default(Tipo.tipoDato.ENTERO);}
    |RESCHAR                    {$$= new Tipo.default(Tipo.tipoDato.CARACTER);}
    |RESBOOL                    {$$= new Tipo.default(Tipo.tipoDato.BOOLEANO);}
    |RESDOUBLE                  {$$= new Tipo.default(Tipo.tipoDato.DECIMAL);}
    |RESSTRING                  {$$= new Tipo.default(Tipo.tipoDato.CADENA);}
;
EXPRESION: 
    //ARITMETICAS
     EXPRESION MAS EXPRESION            {$$= new aritmeticas.default(aritmeticas.Operadores.SUMA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENOS EXPRESION          {$$= new aritmeticas.default(aritmeticas.Operadores.RESTA,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION POR EXPRESION            {$$= new aritmeticas.default(aritmeticas.Operadores.MULTIPLICACION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION DIVI EXPRESION           {$$= new aritmeticas.default(aritmeticas.Operadores.DIVISION,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MOD EXPRESION            {$$= new aritmeticas.default(aritmeticas.Operadores.MODULADOR,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION POTENCIA EXPRESION       {$$= new aritmeticas.default(aritmeticas.Operadores.POTENCIA,@1.first_line,@1.first_column,$1,$3);}
    |PARABRE EXPRESION PARCIERRA        {$$=$2;}
    //RELACIONALES
    |EXPRESION COMPARACION EXPRESION    {$$= new relacional.default(relacional.Relacionales.IGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION DIFERENTE EXPRESION      {$$= new relacional.default(relacional.Relacionales.DIFERENTE,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYOR EXPRESION          {$$= new relacional.default(relacional.Relacionales.MAYOR,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENOR EXPRESION          {$$= new relacional.default(relacional.Relacionales.MENOR,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MAYORIGUAL EXPRESION     {$$= new relacional.default(relacional.Relacionales.MAYORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION MENORIGUAL EXPRESION     {$$= new relacional.default(relacional.Relacionales.MENORIGUAL,@1.first_line,@1.first_column,$1,$3);}
    //LOGICAS
    |EXPRESION AND EXPRESION            {$$=new logicas.default(logicas.Logicas.AND,@1.first_line,@1.first_column,$1,$3);}
    |EXPRESION OR EXPRESION             {$$=new logicas.default(logicas.Logicas.OR,@1.first_line,@1.first_column,$1,$3);}
    |NOT EXPRESION                      {$$=new logicas.default(logicas.Logicas.NOT,@1.first_line,@1.first_column,$2);}
    //NATIVO
    |ENTERO                     {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.ENTERO),$1,@1.first_line,@1.first_column);}
    |DECIMAL                    {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.DECIMAL),$1,@1.first_line,@1.first_column);}
    |CADENA                     {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.CADENA),$1,@1.first_line,@1.first_column);}
    |BOOLEANO                   {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.BOOLEANO),$1,@1.first_line,@1.first_column);}
    |CARACTER                   {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1,@1.first_line,@1.first_column);}
    |IDENTIFICADOR              {$$=new identificador.default($1,@1.first_line,@1.first_column);}         
    ;
    /*
    |TIPODATO
    TIPODATO:
        RESINT
        |RESCHAR
        |RESSTRING
        |RESBOOL
        |RESDOUBLE
    |DECLARACION
    DECLARACION:
        TIPODATO IDENTIFICADOR PTCMA
        |TIPODATO IDENTIFICADOR IGUAL EXPRESION PTCOMA
        |ERROR PTCOMA
    
    |ASIGNACION
    */