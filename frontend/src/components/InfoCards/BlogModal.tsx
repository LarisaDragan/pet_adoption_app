import { Box, Button, Modal, Typography, CardMedia } from '@mui/material';
import useInfoCardStyle from './InfoCardStyle';

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  post: any;
}

const BlogModal: React.FC<BlogModalProps> = ({ open, onClose, post }) => {
  const style = useInfoCardStyle();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          maxHeight: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: '50%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          image={post.image}
          sx={{
            height: 'auto',
            maxHeight: '400px',
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <Typography id="modal-title" className={style.modalTitle}>
          {post.title}
        </Typography>

        <div>
          {post.descriptionWithSections.map(
            (section: any, sectionIndex: any) => (
              <div key={sectionIndex}>
                <Typography variant="subtitle1" className={style.sectionsTitle}>
                  {section.title}
                </Typography>
                <p className={style.sectionsDescription}>
                  {section.description}
                </p>
              </div>
            ),
          )}
        </div>

        <div
          data-testid="div-close-button-modal"
          className={style.closeModalButton}
        >
          <Button onClick={onClose}>Close</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BlogModal;
