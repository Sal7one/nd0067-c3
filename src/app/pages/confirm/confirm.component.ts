import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  fullname: string = "";
  total: number = 0;

  constructor(
    private route :ActivatedRoute
  ){}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.fullname = params['customerName'];
      this.total = params['total'];
  });
   }

}
