import { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { petCareInfoCard } from '../../constants/petCareInfoCards';
import NavbarNew from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import BlogCard from '../../components/InfoCards/BlogCard';
import BlogModal from '../../components/InfoCards/BlogModal';
import usePetCareStyle from './PetCareStyle';

const PetCare = () => {
  const style = usePetCareStyle();

  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const handleReadMore = (post: any) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <NavbarNew />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box className={style.titleSection}>
          <Typography className={style.title}>Pet Care</Typography>
        </Box>
        <Container
          maxWidth="lg"
          className={style.container}
          data-testid="container"
        >
          <Box mt={3}>
            <Grid container spacing={4}>
              {petCareInfoCard.map((post, index) => (
                <Grid item xs={12} sm={3} md={6} key={index}>
                  <BlogCard
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    onReadMore={() => handleReadMore(post)}
                    page="pet-care"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          {selectedPost && (
            <BlogModal
              open={!!selectedPost}
              onClose={handleClose}
              post={selectedPost}
            />
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PetCare;
