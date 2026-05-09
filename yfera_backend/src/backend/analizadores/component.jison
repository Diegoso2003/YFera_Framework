%{
    const { Componente } = require('../component/Componente');
const { Parametro } = require('../Parametro');
const { TipoVar } = require('../TipoVar');
const { Seccion } = require('../elementoshtml/Seccion');
const { Tabla } = require('../elementoshtml/Tabla');
const { Columna } = require('../elementoshtml/Columna');
const { Fila } = require('../elementoshtml/Fila');
const { Texto } = require('../elementoshtml/Texto');
const { Imagen } = require('../elementoshtml/Imagen');
const { Formulario } = require('../elementoshtml/Formulario');
const { Submit } = require('../Elementos/Submit');
const { InputText } = require('../Inputs/TiposInputs/InputText');
const { InputNumber } = require('../Inputs/TiposInputs/InputNumber');
const { InputBool } = require('../Inputs/TiposInputs/InputBool');
const { ContenidoInput } = require('../Inputs/ContenidoInput');
const { Value } = require('../Inputs/Value');
const { Label } = require('../Inputs/Label');
const { Id } = require('../Inputs/Id');
const { ForEach } = require('../ciclos/ForEach');
const { ForCompuesto } = require('../ciclos/ForCompuesto');
const { ElementoFor } = require('../Elementos/ElementoFor');
const { CondicionalIf } = require('../condicionales/CondicionalIf');
const { CondicionElse } = require('../condicionales/CondicionElse');
const { CondicionS } = require('../Condiciones/CondicionS');
const { CondicionParen } = require('../Condiciones/CondicionParen');
const { Comparacion } = require('../Condiciones/Comparacion');
const { ESwitch } = require('../Switch/ESwitch');
const { Caso } = require('../Switch/Caso');
const { Default } = require('../Switch/Default');
const { Operacion } = require('../Expresiones/Operacion');
const { Unario } = require('../Expresiones/Unario');
const { Incremento } = require('../Expresiones/Incremento');
const { VariableArreglo } = require('../Expresiones/VariableArreglo');
const { Literal } = require('../Expresiones/Literal');
const { Parentesis } = require('../Expresiones/Parentesis');
const { Cadena } = require('../Expresiones/Cadena');
const { Tipo } = require('../Tipo');
const { Variable } = require('../Expresiones/Variable');
const { Simbolo } = require('../Simbolo');
    const { RegistroErrores } = require('../RegistroErrores');
    const errorManager = RegistroErrores.getInstance();

function traducirToken(token) {
    switch(token) {
        case "'TIPO'": return "'boolean | char | float | int | string'";
        case "'CASE'": return "'case'";
        case "'DEFAULT'": return "'default'";
        case "'EACH'": return "'each'";
        case "'EMPTY'": return "'empty'";
        case "'ELSE'": return "'else'";
        case "'FALSE'": return "'false'";
        case "'TRUE'": return "'true'";
        case "'FOR'": return "'for'";
        case "'FORM'": return "'FORM'";
        case "'FUNCTION'": return "'function'";
        case "'ID'": return "'id'";
        case "'IF'": return "'if'";
        case "'IMG'": return "'IMG'";
        case "'INPUT_BOOL'": return "'INPUT_BOOL'";
        case "'INPUT_NUMBER'": return "'INPUT_NUMBER'";
        case "'INPUT_TEXT'": return "'INPUT_TEXT'";
        case "'LABEL'": return "'label'";
        case "'SUBMIT'": return "'SUBMIT'";
        case "'SWITCH'": return "'Switch'";
        case "'T'": return "'T'";
        case "'TRACK'": return "'track'";
        case "'VALUE'": return "'value'";
        case "'IDS'": return "'identificador simple'";
        case "'IDENTI'": return "'identificador'";
        case "'IDESTILO'": return "'identificador con guiones'";
        case "'INPUT_ID'": return "'@identificador'";
        case "'VAR'": return "'$variable'";
        case "'ENTERO'": return "'número entero'";
        case "'FLOAT'": return "'número decimal'";
        case "'STRING'": return "'texto'";
        case "'COMILLA'": return "'\"'";
        case "'INCRE'": return "'++' | '--'";
        case "'SUMA'": return "'+'";
        case "'RESTA'": return "'-'";
        case "'DIVI'": return "'/'";
        case "'MULTI'": return "'*'";
        case "'MOD'": return "'%'";
        case "'MENOR'": return "'<'";
        case "'MAYOR'": return "'>'";
        case "'MENOR_I'": return "'<='";
        case "'MAYOR_I'": return "'>='";
        case "'IGUAL'": return "'=='";
        case "'DIFERENTE'": return "'!='";
        case "'OR'": return "'||'";
        case "'AND'": return "'&&'";
        case "'NEG'": return "'!'";
        case "'PAREN_APER'": return "'('";
        case "'PAREN_CERRA'": return "')'";
        case "'LLAVE_APER'": return "'{'";
        case "'LLAVE_CERRA'": return "'}'";
        case "'CORCHE_APER'": return "'['";
        case "'CORCHE_CERRA'": return "']'";
        case "'TABLA_APER'": return "'[['";
        case "'TABLA_CERRA'": return "']]'";
        case "'D_PUNTOS'": return "':'";
        case "'COMA'": return "','";
        case "'EOF'": return "'fin de archivo'";
        default: return token;
    }
}

    function construirDescripcionError(expected) {
        if (!expected || expected.length === 0) {
            return "Ya no se esperaba ningún token en este punto";
        }
        const tokens = expected.map(t => traducirToken(t));
        return `Se esperaba: ${tokens.join(" | ")}`;
    }

    parser.parseError = function (str, hash) {
        errorManager.agregarError({
            tipo: "Sintactico",
            lexema: hash.text,
            linea: (hash.loc?.first_line || 0),
            columna: (hash.loc?.first_column || 0),
            descripcion: construirDescripcionError(hash.expected)
        });
        
        return;
    };
%}
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
FLOAT						[0-9]+"."[0-9]+

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
"default"					return 'DEFAULT'
"each"						return 'EACH'
"empty"						return 'EMPTY'
"else"						return 'ELSE'
("f"|"F")"alse"					return 'FALSE'
"float"						return 'TIPO'
"for"						return 'FOR'
"FORM"						return 'FORM'
"function"					return 'FUNCTION'
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
<STRING>"`"					this.begin('OPER'); return 'OPER'
<STRING>[^]					return 'STRING'
<OPER>"`"					this.popState(); return 'OPER'
<OPER>\s+					/* ignorar espacio en blanco */
<INITIAL,OPER>"++"				return 'INCRE'
<INITIAL,OPER>"+"				return 'SUMA'
<INITIAL,OPER>"--"				return 'INCRE'
<INITIAL,OPER>"-"				return 'RESTA'
<INITIAL,OPER>"/"				return 'DIVI'
<INITIAL,OPER>"*"				return 'MULTI'
<INITIAL,OPER>"%"				return 'MOD'
<OPER>.						{
    if (yytext && yytext.length > 0) {
        const errorLexico = {
            tipo: "Lexico",
            lexema: yytext,
            linea: yylloc.first_line,
            columna: yylloc.first_column+1,
            descripcion: `Caracter no aceptado en operaciones aritmeticas: '${yytext}'`
        };
        
        errorManager.agregarError(errorLexico);
    }
}
<<EOF>>						return 'EOF'
.						{
    if (yytext && yytext.length > 0) {
        const errorLexico = {
            tipo: "Lexico",
            lexema: yytext,
            linea: yylloc.first_line,
            columna: yylloc.first_column+1,
            descripcion: `Caracter no reconocido: '${yytext}'`
        };
        
        errorManager.agregarError(errorLexico);
    }
}
/lex
%start componente
%%

componente: nombre PAREN_APER parametros PAREN_CERRA 
	LLAVE_APER elementos LLAVE_CERRA EOF			{ return new Componente($1, $3, $6); }
	;
	
elementos: elemento 						{ $$ = [$1] }
	| error							{ $$ = [] }
	| elementos elemento					{ $$ = $1; $1.push($2); }
	| elementos error					{ $$ = $1 }
	;
	
elemento: seccion						{ $$ = $1 }
	| tabla							{ $$ = $1 }
	| texto							{ $$ = $1 }
	| imagen						{ $$ = $1 }
	| formulario						{ $$ = $1 }
	| for_ciclo						{ $$ = $1 }
	| condicional						{ $$ = $1 }
	| switch_c						{ $$ = $1 }
	;
	
switch_c: SWITCH PAREN_APER expr PAREN_CERRA LLAVE_APER 
	casos LLAVE_CERRA					{ $$ = new ESwitch($3, $6); }
	;
	
casos: lista_casos COMA c_default				{ $$ = $1; $1.push($3) }
	| lista_casos						{ $$ = $1 }
	| 							{ $$ = [] }
	;
	
c_default: DEFAULT LLAVE_APER 
	elementos LLAVE_CERRA					{ $$ = new Default($3); }
	;

lista_casos: caso						{ $$ = [$1] }
	| error							{ $$ = [] }
	| lista_casos error					{ $$ = $1 }
	| lista_casos COMA caso					{ $$ = $1; $1.push($3); }
	;
	
caso: CASE expr LLAVE_APER elementos LLAVE_CERRA		{ $$ = new Caso($2, $4, true); }
	;
	
condicional: IF PAREN_APER condiciones PAREN_CERRA LLAVE_APER 
	elementos LLAVE_CERRA else_c				{ $$ = new CondicionalIf($3, $6, $8); }
	;
	
condiciones: condicion						{ $$ = $1 }
	| condiciones AND condicion				{ $$ = new CondicionS($1, $2, $3); }
	| condiciones OR condicion				{ $$ = new CondicionS($1, $2, $3); }
	| NEG PAREN_APER condiciones PAREN_CERRA		{ $$ = new CondicionParen($3, true) }
	;
	
condicion: expr MAYOR expr					{ $$ = new Comparacion($1, $2, $3) }
	| expr MENOR expr					{ $$ = new Comparacion($1, $2, $3) }
	| expr MAYOR_I expr					{ $$ = new Comparacion($1, $2, $3) }
	| expr MENOR_I expr					{ $$ = new Comparacion($1, $2, $3) }
	| expr IGUAL expr					{ $$ = new Comparacion($1, $2, $3, true) }
	| expr DIFERENTE expr					{ $$ = new Comparacion($1, $2, $3, true) }
	| expr							{ $$ = $1 }
	;
	
else_c: ELSE LLAVE_APER elementos LLAVE_CERRA			{ $$ = new CondicionElse($3) }
	| ELSE condicional					{ $$ = $2 }
	|							{ $$ = undefined }
	;
	
for_ciclo: for_each						{ $$ = $1 }
	| for_comp						{ $$ = $1 }
	;
	
for_comp: FOR PAREN_APER for_eles PAREN_CERRA 
	TRACK VAR LLAVE_APER elementos LLAVE_CERRA empty	{ $$ = new ForCompuesto($3, new Simbolo($6, @6.first_line, @6.first_column), $8, $10); }
	;
	
for_eles: for_ele						{ $$ = [$1] }
	| error							{ $$ = [] }
	| for_eles COMA for_ele					{ $$ = $1; $1.push($3); }
	| for_eles error					{ $$ = $1 }
	;
	
for_each: FOR EACH PAREN_APER for_ele 
	PAREN_CERRA LLAVE_APER elementos LLAVE_CERRA
	empty							{ $$ = new ForEach($4, $7, $9) }
	;
	
empty: EMPTY LLAVE_APER elementos LLAVE_CERRA			{ $$ = $3 }
	|							{ $$ = [] }
	;

for_ele: VAR D_PUNTOS VAR					{ $$ = new ElementoFor($1, $3, new Simbolo($1, @1.first_line, @1.first_column), new Simbolo($3, @3.first_line, @3.first_column)) }
	;
	
formulario: FORM estilo LLAVE_APER form LLAVE_CERRA submit_c	{ $$ = new Formulario($2, $4, $6); }
	;
	
form: elemento							{ $$ = [$1] }
	| error							{ $$ = [] }
	| form error						{ $$ = $1 }
	| form elemento						{ $$ = $1; $1.push($2); }
	| input							{ $$ = [$1] }
	| form input						{ $$ = $1; $1.push($2); }
	;
	
input: input_texto						{ $$ = $1 }
	| input_number						{ $$ = $1 }
	| input_bool						{ $$ = $1 }
	;
	
input_number: INPUT_NUMBER estilo PAREN_APER 
	contenido_input PAREN_CERRA				{ $$ = new InputNumber($2, $4); }
	;
	
input_bool: INPUT_BOOL estilo PAREN_APER 
	contenido_input PAREN_CERRA				{ $$ = new InputBool($2, $4); }
	;
	
input_texto: INPUT_TEXT estilo PAREN_APER 
	contenido_input PAREN_CERRA				{ $$ = new InputText($2, $4); }
	;
	
contenido_input: id COMA label COMA value			{ $$ = new ContenidoInput($1, $3, $5); }
	;
	
value: VALUE D_PUNTOS expr					{ $$ = new Value($3); }
	;
	
label: LABEL D_PUNTOS expr					{ $$ = new Label($3); }
	;
	
id: ID D_PUNTOS expr						{ $$ = new Id(new Simbolo($1, @1.first_line, @1.first_column), $3); }
	;
	
submit_c: SUBMIT estilo LLAVE_APER contenido LLAVE_CERRA	{ $$ = $4; $4.setEstilos($2); }
	|							{ $$ = undefined }
	;
	
contenido: label FUNCTION D_PUNTOS VAR PAREN_APER params PAREN_CERRA	{ $$ = new Submit($1, new Simbolo($3, @3.first_line, @3.first_column), $5); }
	;
	
params: lista_params						{ $$ = $1 }
	|							{ $$ = [] }
	;
	
lista_params: INPUT_ID						{ $$ = [$1] }
	| error							{ $$ = [] }
	| lista_params COMA INPUT_ID				{ $$ = $1; $1.push($3); }
	| lista_params error					{ $$ = $1; }
	;
	
imagen: IMG estilo PAREN_APER urls PAREN_CERRA			{ $$ = new Imagen($2, $4); }
	;
	
urls: url							{ $$ = [$1] }
	| error							{ $$ = [] }
	| urls COMA url						{ $$ = $1; $1.push($3); }
	| urls error						{ $$ = $1 }
	;
	
url: cadena							{ $$ = $1 }
	| variable						{ $$ = $1 }
	;
	
texto: T estilo PAREN_APER expr PAREN_CERRA			{ $$ = new Texto($2, $4); }
	;
	
cadena: COMILLA string COMILLA					{ $$ = new Cadena(new Simbolo($1, @1.first_line, @1.first_column), $2); }
	;
	
string: contenido_string					{ $$ = $1 }
	|							{ $$ = [] }
	;
	
contenido_string: STRING					{ $$ = [$1]; }
	| contenido_string STRING				{ $$ = $1; $1.push($2); }
	| operacion						{ $$ = [$1] }
	| contenido_string operacion				{ $$ = $1; $1.push($2); }
	| variable						{ $$ = [$1] }
	| contenido_string variable				{ $$ = $1; $1.push($2); }
	;
	
operacion: OPER expr OPER					{ $$ = $2; }
	;
	
expr : expr oper_aritmetica unario				{ $$ = new Operacion($1, $2, $3); }
     	| unario						{ $$ = $1 }
     	;
    
unario : factor
     	| simb factor						{ $$ = new Unario($1, $2); }
	| variable INCRE					{ $$ = new Incremento($1, $2, true); }
	| INCRE variable					{ $$ = new Incremento($1, $2); }
     	;
    
simb : SUMA							{ $$ = $1 }
	| RESTA							{ $$ = $1; }
	;
     
oper_aritmetica : SUMA						{ $$ = $1; }
	| RESTA							{ $$ = $1; }
	| MULTI							{ $$ = $1; }
	| DIVI							{ $$ = $1; }
	| MOD							{ $$ = $1; }
	;

factor : variable						{ $$ = $1; }
       	| ENTERO						{ $$ = new Literal(new Simbolo($1, @1.first_line, @1.first_column), $1, Tipo.ENTERO); }
       	| FLOAT							{ $$ = new Literal(new Simbolo($1, @1.first_line, @1.first_column), $1, Tipo.FLOAT); }
       	| cadena						{ $$ = $1 }
       	| TRUE							{ $$ = new Literal(new Simbolo($1, @1.first_line, @1.first_column), "true", Tipo.BOOLEANO); }
       	| FALSE							{ $$ = new Literal(new Simbolo($1, @1.first_line, @1.first_column), "false", Tipo.BOOLEANO); }
       	| PAREN_APER expr PAREN_CERRA				{ $$ = new Parentesis($2); }
       	| error							{ $$ = new Literal(new Simbolo('error', 0, 0), 'error', Tipo.ERROR); }
       	;
	
variable: VAR							{ $$ = new Variable(new Simbolo($1, @1.first_line, @1.first_column), $1); }
	| VAR CORCHE_APER expr CORCHE_CERRA			{ $$ = new VariableArreglo(new Simbolo($1, @1.first_line, @1.first_column), $1, $3); }
	;
	
tabla: estilo TABLA_APER columnas TABLA_CERRA			{ $$ = new Tabla($1, $3); }
	;
	
columnas: columna						{ $$ = $1 }
	| columnas error					{ $$ = $1 }
	| columnas columna					{ $$ = $1; $1.push($2); }
	| error							{ $$ = [] }
	;
	
columna: estilo TABLA_APER filas TABLA_CERRA			{ $$ = new Columna($1, $3); }
	;
	
filas: fila							{ $$ = [$1] }
	| filas error						{ $$ = $1 }
	| filas fila						{ $$ = $1; $1.push($2); }
	| error							{ $$ = [] }
	;
	
fila: estilo TABLA_APER elemento TABLA_CERRA			{ $$ = new Fila($1, [$3]); }
	;
	
seccion: estilo CORCHE_APER elementos CORCHE_CERRA		{ $$ = new Seccion($1, $3); }
	;
	
estilo: MENOR estilos MAYOR					{ $$ = $2; }
	|							{ $$ = []; }
	;
	
estilos: nombre_estilo						{ $$ = [$1]; }
	| estilos error						{ $$ = $1; }
	| estilos COMA nombre_estilo				{ $$ = $1; $1.push($3); }
	| error							{ $$ = [] }
	;
	
nombre_estilo: IDS						{ $$ = $1; }
	| IDESTILO						{ $$ = $1; }
	;
	
parametros: lista_parametros					{ $$ = $1 }
	|							{ $$ = [] }
	;
	
lista_parametros: parametro					{ $$ = [$1] }
	| error							{ $$ = []; }
	| lista_parametros COMA parametro			{ $$ = $1; $1.push($3); }
	| lista_parametros error				{ $$ = $1; }
	;
	
parametro: tipo nombre						{ $$ = new Parametro($1, $2); }
	;
	
tipo: TIPO							{ $$ = new TipoVar($1); }
	| TIPO CORCHE_APER CORCHE_CERRA				{ $$ = new TipoVar($1, true); }
	| FUNCTION						{ $$ = new TipoVar($1); }
	;

nombre: IDS							{ $$ = new Simbolo($1, @1.first_line, @1.first_column); }
	| IDENTI						{ $$ = new Simbolo($1, @1.first_line, @1.first_column); }
	;
