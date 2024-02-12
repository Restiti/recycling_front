import { Injectable } from "@angular/core";
import {  Member } from "./member";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs/internal/Observable";
import { tap } from "rxjs/internal/operators/tap";


@Injectable({
    providedIn: "root"
})
export class MemberService {
    // Use environment.ts to store the API URL
    private apiServeUrl = environment.apiBaseUrl + 'product';
 
    constructor(private http: HttpClient) { }

    // Get all members
    getMembers() {
        console.log(" Displaying all members");
        return this.http.get<Member[]>(`${this.apiServeUrl}/findAll`);
    }
    // Get a member by ID
    getMemberById(id: string) {
        return this.http.get<Member>(`${this.apiServeUrl}/${id}`);
    }
    // Create a member
    createMember(member: Member) {
        console.log("Creating a member");
        console.log(member);
        return this.http.post<Member>(`${this.apiServeUrl}/insertMember`, member);
    }
    // Update a member
    updateMember(member: Member) {
        console.log("Updating a member");
        console.log(member);
        // Display id member
        console.log("Id member" + member.id);
        return this.http.put<Member>(`${this.apiServeUrl}/${member.id}`, member);
    }
    deleteMember(idMember?: string) {
        console.log("Deleting a member with ID", idMember);
        return this.http.delete(`${this.apiServeUrl}/deleteMember/${idMember}`);
    }
    login(user: Member): Observable<Member> {
        return this.http.post<Member>(`${this.apiServeUrl}/login`, user).pipe(
            tap(response => {
              localStorage.setItem('userId', response.id);
              // Si vous utilisez un token, vous pouvez également le stocker ici
              // localStorage.setItem('userToken', response.token);
            })
          );;
    }
    // Get Id connected(string) user return null if not connected
    getUserId(): string | null {
        return localStorage.getItem('userId');
    }
        

    // Register
    register(member: Member) {
        console.log("Creating a member");
        console.log(member);
        return this.http.post<Member>(`${this.apiServeUrl}/insertMember`, member).pipe(
            tap(response => {
                localStorage.setItem('userId', response.id);
                // Si vous utilisez un token, vous pouvez également le stocker ici
                // localStorage.setItem('userToken', response.token);
            })
        );
    }

    // Logout
    logout() {
        localStorage.removeItem('userId');
        // localStorage.removeItem('userToken');
    }
}
