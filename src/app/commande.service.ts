import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Commande } from "./commande";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CommandeService {


    addMaterialToCommande(idCommande: string | undefined, idMaterial: string | undefined, quantityMaterial: any, totalPriceMaterial: number) {
      
    }
    // Use environment.ts to store the API URL
    private apiServeUrl = environment.apiBaseUrl + 'commande';
    
    
    constructor(private http: HttpClient) { }

    // Get all Commandes
    getCommandes() {
        console.log(" Displaying all Commandes");
        return this.http.get<Commande[]>(`${this.apiServeUrl}/findAll`);
    }
    // Get a Commande by ID
    getCommandeById(id: string) {
        return this.http.get<Commande>(`${this.apiServeUrl}/${id}`);
    }
    // Create a Commande
    createCommande(commande: Commande) {
        console.log("Creating a Commande");
        console.log(commande);
        return this.http.post<Commande>(`${this.apiServeUrl}/insertCommande`, commande);
    }
    // Update a Commande
    updateCommande(commande: Commande) {
        console.log("Updating a Commande");
        console.log(commande);
        // Display id commande
        console.log("Id commande" + commande.id);
        return this.http.put<Commande>(`${this.apiServeUrl}/${commande.id}`, commande);
    }
    // Delete a Commande
    deleteCommande(idCommande?: string) {
        console.log("Deleting a Commande with ID", idCommande);
        return this.http.delete(`${this.apiServeUrl}/deleteCommande/${idCommande}`);
    }
    /*
    @PutMapping("/addMaterial/{idCommande}/{idMaterial}") // Utilisez @PutMapping au lieu de @DeleteMapping pour ajouter un manager

    */

    // Add a material to a Commande
    addMaterial(idCommande: string, idMaterial: string) {
        console.log("Adding a material to a Commande");
        console.log("Id commande: " + idCommande);
        console.log("Id material: " + idMaterial);
        return this.http.put(`${this.apiServeUrl}/addMaterial/${idCommande}/${idMaterial}`, null);
    }
    // Remove a material from a Commande
    removeMaterial(idCommande: string, idMaterial: string) {
        console.log("Removing a material from a Commande");
        console.log("Id commande: " + idCommande);
        console.log("Id material: " + idMaterial);
        return this.http.delete(`${this.apiServeUrl}/removeMaterial/${idCommande}/${idMaterial}`);
    }
    
}