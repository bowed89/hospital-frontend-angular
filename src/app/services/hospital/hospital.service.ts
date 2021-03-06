import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';


import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public totalHospitales: number =  0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';

    return this.http.get(url)
            .map((resp: any) => {
              this.totalHospitales = resp.total;
              return resp.hospitales;
            });
  }



  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
            .map((resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .map(resp => {
              swal('Hospital Borrado', 'Eliminado correctamente', 'success');
            });
  }

  crearHospital(nombre: string) {

    let url = URL_SERVICIOS + '/hospital' + '?token=' + this._usuarioService.token ;

    return this.http.post(url, { nombre } )
            .map((resp: any) => resp.hospital);

  }

  buscarHospital(nombre: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + nombre ;

    return this.http.get(url)
            .map((resp: any) => resp.hospitales);
  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital)
            .map((resp: any) => 
            resp.hospital,
            swal('Hospital Actualizado', 'Actualizado correctamente', 'success')
            );
  }




}
