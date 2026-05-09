export enum Tipo {
  ENTERO = 'int',
  STRING = 'string',
  FUNCTION = 'function',
  FLOAT = 'float',
  CHAR = 'char',
  BOOLEAN = 'boolean',
  ERROR = 'error',
}

export function convertir(valor: string): Tipo {
  switch (valor) {
    case 'int':
      return Tipo.ENTERO;
    case 'string':
      return Tipo.STRING;
    case 'function':
      return Tipo.FUNCTION;
    case 'float':
      return Tipo.FLOAT;
    case 'char':
      return Tipo.CHAR;
    case 'boolean':
      return Tipo.BOOLEAN;
  }
  return Tipo.ERROR;
}
