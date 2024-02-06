import { Injectable } from "@angular/core";
import { Member } from "./member";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";


@Injectable({
    providedIn: "root"
})
export class MemberService {
    // Use environment.ts to store the API URL
    private apiServeUrl = environment.apiBaseUrl;
 
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
        return this.http.post<Member>(this.apiServeUrl, member);
    }
    // Update a member
    updateMember(member: Member) {
        return this.http.put<Member>(`${this.apiServeUrl}/${member.idMember}`, member);
    }
    // Delete a member
    deleteMember(id: string) {
        return this.http.delete<Member>(`${this.apiServeUrl}/${id}`);
    }
    
}
