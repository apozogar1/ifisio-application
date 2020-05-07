import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicion } from 'app/shared/model/medicion.model';

@Component({
  selector: 'jhi-medicion-detail',
  templateUrl: './medicion-detail.component.html'
})
export class MedicionDetailComponent implements OnInit {
  medicion: IMedicion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicion }) => (this.medicion = medicion));
  }

  previousState(): void {
    window.history.back();
  }
}
