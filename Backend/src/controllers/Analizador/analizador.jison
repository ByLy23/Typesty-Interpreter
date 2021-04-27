



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
const asignacion= require("./Instrucciones/Asignacion");
const condIf= require("./Instrucciones/Condicionales/condIf");
const condWhile= require("./Instrucciones/Ciclicas/condWhile");
const condDoWhile = require("./Instrucciones/Ciclicas/condDoWhile");
const condTernario= require("./Instrucciones/Condicionales/condIfTernario");
const condBreak= require("./Instrucciones/Break");
const condContinue= require("./Instrucciones/Continue");
const condReturn= require("./Instrucciones/Return");
const condSwitch= require("./Instrucciones/Condicionales/condSwitch");
const condDefault= require("./Instrucciones/Condicionales/condSwitchDefault");
const condCase= require("./Instrucciones/Condicionales/condSwitchCase");
const Incremento= require("./Instrucciones/Incremento");
const Decremento= require("./Instrucciones/Decremento");
const condFor= require("./Instrucciones/Ciclicas/condFor");
const metodos= require("./Instrucciones/Metodos");
const llamadas= require("./Instrucciones/LlamadaFuncMetd");
const ejecucion= require("./Instrucciones/Exec");
const funciones= require("./Instrucciones/Funciones");
%}
//definicion lexica
%lex 


%options case-insensitive
//inicio analisis lexico
%%
[ \r\t]+ {}
\n+ {}
"//".* {}  //comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {} //comentario multiple
//reservadas
"if"            return 'RESIF';
"else"          return 'RESELSE';
"print"         return 'RESPRINT';
"int"           return 'RESINT';
"char"          return 'RESCHAR';
"double"        return 'RESDOUBLE';
"boolean"       return 'RESBOOL';
"string"        return 'RESSTRING';
"while"         return 'RESWHILE';
"do"            return 'RESDO';
"break"         return 'RESBREAK';
"continue"      return 'RESCONTINUE';
"return"        return 'RESRETURN';
"switch"        return 'RESSWITCH';
"case"          return 'RESCASE';
"default"       return 'RESDEFAULT';
"for"           return 'RESFOR';
"void"          return 'RESVOID';
"exec"          return 'RESEXEC';
//simbolos
"{"             return 'LLAVEABRE';
","             return 'COMA';
"}"             return 'LLAVECIERRA';
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
"?"             return 'INTERROGACION';
":"             return 'DOSPUNTOS';
//expresiones regulares

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
%left 'INTERROGACION' 'DOSPUNTOS'
%left 'OR'
%left 'AND'
%left 'NOT'
%left 'MAYOR' 'MENOR' 'MAYORIGUAL' 'MENORIGUAL' 'COMPARACION' 'DIFERENTE'
%left 'MAS' 'MENOS'
%left 'POR' 'DIVI' 'MOD'
%nonassoc 'POTENCIA'
%right 'UMENOS'

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
    IMPRIMIR                            {$$=$1;}
    |DECLARACION   PTCOMA               {$$=$1;}
    |ASIGNACION    PTCOMA               {$$=$1;}
    |CONDICIONIF                        {$$=$1;}
    |CONDICIONWHILE                     {$$=$1;}
    |CONDICIONDOWHILE                   {$$=$1;}
    |IFTERNARIO                         {$$=$1;}
    |CONDBREAK                          {$$=$1;}
    |CODCONTINUE                        {$$=$1;}
    |CONDRETURN PTCOMA                         {$$=$1;}
    |CONDSWITCH                         {$$=$1;}
    |CONDINCREMENTO  PTCOMA             {$$=$1;}
    |CONDECREMENTO PTCOMA               {$$=$1;}
    |CONDFOR                            {$$=$1;}
    |METODOS                            {$$=$1;}
    |LLAMADA  PTCOMA                    {$$=$1;}
    |EJECUTAR PTCOMA                    {$$=$1;}
    |FUNCIONES                          {$$=$1;}
    //|CONDICION
    //|CICLO
    |error PTCOMA {inicio.listaErrores.push(new errores.default('ERROR SINTACTICO',"Se esperaba un token en esta linea",@1.first_line,@1.first_column));console.log("sinta "); $$=false;}
    ;
IMPRIMIR: RESPRINT PARABRE EXPRESION PARCIERRA  PTCOMA         {$$=new print.default($3,@1.first_line,@1.first_column);}
;//{};

DECLARACION:
    TIPODATO IDENTIFICADOR        {$$= new declaracion.default($1,@1.first_line,@1.first_column,$2);}
    |TIPODATO IDENTIFICADOR IGUAL EXPRESION   {$$= new declaracion.default($1,@1.first_line,@1.first_column,$2,$4);}
    ;
TIPODATO:
    RESINT                      {$$= new Tipo.default(Tipo.tipoDato.ENTERO);}
    |RESCHAR                    {$$= new Tipo.default(Tipo.tipoDato.CARACTER);}
    |RESBOOL                    {$$= new Tipo.default(Tipo.tipoDato.BOOLEANO);}
    |RESDOUBLE                  {$$= new Tipo.default(Tipo.tipoDato.DECIMAL);}
    |RESSTRING                  {$$= new Tipo.default(Tipo.tipoDato.CADENA);}
;
ASIGNACION:
    IDENTIFICADOR IGUAL EXPRESION  {$$=new asignacion.default($1,$3,@1.first_line,@1.first_column);}
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
    |MENOS EXPRESION %prec UMENOS       {$$=new aritmeticas.default(aritmeticas.Operadores.MENOSNUM,@1.first_line,@1.first_column,$2);}
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
    |CARACTER                   {$$= new nativo.default(new Tipo.default(Tipo.tipoDato.CARACTER),$1.replace(/['"]+/g, ""),@1.first_line,@1.first_column);}
    
    |IDENTIFICADOR              {$$=new identificador.default($1,@1.first_line,@1.first_column);}         
    |CONDINCREMENTO             {$$=$1;}
    |CONDECREMENTO              {$$=$1;}
    |LLAMADA                    {$$=$1;}
 
    ;
CONDICIONIF:
    RESIF PARABRE EXPRESION /*COND1*/PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA                                                         {$$= new condIf.default(@1.first_line,@1.first_column,$3,$6,undefined,undefined);}
    |RESIF PARABRE EXPRESION/*COND1*/ PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA RESELSE/*true*/ LLAVEABRE INSTRUCCIONES LLAVECIERRA    {$$= new condIf.default(@1.first_line,@1.first_column,$3,$6,$10,undefined);}
    |RESIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA RESELSE /*true*/CONDICIONIF                                     {$$= new condIf.default(@1.first_line,@1.first_column,$3,$6,undefined,$9);}     
    ;
CONDICIONWHILE:
    RESWHILE PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA              {$$=new condWhile.default($3,$6,@1.first_line,@1.first_column);}
    ;
CONDICIONDOWHILE:
    RESDO LLAVEABRE INSTRUCCIONES LLAVECIERRA RESWHILE PARABRE EXPRESION PARCIERRA PTCOMA {$$=new condDoWhile.default($7,$3,@1.first_line,@1.first_column);}
    ;
IFTERNARIO:
    EXPRESION INTERROGACION EXPRESION DOSPUNTOS EXPRESION PTCOMA        {$$=new condTernario.default($1,$3,$5,@1.first_line,@1.first_column);}
    ;
CONDBREAK:
    RESBREAK PTCOMA                                                     {$$=new condBreak.default(@1.first_line,@1.first_column); }
    ;
CODCONTINUE:
    RESCONTINUE PTCOMA                                                  {$$=new condContinue.default(@1.first_line,@1.first_column); }
    ;
CONDRETURN:
    RESRETURN                                                     {$$=new condReturn.default(@1.first_line,@1.first_column); }
    |RESRETURN EXPRESION                                          {$$=new condReturn.default(@1.first_line,@1.first_column,$2); }
    ;
CONDSWITCH:
    RESSWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS DEFECTO LLAVECIERRA    {$$=new condSwitch.default(@1.first_line,@1.first_column,$3,$6,$7);}
    |RESSWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE LISTACASOS LLAVECIERRA         {$$=new condSwitch.default(@1.first_line,@1.first_column,$3,$6,undefined);}
    |RESSWITCH PARABRE EXPRESION PARCIERRA LLAVEABRE DEFECTO LLAVECIERRA            {$$=new condSwitch.default(@1.first_line,@1.first_column,$3,undefined,$6);}
    ;
LISTACASOS: 
    LISTACASOS CASO                                 {if($2!=false)$1.push($2);$$=$1;}
    |CASO                                             {$$=($1!=false) ?[$1]:[];}                                                                             
    ;
CASO:
    RESCASE EXPRESION DOSPUNTOS INSTRUCCIONES                                     {$$=new condCase.default(@1.first_line,@1.first_column,$2,$4);} 
    ;
DEFECTO:
    RESDEFAULT DOSPUNTOS INSTRUCCIONES                                              {$$=new condDefault.default(@1.first_line,@1.first_column,$3);}  
    ;
CONDINCREMENTO:
    EXPRESION MAS MAS                                                              {$$=new Incremento.default($1,@1.first_line,@1.first_column);}
    ;
CONDECREMENTO:
    EXPRESION MENOS MENOS                                                           {$$=new Decremento.default($1,@1.first_line,@1.first_column);}
    ;
CONDFOR:
    RESFOR PARABRE DECLASIG PTCOMA EXPRESION PTCOMA ACTUALIZACION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=new condFor.default($3,$5,$7,$10,@1.first_line,@1.first_column);}
    ;
DECLASIG:
    DECLARACION {$$=$1;}
    |ASIGNACION {$$=$1;}
    ;
ACTUALIZACION:
    CONDINCREMENTO {$$=$1;}
    |CONDECREMENTO {$$=$1;}
    |ASIGNACION    {$$=$1;}
    ;
METODOS:
    RESVOID IDENTIFICADOR PARABRE PARAMETROS PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=new metodos.default(new Tipo.default(Tipo.tipoDato.VOID),@1.first_line,@1.first_column,$2,$4,$7);}
    |RESVOID IDENTIFICADOR PARABRE PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA           {$$=new metodos.default(new Tipo.default(Tipo.tipoDato.VOID),@1.first_line,@1.first_column,$2,[],$6);}
    ;
PARAMETROS:
    PARAMETROS COMA TIPODATO IDENTIFICADOR    {$1.push({tipato:$3,identificador:$4});$$=$1;} 
    |TIPODATO IDENTIFICADOR                   {$$=[{tipato:$1,identificador:$2}];} 
    ;
LLAMADA:
    IDENTIFICADOR PARABRE PARLLAMADA PARCIERRA  {$$=new llamadas.default($1,$3,@1.first_line,@1.first_column);}
    |IDENTIFICADOR PARABRE PARCIERRA            {$$=new llamadas.default($1,[],@1.first_line,@1.first_column);}
    ;
PARLLAMADA:
    PARLLAMADA COMA EXPRESION               {$1.push($3);$$=$1;} 
    |EXPRESION                               {$$=[$1];}
    ;
EJECUTAR:
    RESEXEC IDENTIFICADOR PARABRE PARLLAMADA PARCIERRA  {$$=new ejecucion.default($2,$4,@1.first_line,@1.first_column);}
    |RESEXEC IDENTIFICADOR PARABRE PARCIERRA            {$$=new ejecucion.default($2,[],@1.first_line,@1.first_column);}                        
    ;
FUNCIONES:
    TIPODATO IDENTIFICADOR PARABRE PARAMETROS PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA {$$=new funciones.default($1,@1.first_line,@1.first_column,$2,$4,$7);}
    |TIPODATO IDENTIFICADOR PARABRE PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA           {$$=new funciones.default($1,@1.first_line,@1.first_column,$2,[],$6);}
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
    a=b;
    |ASIGNACION:
        IDENTIFICADOR IGUAL EXPRESION PTCOMA

    DECONTROL:
        |IF
        |SWITCH
    CICLICAS:
        |WHILE
        |DOWHILE
        |FOR
    IF:
        RESIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA
        |RESIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA else lalveabre instrucciones llavecierra
        |RESIF PARABRE EXPRESION PARCIERRA LLAVEABRE INSTRUCCIONES LLAVECIERRA else IF
    */