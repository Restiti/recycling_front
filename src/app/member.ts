

  
  
  export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    groupId: string | null; // Utilisez 'string | null' si le groupId peut être null
    no: number;
    street: string;
    city: string;
    zip_code: number;
  }
  