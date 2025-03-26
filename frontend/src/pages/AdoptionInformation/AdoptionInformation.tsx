import { Box, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import NavbarNew from '../../components/NavBar/NavBar';
import BlogModal from '../../components/InfoCards/BlogModal';
import BlogCard from '../../components/InfoCards/BlogCard';
import Footer from '../../components/Footer/Footer';
import { adoptionInformationCardsInfo } from '../../constants/adoptionInformationCardsInfo';
import useAdoptionInfoStyle from './AdoptionInfoStyle';

const AdoptionInformation = () => {
  const style = useAdoptionInfoStyle();

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
          background: '#e3eceb',
          flexDirection: 'column',
        }}
      >
        <Box className={style.titleSection}>
          <Typography className={style.title}>Adoption information</Typography>
        </Box>
        <Container
          maxWidth="lg"
          className={style.container}
          data-testid="container"
        >
          <Box mt={4}>
            <Grid container spacing={4}>
              {adoptionInformationCardsInfo.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <BlogCard
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    onReadMore={() => handleReadMore(post)}
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

export default AdoptionInformation;
