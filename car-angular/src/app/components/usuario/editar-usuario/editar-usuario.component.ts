import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mostrarUsuario } from "../../../clases/mostrarUsuario.interface"
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(private activeroute:ActivatedRoute, private router:Router, private usuario:UsuarioService, private form:FormsModule) { }
  
  datosusuarios!: mostrarUsuario;

  editarform = new FormGroup({
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
    let id_user = this.activeroute.snapshot.paramMap.get('id')
    this.usuario.extraerUsuario(id_user).subscribe(datos=>{
      this.datosusuarios = datos;
      console.log(datos)
      this.editarform.setValue({
        'nombre': this.datosusuarios.nombre,
        'apellido': this.datosusuarios.apellido,
        'tipo_documento': this.datosusuarios.tipo_documento,
        'documento': this.datosusuarios.documento,
        'lugar_na': this.datosusuarios.lugar_na,
        'fecha_na': this.datosusuarios.fecha_na,
        'email': this.datosusuarios.email,
        'telefono': this.datosusuarios.telefono,
        'lu_residencia': this.datosusuarios.lu_residencia,
        'sexo': this.datosusuarios.sexo,
      })
    })
  }

  putform(form: mostrarUsuario){
    let userid_up = this.activeroute.snapshot.paramMap.get('id');
    this.usuario.putUsuario(form,userid_up).subscribe(datos=>{
      console.log(datos)
      alert("Persona actualizada exitosamente")
      this.router.navigate(['']);
    })
  }

  regresar(){
    this.router.navigate(['']);
  }
}

