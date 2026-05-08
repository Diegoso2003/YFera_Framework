%lex

%options locations
%options flex

LETRA						[a-zA-Z]
IDENTIFICADOR					{LETRA}[a-zA-Z0-9\-]*
VARIABLE					"$"{LETRA}[a-zA-Z0-9_]*
IDENTI_VAR					{IDENTIFICADOR}[\-]?{VARIABLE}(-{IDENTIFICADOR})?
NUMERO						[0-9]+
DECIMAL						{NUMERO}"."{NUMERO}
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
{DECIMAL}					return 'NUMERO'
{NUMERO}"%"					return 'PORCENTAJE'
<<EOF>>						return 'EOF'
\s+						/* ignorar espacios en blanco */
.						/* manejar el error */

/lex

%start estilos
%%

estilos : clase							{ $$ = [$1] }
	| estilos clase						{ $1.push($2); $$ = $1; }
	| ciclo							{ $$ = [$1] }
	| estilos ciclo						{ $$ = $1; $1.push($2); }
	| error							{ $$ = [] }
	| estilos error						{ $$ = $1 }
	| estilos EOF						{ return $1; }
	;

clase : identi LLAVE_APER atributos LLAVE_CERRA			{ $$ = new Clase($1, $3); }
	;
	
identi : nombre							{ $$ = $1; }
	| identi extends nombre					{ $$ = $1; $1.setPadre($3); }
	;

nombre : IDENTI							{ $$ = new NombreClase(new Simbolo($1, @1.first_line, @1.first_column), $1); }
	| IDENTI_VAR						{ $$ = new NombreClase(new Simbolo($1, @1.first_line, @1.first_column), $1, true); }
	;

atributos : atributo P_COMA					{ $$ = [$1] }
	| atributos atributo P_COMA				{ $$ = $1; $1.push($2); }
	| error P_COMA						{ $$ = []; }
	| atributos error P_COMA				{ $$ = $1; }
	;

atributo : atributo_numerico					{ $$ = $1 }
	| atributo_color					{ $$ = $1 }
	| atributo_estilo					{ $$ = $1 }
	| atributo_px						{ $$ = $1 }
	| border ASIGNACION combinado				{ $$ = new AtributoCombinado($1, $3); }		
	;
	
border : BORDER 						{ $$ = "border" }
	| BORDER DIRECTION					{ $$ = "border-"+$2+":"; }
	;
	
combinado : expr B_STYLE color					{ $$ = new Combinado($1, $2.toLowerCase(), $3); }
	;
	
atributo_estilo : tipo_estilo ASIGNACION B_STYLE		{ $$ = new AtributoEstilo($1, $3.toLowerCase()); }
	;
	
tipo_estilo : BORDER STYLE					{ $$ = "border-style:" }
	| BORDER DIRECCION STYLE				{ $$ = "border-"+$2+"-style:"; }
	;
	
atributo_color : tipo_color ASIGNACION color			{ $$ = new AtributoColor($1, $3); }
	;
	
tipo_color : BACKGROUND COLOR					{ $$ = "background-color:"; }
	| COLOR							{ $$ = "color:"; }
	| BORDER COLOR						{ $$ = "border-color:"; }
	| BORDER DIRECCION COLOR				{ $$ = "border-"+$2+"-color:"; }
	;
	
color : HEX							{ $$ = new ColorString($1); }
	| RGB PAREN_APER expr COMA expr COMA expr PAREN_CERRA	{ $$ = new ColorRgb($3, $5, $7); }
	| RGB error						{ $$ = new ColorString("red"); }
	| COLOR_D						{ $$ = new ColorString($1); }
	;

atributo_numerico : tipo_numerico ASIGNACION valor		{ $$ = new Atributo($1, $3); }
	;
	
atributo_px : tipo_px ASIGNACION expr				{ $$ = new Atributo($1, $3); }
	;
	
tipo_px : BORDER WIDTH						{ $$ = "border-width:" }
	| BORDER DIRECCION WIDTH				{ $$ = "border-"+$2+"-width"+":"; }
	;
	
tipo_numerico : NUM_SIMPLE					{ $$ = $1+":"; }
	| TEXT SIZE						{ $$ = "font-size:"; }
	| PADDING						{ $$ = "padding:" }
	| PADDING DIRECCION					{ $$ = "padding-"+$2+":";}
	| MARGIN						{ $$ = "margin:" }
	| MARGIN DIRECCION					{ $$ = "margin-"+$2+":"; }
	| BORDER RADIUS						{ $$ = "border-radius:"; }
	;
	
valor : expr							{ $$ = $1 }
	| PORCENTAJE						{ $$ = $1 }
	;
	
expr : expr SUMA term						{ $$ = new Suma($1, $3); }
	| expr RESTA term					{ $$ = new Resta($1, $2); }
	| term							{ $$ = $1; }
	;
	
term : term MULTI mod						{ $$ = new Multi($1, $3); }
	| term DIVI mod						{ $$ = new Division($1, $2); }
	| mod							{ $$ = $1; }
	;
	
mod : mod MODULO unario						{ $$ = new Modulo($1, $2); }
	| PORCENTAJE unario					{ $$ = new Modulo($1, $2); }
	| unario						{ $$ = $1 }
	;
	
unario : SUMA factor						{ $$ = $2 }
	| RESTA factor						{ $$ = Negativo($2); }
	| factor						{ $$ = $1 }
	;
	
factor : VAR							{ $$ = new Variable(new Simbolo($1, @1.first_line, @1.first_column), $1); }
	| NUMERO						{ $$ = new Numero(new Simbolo($1, @1.first_line, @1.first_column), $1); }
	| PAREN_APER expr PAREN_CERRA				{ $$ = $2 }
	| error							{ $$ = new Numero(new Simbolo("error", 0, 0), "0", true); }
	;
	
ciclo : FOR VAR FROM NUMERO tipo NUMERO bloque			{ $$ = new CicloFor($2, $4, $5, $6, $7); }
	;
	
tipo : THROUGH							{ $$ = true }
	| TO							{ $$ = false }
	;
	
bloque : LLAVE_APER clases LLAVE_CERRA				{ $$ = $2 }
	;
	
clases : clase							{ $$ = [$1] }
	| error							{ $$ = [] }
	| clases clase						{ $$ = $1; $1.push($2); }
	| clases error						{ $$ = $1 }
	;
