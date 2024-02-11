// Définition de l'interface Member
  
export interface Material {
  id: string,
  marque: string,
  modele: string,
  materialType: string,
  prix: number,
  stockage: {
    id: string
  };
}
  