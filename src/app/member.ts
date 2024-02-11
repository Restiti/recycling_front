// Définition de l'interface Member
  
  export interface Member {
    id: string;
    firstName: string;
    lastName: string;
    mail: string;
    
    no: number;
    street: string;
    city: string;
    zip_code: number;
    password: string;
    role?: string;
    groupId: {
      id: string
    }
  }
  