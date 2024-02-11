import { Component, OnInit } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { MemberService } from '../member.service';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{
  public groups: Group[] = []; // Array of groups
  public editGroup: Group | undefined;
  public deleteGroup!: Group | undefined;
  
  constructor(private groupService: GroupService, private router: Router, private memberService: MemberService) { }
  ngOnInit(): void {
    this.getGroups();
    console.log(this.getGroups());
  }

  public onOpenModal(group?: Group, mode?: string): void {
    console.log('Je clique');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Je suis dans le mode add');
      button.setAttribute('data-target', '#addGroupModal');
    }
    if (mode === 'edit') {
      console.log('Je suis dans le mode edit');
      this.editGroup = group;
      // Display id group
      console.log("Id groupe" + group?.id);
      button.setAttribute('data-target', '#updateGroupModal');
    }
    if (mode === 'delete') {
      console.log('Je suis dans le mode delete');
      this.deleteGroup = group
      button.setAttribute('data-target', '#deleteGroupModal');
    }
    console.log('J ajoute le bouton dans le main container')
    container?.appendChild(button);
    button.click();
  }

  public onAddGroup(addForm: NgForm): void {
    const addGroupForm = document.getElementById('add-group-form');
    if (addGroupForm) {
      addGroupForm.click();
    }    this.groupService.createGroup(addForm.value).subscribe(
      (response: Group) => {
        console.log(response);
        this.getGroups();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public getGroups(): void {
    this.groupService.getGroups().subscribe(
      (response: Group[]) => {
        this.groups = response;
        console.log("Display names")
        // Number of Groups
        console.log("Number of Groups: " + this.groups.length);
        // Make foreach
        this.groups.forEach(group => { console.log(group.id + " " + group.city); });

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public onDeleteGroup(id?: string): void {
    this.groupService.deleteGroup(id).subscribe(
      () => {
        this.getGroups();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateGroup(group: Group): void {
    // Display id group
    console.log("Id groupe On update:" + group.id);
    this.groupService.updateGroup(group).subscribe(
      (response: Group) => {
        console.log(response);
        this.getGroups();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Logout
  logout() {
    this.memberService.logout();
    // Redirection vers /login
    this.router.navigate(['/login']);
  }
}
