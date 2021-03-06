import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): unknown {

    let url = URL_SERVICIOS + '/img';
    
    //Si la img retorna vacia entonces que cargue la img por defecto 
    if (!img) {
      return url + '/usuarios/xxxxx';
    }
    // si envia una img de google 'https' retorna la misma img de google
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
         url += '/usuarios/' + img;
        break;

        case 'medico':
           url += '/medicos/' + img;
          break;

          case 'hospital':
            url += '/hospitales/' + img;
           break;

           default:
             console.log('tipo de img no existe, usuario, medico, hospital');
             return url + 'usuarios/xxxxx';
    }

    return url;
  }

}
