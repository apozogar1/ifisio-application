import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INumDoc } from 'app/shared/model/num-doc.model';

@Component({
  selector: 'jhi-num-doc-detail',
  templateUrl: './num-doc-detail.component.html'
})
export class NumDocDetailComponent implements OnInit {
  numDoc: INumDoc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ numDoc }) => (this.numDoc = numDoc));
  }

  previousState(): void {
    window.history.back();
  }
}
