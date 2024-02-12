import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Router } from '@angular/router';
import { MemberService } from '../member.service';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit{

  constructor(private commandeService: CommandeService, private router: Router, private memberService: MemberService) { }

  ngOnInit(): void {
    console.log("Display commandes");
    this.getCommandes();
  }

  public getCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (response: Commande[]) => {
        this.commandes = response;
        console.log("Display commandes");
        // Number of commandes
        console.log("Number of commandes: " + this.commandes.length);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public commandes: Commande[] = []; // Array of Commandes
  public editCommande: Commande | undefined;
  public deleteCommande!: Commande | undefined;
  public materialEntries: { [commandeId: string]: string } = {};

  public onOpenModal(commande?: Commande, mode?: string): void {
    console.log('Je clique');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Je suis dans le mode add');
      button.setAttribute('data-target', '#addCommandeModal');
    }
    if (mode === 'edit') {
      console.log('Je suis dans le mode edit');
      this.editCommande = commande;
      // Display id Commande
      console.log("Id commande" + commande?.id);
      button.setAttribute('data-target', '#updateCommandeModal');
    }
    if (mode === 'delete') {
      console.log('Je suis dans le mode delete');
      this.deleteCommande = commande
      button.setAttribute('data-target', '#deleteCommandeModal');
    }
    console.log('J ajoute le bouton dans le main container')
    container?.appendChild(button);
    button.click();
  }

  public onAddCommande(addForm: NgForm): void {
    const addCommandeForm = document.getElementById('add-commande-form');
    // Get id user connected with check if null
    var idUser = this.memberService.getUserId();
    const comm: any = {
      membreClient: {
        id: idUser == null ? "" : idUser
      },
      membreActif: {
        id: addForm.value.membreActif
      },
      // Add date of today to the commande
      date: new Date(),
      // Init list of materials 
      listeMateriel: [],
      prixTotal: 0,
    }

    if (addCommandeForm) {
      addCommandeForm.click();
    }    this.commandeService.createCommande(comm).subscribe(
      (response: Commande) => {
        console.log(response);
        this.getCommandes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteCommande(id?: string): void {
    this.commandeService.deleteCommande(id).subscribe(
      () => {
        this.getCommandes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // Add material to the commande
  public addMaterial(idCommande: string, idMaterial: string) {
    console.log("Adding a material to a Commande");
    console.log("Id commande: " + idCommande);
    console.log("Id material: " + idMaterial);
    this.commandeService.addMaterial(idCommande, idMaterial).subscribe(
      () => {
        this.getCommandes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.materialEntries[idCommande] = '';

  }
  // Remove material from the commande
  public removeMaterial(idCommande: string, idMaterial: string) {
    console.log("Removing a material from a Commande");
    console.log("Id commande: " + idCommande);
    console.log("Id material: " + idMaterial);
    this.commandeService.removeMaterial(idCommande, idMaterial).subscribe(
      () => {
        this.getCommandes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.materialEntries[idCommande] = '';

  }


    // Logout
    logout() {
      this.memberService.logout();
      // Redirection vers /login
      this.router.navigate(['/login']);
    }
}
