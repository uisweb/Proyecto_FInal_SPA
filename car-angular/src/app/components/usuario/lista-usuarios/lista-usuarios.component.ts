import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { mostrarUsuario } from 'src/app/clases/mostrarUsuario.interface';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: mostrarUsuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }
  
  ngOnInit(): void {
    this.cargarUsuario()
  }

  cargarUsuario(){
    this.usuarioService.obtenerUsuarios().subscribe(datos => {
      this.usuarios = datos
      console.log(this.usuarios)
    })
  }

  nuevoUsuario(){
    this.router.navigate(['agregar_usuario'])
  }

  editarUsuario(id: any){
    this.router.navigate(['editar_usuario',id])
  }

  eliminar(id: any){
    this.usuarioService.eliminarUsuario(id).subscribe(resultado => {
      this.cargarUsuario()
      console.log(resultado)
      alert("Persona eliminada satisfactoriamente")
    })
  }

}
