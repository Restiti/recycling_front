import { Injectable } from "@angular/core";
import {  Group } from "./group";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";



@Injectable({
    providedIn: "root"
})
export class GroupService {
    // Use environment.ts to store the API URL
    private apiServeUrl = environment.apiBaseUrl + 'group';
 
    constructor(private http: HttpClient) { }

    // Get all Groups
    getGroups() {
        console.log(" Displaying all Groups");
        return this.http.get<Group[]>(`${this.apiServeUrl}/findAll`);
    }
    // Get a Group by ID
    getGroupById(id: string) {
        return this.http.get<Group>(`${this.apiServeUrl}/${id}`);
    }
    // Create a Group
    createGroup(group: Group) {
        console.log("Creating a Group");
        console.log(group);
        return this.http.post<Group>(`${this.apiServeUrl}/insertGroup`, group);
    }
    // Update a Group
    updateGroup(group: Group) {
        console.log("Updating a Group");
        console.log(group);
        // Display id group
        console.log("Id groupe" + group.id);
        return this.http.put<Group>(`${this.apiServeUrl}/${group.id}`, group);
    }
    // Add a member to a Group
    addPerson(idMember: string, idGroup: string) {
        console.log("Adding a member to a Group");
        console.log("Id member: " + idMember);
        console.log("Id group: " + idGroup);
        return this.http.put(`${this.apiServeUrl}/addManager/${idGroup}/${idMember}`, null);
    }
    // Remove a member from a Group
    removePerson(idMember: string, idGroup: string) {
        console.log("Removing a member from a Group");
        console.log("Id member: " + idMember);
        console.log("Id group: " + idGroup);
        return this.http.delete(`${this.apiServeUrl}/removeManager/${idGroup}/${idMember}`);
    }
    
    deleteGroup(idGroup?: string) {
        console.log("Deleting a Group with ID", idGroup);
        return this.http.delete(`${this.apiServeUrl}/deleteGroup/${idGroup}`);
    }

}
