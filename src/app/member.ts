
// Create class Id Member
export class IdMember {
    timestamp!: number;
    date!: string;
  }

  
  interface Address {
    no: number;
    street: string;
    city: string;
    zip_code: number;
  }
  
  export interface Member {
    idMember: IdMember;
    firstName: string;
    lastName: string;
    address: Address;
    mail: string;
    groupId: string | null; // Utilisez 'string | null' si le groupId peut être null
  }
  