import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  TextField,
  Button,
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { Textarea } from '@mui/joy';
import { useLocation } from 'react-router-dom';
import NavbarNew from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import FsLightbox from 'fslightbox-react';
import emailjs from '@emailjs/browser';
import { checkAgeMonthOrYear } from '../../helpers/helpers';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import usePetProfileStyle from './PetProfileStyle';

const PublicKeyEmailJs = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const PetProfile = () => {
  const style = usePetProfileStyle();

  const currentLocation = useLocation();
  const currentPet = currentLocation?.state?.pet;

  const {
    petName,
    breed,
    age,
    gender,
    location,
    description,
    remarks,
    photos,
  } = currentPet;

  const [toggler, setToggler] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    ownerEmail: 'lary_lally@yahoo.com',
    ownerName: currentPet?.userName,
    petName: currentPet?.petName,
  });

  const [emailFormError, setEmailFormError] = useState('');

  const [formResponse, setFormResponse] = useState({ text: '', code: 0 });

  const handleInputChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleOnBlurEmailCheck = (email: any) => {
    const emailValue = email.target.value;
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailFormError('Invalid Email');
    } else {
      setEmailFormError('');
    }
  };

  const handleSubmit = () => {
    emailjs
      .send('service_05nnz4g', 'template_o42ozhj', formValues, PublicKeyEmailJs)
      .then(
        (response) => {
          setFormResponse({
            text: 'Your message was successfully sent!',
            code: response.status,
          });
          setEmailFormError('');
          setFormValues({ ...formValues, name: '', email: '', message: '' });
        },
        (error: any) => {
          setFormResponse({
            text: 'Your message was not sent! Please try again.',
            code: error.status,
          });
        },
      );
  };

  useEffect(() => {
    if (formResponse.code === 200) {
      setFormValues({
        ...formValues,
        name: '',
        email: '',
        message: '',
      });
    }
  }, [formResponse]);

  const displayFormSubmitNotification = () => {
    return (
      <Typography
        color={formResponse.code === 200 ? 'green' : 'red'}
        className={style.formContactResponseMessage}
      >
        {formResponse.text}
      </Typography>
    );
  };

  const isSubmitMailButtonDisabled = () => {
    return (
      formValues.name === '' ||
      emailFormError.length > 0 ||
      formValues.message === ''
    );
  };

  const mapAboutPetInfoToIcon = (value: any) => {
    if (value === 'Yes') {
      return <CheckRoundedIcon color="success" />;
    } else if (value === 'No') {
      return <CloseRoundedIcon color="error" />;
    } else if (value === 'Unknown') {
      return <QuestionMarkRoundedIcon color="primary" />;
    }
    return <div className={style.otherInfoDiv}>{String(value)}</div>;
  };

  const handleImageClick = (index: any) => {
    setLightboxIndex(index);
    setToggler(true);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    handleScrollToTop();
    setEmailFormError('');
  }, []);

  const mapKeyRemarkToText = (key: any) => {
    switch (key) {
      case 'microchipped':
        return 'Microchipped';
      case 'neutered':
        return 'Neutered';
      case 'specialNeeds':
        return 'Special needs';
      case 'houseTrained':
        return 'House trained';
      case 'goodWithKids':
        return 'Good with kids';
      case 'behaviouralIssues':
        return 'Behavioural issues';
      case 'goodWithOtherPets':
        return 'Good with other pets';
      default:
        return 'Unknown';
    }
  };

  const displayRemarks = () => {
    const validRemarks = Object.entries(remarks).filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length !== 0;
      } else {
        return value;
      }
    });

    if (validRemarks.length === 0) {
      return null;
    }

    return validRemarks.map(([key, value]) => (
      <React.Fragment key={key}>
        <Grid item>
          <Typography>{mapKeyRemarkToText(key)}</Typography>
        </Grid>
        <Grid item>
          <Typography
            component="div"
            variant="body1"
            data-testid="remark-value"
          >
            {mapAboutPetInfoToIcon(value)}
          </Typography>
        </Grid>
      </React.Fragment>
    ));
  };

  const remarksContent = displayRemarks();

  return (
    <>
      <NavbarNew />
      <div
        className={style.root}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e3eceb',
        }}
      >
        <Box
          className={style.grid}
          style={{
            maxWidth: 1200,
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          <Box className={style.header}>
            <Typography className={style.title}>Pet profile</Typography>
            <div>
              <Breadcrumb />
            </div>
          </Box>

          <Box className={style.photoSection} data-testid="photo-section">
            <div>
              <img
                src={photos[0]}
                title="profile"
                className={style.imageCard}
              />
            </div>
            <CardContent
              className={style.petMainInfo}
              data-testid="main-content"
            >
              <Typography>
                Hi, I'm <strong>{petName}</strong>
              </Typography>
              <Typography>I'm so excited to meet you!</Typography>
              <div className={style.headerInfoHolder}>
                {breed ? (
                  <Typography>
                    <strong>Breed:</strong> {breed}
                  </Typography>
                ) : null}

                <Typography>
                  <strong>Age:</strong> {`${age} ${checkAgeMonthOrYear(age)}`}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {gender}
                </Typography>
                <Typography>
                  <strong>Location:</strong> {location}
                </Typography>
              </div>
            </CardContent>
          </Box>

          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                gap: 32,
              }}
            >
              <Box className={style.moreInfoPet}>
                <Box className={style.personalityInfo}>
                  <Typography component="div">My Personality</Typography>
                  <Typography>{description}</Typography>
                </Box>

                {remarksContent && (
                  <Card className={`${style.importantPersonalityPet} - cardul`}>
                    <Box component="div">
                      <Typography component="div" variant="h6">
                        About
                      </Typography>
                      <Grid container spacing={1} className={style.petsRemarks}>
                        {displayRemarks()}
                      </Grid>
                    </Box>
                  </Card>
                )}
              </Box>

              <Box className={style.gallerySection}>
                <Box
                  className={style.imageContainer}
                  data-testid="root-of-images"
                >
                  {photos.map((image: any, index: any) => (
                    <CardMedia
                      key={index}
                      component="img"
                      onClick={() => {
                        handleImageClick(index);
                        setToggler(!toggler);
                      }}
                      sx={{
                        height: '100%',
                        width: '100%',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      alt={`Image with the pet ${index + 1}.`}
                      src={image}
                    />
                  ))}
                </Box>
                <FsLightbox
                  type={'image'}
                  toggler={toggler}
                  sources={photos}
                  sourceIndex={lightboxIndex}
                />
              </Box>

              <Box className={style.emailSection}>
                <div className={style.formSection}>
                  <MailOutlineIcon />
                  <Typography component="div" className={style.contactMeTitle}>
                    Get in touch with the owner
                  </Typography>
                </div>

                <div className={style.emailFormAndMessage}>
                  {displayFormSubmitNotification()}
                  <FormControl
                    className={style.contactMeForm}
                    data-testid="form-control-email"
                  >
                    <Typography>Your name*</Typography>
                    <TextField
                      id="name"
                      size="small"
                      variant="outlined"
                      value={formValues.name}
                      className={style.emailForm}
                      name="name"
                      onChange={handleInputChange}
                    />
                    <Typography>Your email*</Typography>
                    <TextField
                      id="email"
                      data-testid="email-form"
                      size="small"
                      variant="outlined"
                      className={style.emailForm}
                      value={formValues.email}
                      name="email"
                      onChange={handleInputChange}
                      onBlur={handleOnBlurEmailCheck}
                      error={Boolean(emailFormError)}
                      helperText={emailFormError}
                    />
                    <Typography>Your message*</Typography>
                    <Textarea
                      autoComplete="off"
                      id="message"
                      minRows={5}
                      maxRows={6}
                      size="md"
                      className={style.textArea}
                      sx={{
                        '&::before': {
                          display: 'none',
                        },
                      }}
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      className={
                        isSubmitMailButtonDisabled()
                          ? style.submitButtonDisabled
                          : style.submitButton
                      }
                      onClick={handleSubmit}
                      disabled={isSubmitMailButtonDisabled()}
                    >
                      Submit
                    </Button>
                  </FormControl>
                </div>
              </Box>
            </div>
          </div>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default PetProfile;
