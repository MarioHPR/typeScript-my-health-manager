import { ApiService } from '../services/api';

export const uploadArquivo = async (file: any) => {
  const data = new FormData();
  data.append('upload', file);
  const response: number = (await ApiService.post('api/arquivo/upload/', data)).data;
  return  response;
}

export const downloadArquivo = async (id: number) => {
  const response: any = (await ApiService.get(`api/arquivo/${id}`, {responseType: 'blob'})).data;
 
  const t = (response:any) => {
    let fileName = "arquivo.pdf";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE variant
        window.navigator.msSaveOrOpenBlob(new Blob([response.data], {type: 'application/octet-stream'}),
            fileName);
    } else {
        const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/octet-stream'}));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }
  } 
  
  t(response);
  return  response;
}