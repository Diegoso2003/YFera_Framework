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
        case "'BREAK'": return "'break'";
        case "'CONTINUE'": return "'continue'";
        case "'COLUMNS'": return "'COLUMNS'";
        case "'DELETE'": return "'DELETE'";
        case "'DO'": return "'do'";
        case "'ELSE'": return "'else'";
        case "'EXECUTE'": return "'execute'";
        case "'FALSE'": return "'False'";
        case "'FOR'": return "'for'";
        case "'FUNCTION'": return "'function'";
        case "'IF'": return "'if'";
        case "'IMPORT'": return "'import'";
        case "'IN'": return "'IN'";
        case "'LOAD'": return "'load'";
        case "'MAIN'": return "'main'";
        case "'TABLE'": return "'TABLE'";
        case "'TRUE'": return "'True'";
        case "'WHILE'": return "'while'";
        case "'COMPONENTE'": return "'@identificador'";
        case "'IDENTI'": return "'identificador'";
        case "'ENTERO'": return "'número entero'";
        case "'FLOAT'": return "'número decimal'";
        case "'CHAR'": return "'carácter'";
        case "'STRING'": return "'texto'";
        case "'COMILLA'": return "'\"'";
        case "'ACTUAL'": return "'.'";
        case "'SALIR'": return "'..'";
        case "'SLASH'": return "'/'";
        case "'CARPETA'": return "'nombre_carpeta'";
        case "'A_STYLES'": return "'.styles'";
        case "'A_COMPON''": return "'.comp'";
        case "'A_PRINCIPAL'": return "'.y'";
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
        case "'ASIGNACION'": return "'='";
        case "'OR'": return "'||'";
        case "'AND'": return "'&&'";
        case "'NEG'": return "'!'";
        case "'PAREN_APER'": return "'('";
        case "'PAREN_CERRA'": return "')'";
        case "'LLAVE_APER'": return "'{'";
        case "'LLAVE_CERRA'": return "'}'";
        case "'CORCHE_APER'": return "'['";
        case "'CORCHE_CERRA'": return "']'";
        case "'D_PUNTOS'": return "':'";
        case "'COMA'": return "','";
        case "'P_COMA'": return "';'";
        case "'OPER'": return "'`'";
        case "'EOF'": return "'fin de archivo'";
        default: return token;
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

IDENTI						[a-zA-Z][a-zA-Z0-9_]*
COMPONENTE					"@"{IDENTI}
N_CARPETA					[^/\x00]+
STYLES						[^/\x00]+\."styles"
COMPON						[^/\x00]+\."comp"
PRINCIPAL					[^/\x00]+\."y"
ENTERO						[0-9]+
FLOAT						[0-9]+\.[0-9]+
CHAR						"'"("\n"|"\t"|"\r"|"\'"|"\\\\"|"\b"|[^'\\\n])"'"

%x COMENTARIO
%x STRING
%s IMPORT
%x CARPETA
%x OPER 

%%
"/*"						this.begin('COMENTARIO')
<COMENTARIO>"*/"				this.popState()
<COMENTARIO>[^]					/* ignorar comentario */
<IMPORT>"\""					this.begin('CARPETA'); return 'COMILLA';
<CARPETA>"."					return 'ACTUAL'
<CARPETA>".."					return 'SALIR'
<CARPETA>"/"					return 'SLASH'
<CARPETA>{N_CARPETA}				return 'CARPETA'
<CARPETA>{STYLES}				return 'A_STYLES'
<CARPETA>{COMPON}				return 'A_COMPON'
<CARPETA>{PRINCIPAL}				return 'A_PRINCIPAL'
<CARPETA>"\""					this.popState(); return 'COMILLA';
<CARPETA>.					{
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
<IMPORT>";"					this.popState(); return 'P_COMA';
"#".*						/* ignorar comentarios de una sola línea */
"boolean"					return 'TIPO'
"break"						return 'BREAK'
"char"						return 'TIPO'
"COLUMNS"					return 'COLUMNS'
"continue"					return 'CONTINUE'
"DELETE"					return 'DELETE'
"do"						return 'DO'
"else"						return 'ELSE'
"execute"					return 'EXECUTE'
"False"						return 'FALSE'
"float"						return 'TIPO'
"for"						return 'FOR'
"function"					return 'FUNCTION'
"load"						return 'LOAD'
"main"						return 'MAIN'
"if"						return 'IF'
"import"					this.begin('IMPORT'); return 'IMPORT'
"IN"						return 'IN'
"int"						return 'TIPO'
"string"					return 'TIPO'
"TABLE"						return 'TABLE'
"True"						return 'TRUE'
"while"						return 'WHILE'
{IDENTI}					return 'IDENTI'
{COMPONENTE}					return 'COMPONENTE'
{CHAR}						return 'CHAR'
"\""						this.begin('STRING'); return 'COMILLA'
<STRING>"\\\""					yytext="\""; return 'STRING'
<STRING>"\""					this.popState(); return 'COMILLA'
<STRING>"\\`"					yytext="`"; return 'STRING'
<STRING>"\\n"					yytext="\n"; return 'STRING'
<STRING>"\\t"					yytext="\t"; return 'STRING'
<STRING>"`"					this.begin('OPER'); return 'OPER'
<STRING>[^]					return 'STRING'
"("						return 'PAREN_APER'
")" 						return 'PAREN_CERRA'
"["						return 'CORCHE_APER'
"]"						return 'CORCHE_CERRA'
"{"						return 'LLAVE_APER'
"}"						return 'LLAVE_CERRA'
";"						return 'P_COMA'
","						return 'COMA'
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
"<"						return 'MENOR'
">"						return 'MAYOR'
"<="						return 'MENOR_I'
">="						return 'MAYOR_I'
"=="						return 'IGUAL'
"!="						return 'DIFERENTE'
"="						return 'ASIGNACION'
"||"						return 'OR'
"&&"						return 'AND'
"!"						return 'NEG'
\s+						/* ignorar espacion en blanco */
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
%start principal
%%

principal: imports definicion funciones main
	;
	
main : MAIN LLAVE_APER contenido_main LLAVE_CERRA
	;
	
contenido_main : operacion
	| error
	| contenido_main operacion
	| contenido_main error
	;

operacion : COMPONENTE PAREN_APER param_c PAREN_CERRA
	| ciclo
	| for
	| condicional
	;
	
ciclo: WHILE PAREN_APER condiciones PAREN_CERRA LLAVE_APER
	contenido_main LLAVE_CERRA
	;
	
for: FOR PAREN_APER IDENTI ASIGNACION expr P_COMA condiciones P_COMA IDENTI ASIGNACION expr
	PAREN_CERRA contenido_main LLAVE_APER LLAVE_CERRA
	;
	
param_c: variables
	|
	;

condicional: IF PAREN_APER condiciones PAREN_CERRA LLAVE_APER 
	contenido_main LLAVE_CERRA else_c				{ $$ = new CondicionalIf($3, $6, $8); }
	;

else_c: ELSE LLAVE_APER contenido_main LLAVE_CERRA			{ $$ = new CondicionElse($3) }
	| ELSE condicional					{ $$ = $2 }
	|							{ $$ = undefined }
	;

imports : import
	| error
	| imports import
	| imports error
	;
	
funciones : funcion
	| funciones funcion
	| funciones error
	;
	
funcion : FUNCTION IDENTI PAREN_APER parametros_val PAREN_CERRA LLAVE_APER 
	contenido LLAVE_CERRA
	;
	
parametros_val : parametros
	|
	;
	
contenido : LOAD expr P_COMA
	;
	
parametros : parametro
	| error
	| parametros error
	| parametros parametro
	;
	
parametro : TIPO IDENTI
	| TIPO CORCHE_APER CORCHE_CERRA IDENTI
	;
	
definicion: def_var
	| definicion error
	| definicion def_var
	;
	
def_var : TIPO IDENTI ASIGNACION valor P_COMA
	| TIPO CORCHE_APER CORCHE_CERRA IDENTI ASIGNACION valor P_COMA
	;
	
valor : expr
	| lista
	| CORCHE_APER expr CORCHE_CERRA
	;
	
lista: LLAVE_APER variables LLAVE_CERRA
	;
	
variables: expr
	| variables COMA expr
	;
	
import : IMPORT COMILLA ruta COMILLA P_COMA
	;
	
ruta : ACTUAL SLASH direccion
	| salida SLASH direccion
	;
	
direccion : carpetas archivo
	| archivo
	;
	
archivo : A_STYLES
	| A_COMPON
	| A_PRINCIPAL
	;
	
carpetas: carpeta
	| carpetas SLASH carpeta
	;
	
salida : SALIDA
	| salida SLASH SALIDA
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
       	| CHAR
       	;
       	
variable: IDENTI							{ $$ = new Variable(new Simbolo($1, @1.first_line, @1.first_column), $1); }
	| IDENTI CORCHE_APER expr CORCHE_CERRA			{ $$ = new VariableArreglo(new Simbolo($1, @1.first_line, @1.first_column), $1, $3); }
	;
