import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{
  constructor(private memberService: MemberService) { 
  }
  public members: Member[] = []; // Array of members
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
