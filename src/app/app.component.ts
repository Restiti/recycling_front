import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'recycling_app_front';
  public members: Member[] = []; // Array of members
  constructor(private memberService: MemberService, private cdr: ChangeDetectorRef) { 
    
  }

  ngOnInit(): void {
    this.getMembers();
    console.log(this.members);
    
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
}
