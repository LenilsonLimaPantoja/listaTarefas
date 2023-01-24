import swal from "sweetalert";

export const Alert = (texto) => {
    swal ( {
        título : " Bom trabalho! " , 
        text : texto , 
        ícone : " sucesso " , 
      } ) ;
  };