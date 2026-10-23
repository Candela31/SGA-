import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function EjemploMui (){
    return (
        <>
    <Stack spacing={2} direction="row">
      <Button variant="text">ACEPTAR</Button>
      <Button variant="contained">GUARDAR</Button>
      <Button variant="outlined">CANCELAR</Button>
    </Stack>
    <Stack direction="row" spacing={2} s>
        () {
            
        }
      <Button variant="outlined" startIcon={<DeleteIcon />}color="error">
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
      SX={{
        bgcolor: "#4fb56dc" ,
      }}
        Send
      </Button>
    </Stack>
    </>
  );
}
export default EjemploMui