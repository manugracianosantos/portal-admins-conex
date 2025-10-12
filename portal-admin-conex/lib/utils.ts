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

// export function getInitials(name) {
//   if (!name) return "";
//   const parts = name.split(" ");
  
//   if (parts.length === 1) {
//     // Se for apenas um nome, pega a primeira letra
//     return parts[0].charAt(0).toUpperCase();
//   }
  
//   // Pega a primeira letra do primeiro e do último nome
//   const firstInitial = parts[0].charAt(0);
//   const lastInitial = parts[parts.length - 1].charAt(0);
  
//   return `${firstInitial}${lastInitial}`.toUpperCase();
// }
