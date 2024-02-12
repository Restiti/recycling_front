import { Component, OnInit } from '@angular/core';
import {  Member } from '../member';
import { MemberService } from '../member.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{
  
  constructor(private memberService: MemberService, private router: Router) { 
  }
  public members: Member[] = []; // Array of members
  public editMember: Member | undefined;
  public deleteMember!: Member | undefined;

    ngOnInit(): void {
    this.getMembers();
    console.log(this.members);
    }
    // Logout
    logout() {
      this.memberService.logout();
      // Redirection vers /login
      this.router.navigate(['/login']);
    }

  public getMembers(): void {
    this.memberService.getMembers().subscribe(
      (response: Member[]) => {
        this.members = response;
        console.log("Display names")
        // Number of members
        console.log("Number of members: " + this.members.length);
        // Make foreach
        this.members.forEach(member => { console.log(member.firstName + " " + member.lastName); });

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  public onOpenModal(member?: Member, mode?: string): void {
    console.log('Je clique');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Je suis dans le mode add');
      button.setAttribute('data-target', '#addMemberModal');
    }
    if (mode === 'edit') {
      console.log('Je suis dans le mode edit');
      this.editMember = member;
      button.setAttribute('data-target', '#updateMemberModal');
    }
    if (mode === 'delete') {
      console.log('Je suis dans le mode delete');
      this.deleteMember = member;
      button.setAttribute('data-target', '#deleteMemberModal');
    }
    console.log('J ajoute le bouton dans le main container')
    container?.appendChild(button);
    button.click();
  }

  public searchMembers(key: string): void {
    console.log(key);
    const results: Member[] = [];
    for (const member of this.members) {
      if (member.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || member.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || member.mail.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || member.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(member);
      }
    }
    this.members = results;
    if (results.length === 0 || !key) {
      this.getMembers();
    }
  }
  public onAddMember(addForm: NgForm): void {
    const addMemberForm = document.getElementById('add-member-form');
    if (addMemberForm) {
      addMemberForm.click();
    }    this.memberService.createMember(addForm.value).subscribe(
      (response: Member) => {
        console.log(response);
        this.getMembers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onUpdateMember(member: Member): void {
    const memb: any = {
      "id": member.id,
      "firstName": member.firstName,
      "lastName": member.lastName,
      "no": member.no,
      "street": member.street,
      "city": member.city,
      "ZIP_code": member.zip_code,
      "mail": member.mail,
      "password": member.password,
      "role": member.role==""?null:member.role,
      "groupID": {
        "id": member.groupId.id==""?null:member.groupId.id
      },

    }
    this.memberService.updateMember(memb).subscribe(
      (response: Member) => {
        console.log(response);
        this.getMembers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMember(id?: string): void {
    this.memberService.deleteMember(id).subscribe(
      () => {
        this.getMembers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
