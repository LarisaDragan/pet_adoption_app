import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
  Box,
  CardActionArea,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavbarNew from '../../components/NavBar/NavBar';
import useHomeStyle from './HomeStyle';
import CarouselComp from '../../components/CarouselComponent/CarouselComp';
import Footer from '../../components/Footer/Footer';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../helpers/getToken';
import { toast } from 'react-toastify';
import {
  postAdoptionInfoCard,
  preAdoptionInfoCard,
  readyToAdoptCardsInfo,
  meetTheFurry,
} from '../../constants/homeInfoCards';
import 'react-toastify/dist/ReactToastify.css';

const URL = process.env.REACT_APP_URL;

const Home = () => {
  const style = useHomeStyle();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const userIsLoggedIn = getToken();

  const [petArray, setPetArray] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const getPetsFromDb = async () => {
    try {
      const getAllDataFromDB = await axios.get(`${URL}/getanimals?page=1`);
      setPetArray(getAllDataFromDB.data);
    } catch (error) {
      toast.error("Couldn't get pets from database", {
        position: 'bottom-center',
      });
    }
  };

  useEffect(() => {
    getPetsFromDb();
  }, []);

  const handleOnClickFindPet = async () => {
    setIsLoading(true);
    setTimeout(function () {
      navigate('/adoptapet', { state: { petArray } });
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userNotLoggedIn = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        data-testid="dialog"
        className={style.askLoginDialog}
      >
        <DialogTitle id="customized-dialog-title" className={style.closeDialog}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          data-testid="dialog-content"
          className={style.dialogContent}
        >
          <Typography>To be able to rehome your pet please</Typography>
          <div>
            <a href="/loginform">Login</a>
            <a href="/registerform">Register</a>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const handleOnClickRehomePet = () => {
    setIsLoading(true);
    setTimeout(function () {
      navigate('/rehomeapet');
    }, 500);
  };

  const handleGoToBeforeYouAdoptPost = () => {
    return () => {
      navigate('/adoptioninformation');
    };
  };

  return (
    <>
      {isLoading ? (
        <div className={style.loadingContainer}>
          <LoadingButton loading={true} size="large" />
        </div>
      ) : (
        <>
          <NavbarNew />
          <Grid data-testid="grid-home">
            <Box className={style.boxImage}>
              <img
                style={{
                  width: '100%',
                  zIndex: '1',
                  height: '85vh',
                  position: 'relative',
                }}
                src="./images/homeBackground.jpg"
                alt="hand holding cat"
              />

              <div data-testid="overlay" className={style.overlay}></div>

              <Box
                data-testid="home-text-and-buttons"
                className={style.welcomeBox}
              >
                <Box
                  data-testid="box-welcome-text"
                  className={style.welcomeTextContainer}
                >
                  <Typography
                    className={style.welcomeText}
                    data-testid="welcome-text"
                  >
                    Unleash Happiness: <span>Adopt</span> Your New Best Friend
                    Today!
                  </Typography>
                </Box>

                <Box
                  className={style.whatIwantSection}
                  data-testid="home-buttons"
                >
                  <Card
                    className={style.wantToAdoptButton}
                    onClick={handleOnClickFindPet}
                  >
                    <CardActionArea className={style.optionsAvailableCards}>
                      <SearchIcon />
                      <div>
                        <Typography variant="h6">Adopt</Typography>
                      </div>
                    </CardActionArea>
                  </Card>

                  <Card className={style.wantToRehomeButton}>
                    <CardActionArea
                      className={style.optionsAvailableCards}
                      onClick={
                        userIsLoggedIn
                          ? handleOnClickRehomePet
                          : () => handleClickOpen()
                      }
                    >
                      <HomeIcon />
                      <div>
                        <Typography variant="h6">Rehome</Typography>
                      </div>
                    </CardActionArea>
                  </Card>
                  {userNotLoggedIn()}
                </Box>
              </Box>

              <svg
                className={style.svgImage}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 319"
              >
                <path
                  fill="#0099ff"
                  fillOpacity="1"
                  d="M0,256L120,261.3C240,267,480,277,720,277.3C960,277,1200,267,1320,261.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                ></path>
              </svg>
            </Box>

            <Box
              className={style.beforeAdoptContainer}
              data-testid="before-adopting-box"
            >
              <div
                className={`beforeYouAdoptCard ${style.beforeYouAdoptSection}`}
                onClick={handleGoToBeforeYouAdoptPost()}
              >
                <CardMedia
                  data-testid="card-media"
                  component="img"
                  image="/images/beforeAdoptImage.jpg"
                  title="dog"
                  className={style.beforeYouAdoptImageSection}
                />
                <CardContent
                  data-testid="cardContent"
                  className={style.beforeYouAdoptInfo}
                >
                  <Typography gutterBottom component="div">
                    {readyToAdoptCardsInfo.title}
                  </Typography>
                  <Typography>
                    {isSmallScreen
                      ? `${readyToAdoptCardsInfo.introduction.substring(
                          0,
                          103,
                        )}...`
                      : `${readyToAdoptCardsInfo.introduction}`}
                  </Typography>
                </CardContent>
              </div>
            </Box>

            <Box className={style.carouselBox} data-testid="carousel-box">
              <div data-testid="div-din-box">
                <Typography data-testid="titlul-find-pet">
                  <PetsIcon /> Find your friend
                </Typography>
                <CarouselComp data-testid="carusel-home" petArray={petArray} />
              </div>
            </Box>
            <Box
              className={style.adoptingSection}
              data-testid="adoption-info-section"
            >
              <Box>
                <Card onClick={handleGoToBeforeYouAdoptPost()}>
                  <CardMedia
                    component="img"
                    image="/images/preadoption.jpg"
                    title="dog"
                  />
                  <CardContent>
                    <Typography
                      className={style.titleCardsAdoptionInfo}
                      data-testid="titlu"
                    >
                      {preAdoptionInfoCard.title}
                    </Typography>
                    <Typography
                      component="div"
                      className={style.contentCardAdoptionInfo}
                    >
                      {isSmallScreen
                        ? `${preAdoptionInfoCard.introduction.substring(
                            0,
                            101,
                          )}...`
                        : `${preAdoptionInfoCard.introduction}`}
                    </Typography>
                  </CardContent>
                </Card>
                <Card onClick={handleGoToBeforeYouAdoptPost()}>
                  <CardContent>
                    <Typography className={style.titleCardsAdoptionInfo}>
                      {meetTheFurry.title}
                    </Typography>
                    <Typography
                      component="div"
                      className={style.contentCardAdoptionInfo}
                    >
                      {isSmallScreen
                        ? `${meetTheFurry.introduction.substring(0, 100)}...`
                        : `${meetTheFurry.introduction}`}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    image="/images/resizeMeet.jpg"
                    title="dog"
                    height={'225px'}
                  />
                </Card>
                <Card onClick={handleGoToBeforeYouAdoptPost()}>
                  <CardMedia
                    component="img"
                    image="/images/postAdoption.jpg"
                    title="dog"
                    height={'225px'}
                  />
                  <CardContent>
                    <Typography className={style.titleCardsAdoptionInfo}>
                      {postAdoptionInfoCard.title}
                    </Typography>
                    <Typography
                      component="div"
                      className={style.contentCardAdoptionInfo}
                    >
                      {isSmallScreen
                        ? `${postAdoptionInfoCard.introduction.substring(
                            0,
                            100,
                          )}...`
                        : `${postAdoptionInfoCard.introduction}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            <Footer />
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
