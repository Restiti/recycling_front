// Définition de l'interface Member

import { Member } from "./member";

  
export interface Group {
    id: string;
    name: string;
    // List de member
    managers: Member[];
    no: number;
    street: string;
    city: string;
    zip_code: number;
  }
  