import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { agregarusuario } from 'src/app/clases/usuario.interface';
import { mostrarUsuario } from 'src/app/clases/mostrarUsuario.interface';
import { response } from 'src/app/clases/response.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  
  constructor(private http: HttpClient) { }
  url = "http://localhost:5000/usuario";

  obtenerUsuarios():Observable<mostrarUsuario[]>{
    return this.http.get<mostrarUsuario[]>(this.url);
  }

  extraerUsuario(id:any):Observable<mostrarUsuario>{
    let ruta1 = this.url+'/'+id;
    return this.http.get<mostrarUsuario>(ruta1)
  }

  putUsuario(form:mostrarUsuario, id:any):Observable<mostrarUsuario>{
    let ruta2 = this.url+'/'+id;
    return this.http.put<mostrarUsuario>(ruta2, form)
  }

  eliminarUsuario(id:number): Observable<mostrarUsuario>{
    let ruta = this.url+'/'+id;
    console.log(ruta)
    return this.http.delete<mostrarUsuario>(ruta,{
      headers: new HttpHeaders({ 'Content-Type': 'aplication/json'})
    })
  }

  agregarusuario(form:mostrarUsuario): Observable<response>{
    return this.http.post<response>(this.url,form)
  }

  editar(usuario: string): Observable<any>{
    return this.http.put(`${this.url}/usuario`, JSON.stringify(usuario));
  }
}
