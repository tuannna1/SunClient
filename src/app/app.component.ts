import {Component, HostListener} from '@angular/core';
import {fadeAnimation} from './animations/fadeIntRoute';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation],
})
export class AppComponent {
  title = 'shop';
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  constructor(private spinner: NgxSpinnerService) { }

  @HostListener('window:scroll', [])
  onWindowScroll()
  {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight)
    {
      this.showScroll = true;
    }
    else if ( this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight)
    {
      this.showScroll = false;
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);}

  scrollToTop()
  {
    (function smoothscroll()
    { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0)
      {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
}
