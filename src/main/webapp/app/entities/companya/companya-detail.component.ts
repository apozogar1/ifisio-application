import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompanya } from 'app/shared/model/companya.model';

@Component({
  selector: 'jhi-companya-detail',
  templateUrl: './companya-detail.component.html'
})
export class CompanyaDetailComponent implements OnInit {
  companya: ICompanya | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ companya }) => (this.companya = companya));
  }

  previousState(): void {
    window.history.back();
  }
}
