import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mostrarUsuario } from "../../../clases/mostrarUsuario.interface"
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { AlertasService } from '../../../services/alertas/alertas.service'

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {
  constructor(private activeroute:ActivatedRoute, private router:Router, private usuario:UsuarioService, private form:FormsModule, private alerta: AlertasService) { }

  nuevoform = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    tipo_documento: new FormControl(''),
    documento: new FormControl(''),
    lugar_na: new FormControl(''),
    fecha_na: new FormControl(''),
    email: new FormControl(''),
    telefono: new FormControl(''),
    lu_residencia: new FormControl(''),
    sexo: new FormControl(''),
  });

  ngOnInit(): void {
  }

  postform(form: mostrarUsuario){
    this.usuario.agregarusuario(form).subscribe(info=>{
      alert('Se ha registrado con exito')
      console.log(info)
      this.router.navigate(['']);
    })
  }

  regresar(){
    this.router.navigate(['']);
  }

}
