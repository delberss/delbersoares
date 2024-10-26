import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal'; 
import './index.css';


interface ModalFilmeProps {
    open: boolean;
    onClose: () => void;
    filmeSelecionado: {
        nome: string;
        imagem: string;
        descricao: string;
    } | null;
}

const ModalFilme: React.FC<ModalFilmeProps> = ({open, onClose, filmeSelecionado}) => {
    return (
        <Modal open={open} onClose={onClose} className="modal-filme">
            <div className="modal-content">
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'white',
                        border: '1px solid white'
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {filmeSelecionado && (
                    <>
                        <h2>{filmeSelecionado.nome}</h2>
                        <img src={filmeSelecionado.imagem} alt={filmeSelecionado.nome} className="modal-imagem" />
                        <p>{filmeSelecionado.descricao}</p>
                    </>
                )}
            </div>
        </Modal>

    )
}

export default ModalFilme;