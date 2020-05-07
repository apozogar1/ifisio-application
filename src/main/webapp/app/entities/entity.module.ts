import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'medicion',
        loadChildren: () => import('./medicion/medicion.module').then(m => m.IFisioMedicionModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.IFisioClienteModule)
      },
      {
        path: 'num-doc',
        loadChildren: () => import('./num-doc/num-doc.module').then(m => m.IFisioNumDocModule)
      },
      {
        path: 'companya',
        loadChildren: () => import('./companya/companya.module').then(m => m.IFisioCompanyaModule)
      },
      {
        path: 'cita',
        loadChildren: () => import('./cita/cita.module').then(m => m.IFisioCitaModule)
      },
      {
        path: 'tratamiento-cliente',
        loadChildren: () => import('./tratamiento-cliente/tratamiento-cliente.module').then(m => m.IFisioTratamientoClienteModule)
      },
      {
        path: 'tratamiento',
        loadChildren: () => import('./tratamiento/tratamiento.module').then(m => m.IFisioTratamientoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class IFisioEntityModule {}
