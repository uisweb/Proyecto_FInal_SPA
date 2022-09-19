import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AgregarUsuarioComponent } from './components/usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { ListaUsuariosComponent } from './components/usuario/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path: 'agregar_usuario',
    component: AgregarUsuarioComponent
  },
  {
    path: 'editar_usuario/:id',
    component: EditarUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponentes = 
{
  AgregarUsuarioComponent,
  EditarUsuarioComponent,
  ListaUsuariosComponent
}
