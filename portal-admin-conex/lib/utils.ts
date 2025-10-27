/* A pasta lib/ é para código utilitário e helpers que: São usados em múltiplos lugares, 
Não são componentes UI, são funções puras (sempre mesmo resultado com mesmas entradas), 
Não têm side effects */

/*Nesse arquivo contém uma função unitária chamada cn que funciona como um mestre do css da aplicação */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
