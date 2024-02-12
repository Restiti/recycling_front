
/*
public class Commande {
    @Id
    private String id;

    @DBRef
    private Member membreClient; // Référence au Membre en tant que client

    @DBRef
    private Member membreActif; // Référence au Membre en tant qu'actif (simili-vendeur)

    private Date date;

    @DBRef
    private List<Material> listeMateriel; // Liste des matériaux commandés

    private double prixTotal;

    // Méthodes supplémentaires si nécessaire
}

*/
export interface Commande {
    id: string;
    membreClient: {
        id: string;
    };
    membreActif: {
        id: string;
    };
    date: Date;
    listeMateriel: {
        id: string;
    }[];
    prixTotal: number;
}