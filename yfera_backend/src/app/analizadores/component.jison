%lex

%options locations
%options flex

LETRA						[a-zA-Z]
IDENTIFICADOR					{LETRA}[a-zA-Z0-9_]*
IDSIMPLE					{LETRA}[a-zA-Z0-9]*
IDESTILO					{LETRA}[a-zA-Z0-9\-]*
VARIABLE					"$"{IDENTIFICADOR}
INPUT_ID					"@"{IDENTIFICADOR}
ENTERO						[0-9]+
FLOAT						[0-9]+\.[0-9]+

%x COMENTARIO
%x STRING
%x OPER

%%
"/*"						this.begin('COMENTARIO')
<COMENTARIO>"*/"				this.popState()
<COMENTARIO>[^]					/* ignorar comentario */
"boolean"					return 'TIPO'
"case"						return 'CASE'
"char"						return 'TIPO'
"each"						return 'EACH'
"empty"						return 'EMPTY'
"else"						return 'ELSE'
("f"|"F")alse					return 'FALSE'
"float"						return 'TIPO'
"for"						return 'FOR'
"FORM"						return 'FORM'
"function"					return 'TIPO'
"id"						return 'ID'
"if"						return 'IF'
"IMG"						return 'IMG'
"INPUT_BOOL"					return 'INPUT_BOOL'
"INPUT_NUMBER"					return 'INPUT_NUMBER'
"INPUT_TEXT"					return 'INPUT_TEXT'
"int"						return 'TIPO'
"label"						return 'LABEL'
"string"					return 'TIPO'
"SUBMIT"					return 'SUBMIT'
"Switch"					return 'SWITCH'
"T"						return 'T'
"track"						return 'TRACK'
("t"|"T")"rue"					return 'TRUE'
"value"						return 'VALUE'
{IDSIMPLE}					return 'IDS'
{IDENTIFICADOR}					return 'IDENTI'
{IDESTILO}					return 'IDESTILO'
{INPUT_ID}					return 'INPUT_ID'
<INITIAL,STRING,OPER>{VARIABLE}			return 'VAR'
<INITIAL,OPER>{ENTERO}				return 'ENTERO'
<INITIAL,OPER>{FLOAT}				return 'FLOAT'
"#".*						/* ignorar comentario */
<INITIAL,OPER>"("				return 'PAREN_APER'
<INITIAL,OPER>")"				return 'PAREN_CERRA'
"{"						return 'LLAVE_APER'
"}"						return 'LLAVE_CERRA'
"[["						return 'TABLA_APER'
"]]"						return 'TABLA_CERRA'
"["						return 'CORCHE_APER'
"]"						return 'CORCHE_CERRA'
"<"						return 'MENOR'
">"						return 'MAYOR'
"<="						return 'MENOR_I'
">="						return 'MAYOR_I'
"=="						return 'IGUAL'
"!="						return 'DIFERENTE'
":"						return 'D_PUNTOS'
","						return 'COMA'
"||"						return 'OR'
"&&"						return 'AND'
"!"						return 'NEG'
\s+						/* ignorar espacios en blanco */
"\""						this.begin('STRING'); return 'COMILLA'
<STRING>"\\\""					yytext="\""; return 'STRING'
<STRING>"\""					this.popState(); return 'COMILLA'
<STRING>"\\`"					yytext="`"; return 'STRING'
<STRING>"\\n"					yytext="\n"; return 'STRING'
<STRING>"\\t"					yytext="\t"; return 'STRING'
<STRING>"`"					this.yybegin('OPER'); return 'OPER'
<STRING>[^]					return 'STRING'
<OPER>"`"					this.popState(); return 'OPER'
<OPER>\s+					/* ignorar espacio en blanco */
<OPER>"+"					return 'SUMA'
<OPER>"-"					return 'RESTA'
<OPER>"/"					return 'DIVI'
<OPER>"*"					return 'MULTI'
<OPER>"%"					return 'MOD'
<OPER>.						/* manejar el error lexico */
<<EOF>>						return 'EOF'
.						/* manejar error con arreglo */
/lex
%start componente
%%

componente: nombre PAREN_APER parametros PAREN_CERRA 
	LLAVE_APER elementos LLAVE_CERRA EOF
	;
	
elementos: elemento 
	| elementos elemento
	;
	
elemento: seccion
	| tabla
	| texto
	| imagen
	| formulario
	| for
	| condicional
	| switch
	;
	
switch: SWITCH PAREN_APER variable PAREN_CERRA LLAVE_APER 
	casos LLAVE_CERRA
	;
	
casos: lista_casos COMA default
	| lista_casos
	| 
	;
	
default: DEFAULT LLAVE_APER 
	elementos LLAVE_CERRA
	;

listas_casos: caso
	| listas_caso COMA caso
	;
	
caso: CASE expr LLAVE_APER elementos LLAVE_CERRA
	;
	
condicional: IF PAREN_APER condiciones PAREN_CERRA LLAVE_APER 
	elementos LLAVE_CERRA else
	;
	
condiciones: condicion
	| condiciones AND condicion
	| condiciones OR condicion
	| NEG PAREN_APER condiciones PAREN_CERRA
	| PAREN_APER condiciones PAREN_CERRA
	;
	
condicion: expr MAYOR expr
	| expr MENOR expr
	| expr MAYOR_I expr
	| expr MENOR_I expr
	| expr IGUAL expr
	| expr DIFERENTE expr
	;
	
else: ELSE LLAVE_APER elementos LLAVE_CERRA
	| ELSE condicional
	|
	;
	
for: for_each
	| for_comp
	;
	
for_comp: for PAREN_APER for_eles PAREN_CERRA 
	TRACK VAR LLAVE_APER elementos LLAVE_CERRA empty
	;
	
for_eles: for_ele
	| for_eles COMA for_ele
	;
	
for_each: FOR EACH PAREN_APER for_ele 
	PAREN_CERRA LLAVE_APER elementos LLAVE_CERRA
	empty
	;
	
empty: EMPTY LLAVE_APER elementos LLAVE_CERRA
	|
	;

for_ele: VAR D_PUNTOS VAR
	;
	
formulario: FORM estilo LLAVE_APER form LLAVE_CERRA submit
	;
	
form: elemento
	| form elemento
	| input
	| form input
	;
	
input: input_texto
	| input_number
	| input_bool
	;
	
input_number: INPUT_NUMBER estilo PAREN_APER contenido_input PAREN_CERRA
	;
	
input_bool: INPUT_BOOL estilo PAREN_APER contenido_input PAREN_CERRA
	;
	
input_texto: INPUT_TEXT estilo PAREN_APER contenido_input PAREN_CERRA
	;
	
contenido_input: id COMA label COMA value
	;
	
value: VALUE D_PUNTOS valor
	;
	
valor: variable
	| cadena
	| TRUE
	| FALSE
	;
	
label: LABEL D_PUNTOS cadena
	;
	
id: ID D_PUNTOS cadena
	;
	
submit: SUBMIT estilo LLAVE_APER contenido LLAVE_CERRA
	|
	;
	
contenido: label FUNCTION VAR PAREN_APER params PAREN_CERRA
	;
	
params: lista_params
	|
	;
	
lista_params: INPUT_ID
	| lista_params COMA INPUT_ID
	;
	
imagen: IMG estilo PAREN_APER urls PAREN_CERRA
	;
	
urls: url
	| urls COMA url
	;
	
url: cadena
	| variable
	;
	
texto: T PAREN_APER expr PAREN_CERRA
	;
	
cadena: COMILLA string COMILLA
	;
	
string: contenido_string
	|
	;
	
contenido_strig: STRING
	| contenido_string STRING
	| operacion
	| contenido_string operacion
	;
	
operacion: OPER expr OPER
	;
	
expr: expr SUMA term
	| expr RESTA term
	| term
	;
	
term: term MULTI mod
	| term DIVI mod
	| mod
	;
	
mod: mod MOD unario
	| unario
	;
	
unario : SUMA factor
	| RESTA factor
	| factor
	;
	
factor : variable
	| ENTERO
	| FLOAT
	| cadena
	| TRUE
	| FALSE
	| PAREN_APER expr PAREN_CERRA
	;
	
variable: VAR
	| VAR CORCHE_APER expr CORCHE_CERRA
	;
	
tabla: estilo TABLA_APER columnas TABLA_CERRA
	;
	
columnas: columna
	| columnas columna
	;
	
columna: estilo TABLA_APER filas TABLA_CERRA
	;
	
filas: fila
	| filas fila
	;
	
fila: estilo TABLA_APER elemento TABLA_CERRA
	;
	
seccion: estilo CORCHE_APER elementos CORCHE_CERRA
	;
	
estilo: MENOR estilos MAYOR
	|
	;
	
estilos: nombre_estilo
	| estilos COMA nombre_estilo
	;
	
nombre_estilo: IDS
	| IDESTILO
	;
	
parametros: lista_parametros
	|
	;
	
lista_parametros: parametro
	| lista_parametros COMA parametro
	;
	
parametro: tipo IDENTI
	;
	
tipo: TIPO
	|TIPO CORCHE_APER CORCHE_CERRA
	;

nombre: IDS
	| IDENTI
	;
