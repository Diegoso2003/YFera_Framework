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
"float"						return 'FLOAT'
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
"("						return 'PAREN_APER'
")" 						return 'PAREN_CERRA'
"["						return 'CORCHE_APER'
"]"						return 'CORCHE_CERRA'
"{"						return 'LLAVE_APER'
"}"						return 'LLAVE_CERRA'
";"						return 'P_COMA'
","						return 'COMA'
"+"						return 'SUMA'
"++"						return 'INCREMENT'
"--"						return 'DECREMENT'
"-"						return 'RESTA'
"*"						return 'MULTI'
"/"						return 'DIVI'
"%"						return 'MULTI'
"<"						return 'MENOR'
">"						return 'MAYOR'
"<="						return 'MENOR_I'
">="						return 'MAYOR_I'
"=="						return 'IGUAL'
"!="						return 'DIFERENTE'
"||"						return 'OR'
"&&"						return 'AND'
"!"						return 'NEG'
\s+						/* ignorar espacion en blanco */
<<EOF>>						return 'EOF'
.						/* manejar errores de manera eficaz */
/lex
%start principal
%%

principal: imports definicion funciones main
	;
