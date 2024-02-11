import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';
import { MaterialService } from '../material.service';
import { Material } from '../material';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent implements OnInit{

  constructor(private groupService: GroupService, private router: Router, private memberService: MemberService, private materialService: MaterialService ) { }
  ngOnInit(): void {
    this.getMaterials();
  }
  public materials: Material[] = []; // Array of Material
  public editMaterial: Material | undefined;
  public deleteMaterial!: Material | undefined;


  public onOpenModal(material?: Material, mode?: string): void {
    console.log('Je clique');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      console.log('Je suis dans le mode add');
      button.setAttribute('data-target', '#addMaterialModal');
    }
    if (mode === 'edit') {
      console.log('Je suis dans le mode edit');
      this.editMaterial = material;
      // Display id Material
      console.log("Id Material" + material?.id);
      button.setAttribute('data-target', '#updateMaterialModal');
    }
    if (mode === 'delete') {
      console.log('Je suis dans le mode delete');
      this.deleteMaterial = material
      button.setAttribute('data-target', '#deleteMaterialModal');
    }
    console.log('J ajoute le bouton dans le main container')
    container?.appendChild(button);
    button.click();
  }

  public getMaterials(): void {
    this.materialService.getMaterials().subscribe(
      (response: Material[]) => {
        this.materials = response;
        console.log("Display materials");
        // Number of Materials
        console.log("Number of Materials: " + this.materials.length);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  public onAddMaterial(addForm: NgForm): void {
    const addMaterialForm = document.getElementById('add-material-form');
    if (addMaterialForm) {
      addMaterialForm.click();
    }    this.materialService.createMaterial(addForm.value).subscribe(
      (response: Material) => {
        console.log(response);
        this.getMaterials();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onDeleteMaterial(id?: string): void {
    this.materialService.deleteMaterial(id).subscribe(
      () => {
        this.getMaterials();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onUpdateMaterial(material: Material): void {
    console.log("Updating a material-" + material.stockage.id+"-");
    const mat: any = {
      "id": material.id,
      "marque": material.marque,
      "modele": material.modele,
      "prix": material.prix,
      "stockage": {
        "id": material.stockage.id==""?null:material.stockage.id
      },
      "materialType": material.materialType
    };

    this.materialService.updateMaterial(mat).subscribe(
      (response: Material) => {
        console.log(response);
        this.getMaterials();
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
