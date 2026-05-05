%lex

%options locations
%options flex

IDENTI						[a-zA-Z][a-zA-Z0-9_]*
ENTERO						[0-9]+
FLOAT						[0-9]+\.[0-9]+
CHAR						"'"("\n"|"\t"|"\r"|"\'"|"\\\\"|"\b"|[^'\\\n])"'"

%x COMENTARIO
%x STRING

%%
"/*"						this.begin('COMENTARIO')
<COMENTARIO>"*/"				this.popState()
<COMENTARIO>[^]					/* ignorar comentario */
"\""						this.begin('STRING'); return 'COMILLA'
<STRING>"\""					this.popState(); return 'COMILLA'
<STRING>[^]					return 'STRING'
"#".*						/* ignorar comentarios de una línea */
"boolean"					return 'TIPO'
"char"						return 'TIPO'
"COLUMNS"					return 'COLUMNS'
"DELETE"					return 'DELETE'
("F"|"f")"alse"					return 'FALSE'
"float"						return 'TIPO'
"IN"						return 'IN'
"int"						return 'TIPO'
"TABLE"						return 'TABLE'
("T"|"t")"rue"					return 'TRUE'
"string"					return 'TIPO'
{IDENTI}					return 'IDENTI'
";"						return 'P_COMA'
","						return 'COMA'
"."						return 'PUNTO'
"["						return 'CORCHE_APER'
"]"						return 'CORCHE_CERRA'
"("						return 'PAREN_APER'
")"						return 'PAREN_CERRA'
"+"						return 'SUMA'
"*"						return 'MULTI'
"/"						return 'DIVI'
"-"						return 'MENOS'
"%"						return 'MOD'
"="						return 'ASIGN'
{FLOAT}						return 'FLOAT'
{ENTERO}					return 'ENTERO'
{CHAR}						return 'CHAR'
\s+						/* ignorar espacios en blanco */
<<EOF>>						return 'EOF'
.						/* manejar error lexico. */
/lex
%start consultas
%%

consultas: consulta
	| consultas consulta
	;

consulta: crear_tabla
	| seleccion
	| registro
	| actualizacion
	;
	
actualizacion: IDENTI CORCHE_APER valores CORCHE_CERRA IN ENTERO P_COMA
	;
	
registro: IDENTI CORCHE_APER valores CORCHE_CERRA P_COMA
	;
	
valores: valor
	| valores COMA valor
	;
	
valor: IDENTI ASIGN expr
	;
	
seleccion: IDENTI PUNTO IDENTI P_COMA
	;
	
crear_tabla: TABLE IDENTI COLUMNS columnas_tabla P_COMA
	;
	
columnas_tabla: columna_tabla
	| columnas_tabla COMA columna_tabla
	;
	
columna_tabla: IDENTI ASIGN TIPO
	;
	
cadena: COMILLA caracteres COMILLA
	;
	
caracteres: STRING
	| caracteres STRING
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
	
unario: SUMA factor
	| RESTA factor
	| factor
	;
	
factor: ENTERO
	| FLOAT
	| cadena
	| TRUE
	| FALSE
	| CHAR
	| PAREN_APER expr PAREN_CERRA
	;
