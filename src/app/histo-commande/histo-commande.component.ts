import { Component, ViewChild } from '@angular/core';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { CommandeService } from '../commande.service';
import { Commande } from '../commande';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-histo-commande',
  templateUrl: './histo-commande.component.html',
  styleUrl: './histo-commande.component.css'
})
export class HistoCommandeComponent {

  constructor(private router: Router, private memberService: MemberService, private commandeService: CommandeService) {
    console.log("Display commandes");
    this.getCommandes();
   }
  dataSource: any;
  commandes: Commande[] = [];
  displayedColumns: string[] = ['id', 'date', 'membreClient', 'membreActif', 'prixTotal'];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  // Logout
  logout() {
    this.memberService.logout();
    // Redirection vers /login
    this.router.navigate(['/login']);
  }

  public getCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (response: Commande[]) => {
        this.commandes = response;
        this.dataSource = new MatTableDataSource<Commande>(this.commandes);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

}
