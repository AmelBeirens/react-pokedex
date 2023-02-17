const ModalPokemon= ({handleDelete, title}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant={'contained'}
                    color={'error'}
                    onClick={handleOpen}
                    sx={{marginTop: "20px"}}
                    startIcon={<DeleteIcon />}
            >Supprimer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{...style}}>
                    <Box className="headerModal">
                        <Box className="titleModal">Suppression {title}</Box>
                    </Box>
                    <Box className="contentModal">
                        <p>Confirmez-vous la suppression {title} ?</p>
                    </Box>
                    <Box className="footerModal">
                        <Button className="buttonDelete" onClick={handleDelete}>Oui</Button>
                        <Button sx={{marginTop: 0, marginLeft: "10px"}} onClick={handleClose}>Non</Button>
                    </Box>
                </Box>
            </Modal>
        </div>

    )
}