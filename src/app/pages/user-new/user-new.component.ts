import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {Role} from "../../enum/Role";
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  user: User;

  constructor( private location: Location,
               private userService: UserService,
               private toastr: ToastrService,
               private router: Router) {
    this.user = new User();
  }

  ngOnInit() {}

  onSubmit() {
    this.userService.signUp(this.user).subscribe(u => {
        console.log(u);
        this.router.navigate(['/userList']);
        this.toastr.success('Add User Success!', 'Reset!');
      },
      e => {});
  }

}
