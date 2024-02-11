import { Component } from '@angular/core';
import { MemberService } from '../member.service';
import { NgForm } from '@angular/forms';
import { Member } from '../member';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mailLogin: string = "";
  passwordLogin: string = "";
  mailRegister?: string;
  passwordRegister?: string;
  constructor(private router: Router, private memberService: MemberService) { }

  login() {
    const user: Member = {
      mail: this.mailLogin,
      password: this.passwordLogin,
      id: "",
      firstName: "",
      lastName: "",
      groupId: { id: "" },
      no: 0,
      street: "",
      city: "",
      zip_code: 0,
    };
    
    this.memberService.login(user).subscribe(
      (response) => {
        console.log('Connexion réussie', response);
        // Stocker l'utilisateur connecté ou le token si nécessaire
        // Redirection vers /members ou une autre route appropriée
        this.router.navigate(['/members']);
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }
  public register(addForm: NgForm): void {
    const addMemberForm = document.getElementById('add-member-form');
    if (addMemberForm) {
      addMemberForm.click();
    }    this.memberService.register(addForm.value).subscribe(
      (response: Member) => {
        console.log("Member created")
        console.log(response);
        //addForm.reset();        
        // Redirection vers /members
        this.router.navigate(['/members']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  getMembers() {
    throw new Error('Method not implemented.');
  }
}
