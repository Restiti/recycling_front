import { Injectable } from "@angular/core";
import {  Material } from "./material";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root"
})
export class MaterialService {
    // Use environment.ts to store the API URL
    private apiServeUrl = environment.apiBaseUrl + 'material';
 
    constructor(private http: HttpClient) { }

    // Get all Material
    getMaterials() {
        console.log(" Displaying all Material");
        return this.http.get<Material[]>(`${this.apiServeUrl}/findAll`);
    }
    // Get a Material by ID
    getMaterialById(id: string) {
        return this.http.get<Material>(`${this.apiServeUrl}/${id}`);
    }
    // Create a Material
    createMaterial(material: Material) {
        console.log("Creating a Material");
        console.log(material);
        return this.http.post<Material>(`${this.apiServeUrl}/insertMaterial`, material);
    }
    // Update a Material
    updateMaterial(material: Material) {
        console.log("Updating a material");
        console.log(material);
        // Display id Material
        console.log("Id Material" + material.id);
        return this.http.put<Material>(`${this.apiServeUrl}/${material.id}`, material);
    }
    deleteMaterial(material?: string) {
        console.log("Deleting a Material with ID", material);
        return this.http.delete(`${this.apiServeUrl}/deleteMaterial/${material}`);
    }

    // Logout
    logout() {
        localStorage.removeItem('userId');
        // localStorage.removeItem('userToken');
    }
}
