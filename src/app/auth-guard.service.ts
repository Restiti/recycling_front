import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Ici, implémentez la logique pour vérifier si l'utilisateur est connecté
    // Pour l'exemple, nous vérifions simplement si un token utilisateur existe dans le localStorage
    if (localStorage.getItem('userId')) {
      // Si l'utilisateur est connecté, autoriser l'accès
      return true;
    } else {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}

