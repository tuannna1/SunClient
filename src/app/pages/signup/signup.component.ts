import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TranslateService} from '../../services/translate.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;

  constructor( private location: Location,
               private userService: UserService,
               private router: Router,
               private toastr: ToastrService,
               public translate: TranslateService) {
    this.user = new User();

  }



  ngOnInit() {


  }
  onSubmit() {
    this.userService.signUp(this.user).subscribe(u => {
        this.toastr.success('Signup Success', 'wellcome!!');
      this.router.navigate(['/login']);
    },
        e => {});
  }
  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }

}
