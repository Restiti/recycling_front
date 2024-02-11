import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    constructor() { }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('userId'); // Exemple simple basé sur la présence d'un userId dans le localStorage
    }
  
    // Ajoutez ici les méthodes de login et logout si nécessaire
  }