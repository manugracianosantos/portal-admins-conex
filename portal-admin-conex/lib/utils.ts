/* A pasta lib/ é para código utilitário e helpers que: São usados em múltiplos lugares, 
Não são componentes UI, são funções puras (sempre mesmo resultado com mesmas entradas), 
Não têm side effects */

/*Nesse arquivo contém uma função unitária chamada cn que funciona como um mestre do css da aplicação */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
/*importação do clsx, uma biblioteca que combina classes do css de forma inteligente e o twMerge que 
é outra biblioteca, mas para resolver conflitos entre o Tailwind CSS */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// cn = "className" simplificado
// Recebe várias classes CSS → processa → retorna classes otimizadas