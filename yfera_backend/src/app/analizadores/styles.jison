%lex

%options locations
%options flex

LETRA						[a-zA-Z]
IDENTIFICADOR					{LETRA}[a-zA-Z0-9\-]*
VARIABLE					"$"{LETRA}[a-zA-Z0-9_]*
IDENTI_VAR					{IDENTIFICADOR}[\-]?{VARIABLE}(-{IDENTIFICADOR})?
NUMERO						[0-9]+
H_BASE						[0-9a-fA-F]
HEX						{H_BASE}

%x COMENTARIO
%x HEXAD
%x COMEN_2

%%
<HEXAD>{HEX}					yytext = "#"+yytext; this.popState(); return 'HEX';
<HEXAD>.					this.begin('COMEN_2');
<HEXAD>\n					this.popState();
<COMEN_2>.					/* ignorar comentario de una linea */
<COMEN_2>\n					this.begin('INITIAL')
"/*"						this.begin('COMENTARIO')
<COMENTARIO>"*/"				this.popState()
<COMENTARIO>[^]					/* ignorar comentario */
"#"						this.begin('HEX')
"align"						return 'ALIGN'
"background"					return 'BACKGROUND'
"black"						return 'COLOR_D'
"blue"						return 'COLOR_D'
"border"					return 'BORDER'
"bottom"					return 'BOTTOM'
"CENTER"					return 'DIRECTION'
"color"						return 'COLOR'
"CURSIVE"					return 'FUENTE'
"DOTTED"					return 'B_STYLE'
"DOUBLE"					return 'B_STYLE'
"extends"					return 'EXTENDS'
"font"						return 'FONT'
"from"						return 'FROM'
"gray"						return 'COLOR_D'
"green"						return 'COLOR_D'
"height"					return 'NUM_SIMPLE'
"HELVETICA"					return 'FUENTE'
"left"						return 'LEFT'
"LEFT"						return 'DIRECTION'
"LINE"						return 'B_STYLE'
"lightgray"					return 'COLOR_D'
"margin"					return 'MARGIN'
"max-height"					return 'NUM_SIMPLE'
"max-width"					return 'NUM_SIMPLE'
"min-height"					return 'NUM_SIMPLE'
"min-width"					return 'NUM_SIMPLE'
"MONO"						return 'FUENTE'
"padding"					return 'PADDING'
"radius"					return 'RADIUS'
"red"						return 'COLOR_D'
"rgb"						return 'RGB'
"right"						return 'RIGHT'
"RIGHT"						return 'DIRECTION'
"SANS"						return 'FUENTE'
"SANS"(\s+|_)"SERIF"				yytext = "SANS_SERIF"; return 'FUENTE'
"size"						return 'SIZE'
"style"						return 'STYLE'
"text"						return 'TEXT'
"through"					return 'THROUGH'
"to"						return 'TO'
"top"						return 'TOP'
"violet"					return 'COLOR_D'
"width"						return 'NUM_SIMPLE'
"white"						return 'COLOR_D'
"@for"						return 'FOR'
{IDENTIFICADOR}					return 'IDENTI'
{VARIABLE}					return 'VAR'
{IDENTI_VAR}					return 'IDENTI_VAR'
"{"						return 'LLAVE_APER'
"}"						return 'LLAVE_CERRA'
"="						return 'ASIGNACION'
";"						return 'P_COMA'
"+"						return 'SUMA'
"-"						return 'RESTA'
"*"						return 'MULTI'
"/"						return 'DIVI'
"%"						return 'MODULO'
"("						return 'PAREN_APER'
")"						return 'PAREN_CERRA'
","						return 'COMA'
{NUMERO}					return 'NUMERO'
{NUMERO}"%"					return 'PORCENTAJE'
<<EOF>>						return 'EOF'
\s+						/* ignorar espacios en blanco */
.						/* manejar el error */

/lex

%start estilos
%%

estilos : clase
	| estilos clase
	| ciclo
	| estilos ciclo
	| estilos EOF
	;

clase : identi LLAVE_APER atributos LLAVE_CERRA
	;
	
identi : nombre
	| identi extends nombre
	;

nombre : IDENTI
	| IDENTI_VAR
	;

atributos : atributo P_COMA
	| atributos atributo P_COMA
	;

atributo : atributo_numerico
	| atributo_color
	| atributo_estilo
	| atributo_px
	| border ASIGNACION combinado
	;
	
border : BORDER 
	| BORDER direccion
	;
	
combinado : expr B_STYLE color
	;
	
atributo_estilo : tipo_estilo ASIGNACION B_STYLE
	;
	
tipo_estilo : BORDER STYLE
	| BORDER direccion STYLE
	;
	
atributo_color : tipo_color ASIGNACION color
	;
	
tipo_color : BACKGROUND COLOR
	| COLOR
	| BORDER COLOR
	| BORDER direccion COLOR
	;
	
color : HEX
	| RGB PAREN_APER expr COMA expr COMA expr PAREN_CERRA
	| COLOR_D
	;

atributo_numerico : tipo_numerico ASIGNACION valor
	;
	
atributo_px : tipo_px ASIGNACION expr
	;
	
tipo_px : BORDER WIDTH
	| BORDER direccion WIDTH
	;
	
tipo_numerico : NUM_SIMPLE
	| TEXT SIZE
	| PADDING
	| PADDING direccion
	| MARGIN
	| MARGIN direccion
	| BORDER RADIUS
	;
	
direccion : LEFT
	| TOP
	| RIGHT
	| BOTTOM
	;
	
valor : expr
	| PORCENTAJE
	;
	
expr : expr SUMA term
	| expr RESTA term
	| term
	;
	
term : term MULTI mod
	| term DIVI mod
	| mod
	;
	
mod : mod MODULO unario
	| PORCENTAJE unario
	| unario
	;
	
unario : SUMA factor
	| RESTA factor
	| factor
	;
	
factor : VAR
	| NUMERO
	| PAREN_APER expr PAREN_CERRA
	;
	
ciclo : FOR VAR FROM NUMERO tipo NUMERO bloque
	;
	
tipo : THROUGH
	| TO
	;
	
bloque : LLAVE_APER clases LLAVE_CERRA
	;
	
clases : clase
	| clases clase
	;
