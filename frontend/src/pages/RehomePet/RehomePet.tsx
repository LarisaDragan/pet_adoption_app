import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  TextareaAutosize,
  Radio,
  Button,
  FormHelperText,
  Tooltip,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import NavbarNew from '../../components/NavBar/NavBar';
import Breadcrumbs from '../../components/Breadcrumb/Breadcrumb';
import ImageUploading from 'react-images-uploading';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { storage } from '../../firebase/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { checkNumber, toTitleCase } from '../../helpers/helpers';
import { getToken } from '../../helpers/getToken';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import useRehomePetStyle from './RehomePetStyle';

const URL = process.env.REACT_APP_URL;

const RehomePet = () => {
  const style = useRehomePetStyle();
  const token = getToken();

  const [images, setImages] = useState<{ file: File }[]>([]);

  const maxImages = 4;
  const acceptType = ['png', 'jpg', 'jpeg'];

  const [formData, setFormData] = useState({
    petName: '',
    type: '',
    gender: '',
    size: '',
    age: '',
    breed: '',
    remarks: {
      microchipped: '',
      neutered: '',
      specialNeeds: '',
      houseTrained: '',
      goodWithKids: '',
      behaviouralIssues: '',
      goodWithOtherPets: [],
    },
    description: '',
    location: '',
    photos: [],
  });

  const pattern = /^[a-zA-Z\s]+$/;

  const [errors, setErrors] = useState({
    petName: '',
    type: '',
    gender: '',
    size: '',
    age: '',
    breed: '',
    location: '',
    description: '',
    photos: [],
  });

  const handleErrorsOnBlur = (event: any) => {
    const { name, value } = event.target;
    let errorMessage = '';

    switch (name) {
      case 'petName':
        if (!value.length) errorMessage = 'Pet name is required';
        else if (!pattern.test(value)) errorMessage = 'Numbers not allowed ';
        break;
      case 'type':
        if (!value.length) errorMessage = 'Pet type is required';
        else if (!pattern.test(value)) errorMessage = 'Numbers not allowed';
        break;
      case 'age':
        if (!value.length) errorMessage = 'Pet age is required';
        else if (value) {
          errorMessage = checkNumber(value);
        }
        break;
      case 'location':
        if (!value.length) errorMessage = 'Location is required';
        break;
      case 'gender':
        if (!value.length) errorMessage = 'Gender is required';
        break;
      case 'size':
        if (!value.length) errorMessage = 'Pet size is required';
        break;
      case 'breed':
        if (value !== '' && !pattern.test(value))
          errorMessage = 'Numbers not allowed';
        break;
      case 'description':
        if (!value.length) errorMessage = 'Description pet is required';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === 'description') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    setFormData({ ...formData, [name]: toTitleCase(value) });

    if (name === 'petName' && value.length > 0) {
      setErrors({ ...errors, petName: '' });
    }
    if (name === 'type' && value.length > 0) {
      setErrors({ ...errors, type: '' });
    }
    if (name === 'age' && value.length > 0) {
      setErrors({ ...errors, age: '' });
    }

    if (name === 'location' && value.length > 0) {
      setErrors({ ...errors, location: '' });
    }

    if (name === 'gender' && value.length > 0) {
      setErrors({ ...errors, gender: '' });
    }

    if (name === 'size' && value.length > 0) {
      setErrors({ ...errors, size: '' });
    }
  };

  const handleRemarksChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState: any) => ({
      ...prevState,
      remarks: {
        ...prevState.remarks,
        [name]: value,
      },
    }));
  };

  const handleGoodWithOtherPetsChange = (event: any) => {
    const { name, checked } = event.target;
    if (checked) {
      setFormData((prevState: any) => ({
        ...prevState,
        remarks: {
          ...prevState.remarks,
          goodWithOtherPets: [...prevState.remarks.goodWithOtherPets, name],
        },
      }));
    } else {
      setFormData((prevState: any) => ({
        ...prevState,
        remarks: {
          ...prevState.remarks,
          goodWithOtherPets: prevState.remarks.goodWithOtherPets.filter(
            (pet: string) => pet !== name,
          ),
        },
      }));
    }
  };

  const radioButtonsOptions = (name: string, value: string) => {
    return (
      <RadioGroup row name={name} value={value}>
        <FormControlLabel
          value="Yes"
          control={<Radio />}
          label="Yes"
          onChange={(e) => handleRemarksChange(e)}
        />
        <FormControlLabel
          value="No"
          control={<Radio />}
          label="No"
          onChange={(e) => handleRemarksChange(e)}
        />
      </RadioGroup>
    );
  };

  const validateForm = () => {
    let newErrors = {};

    // Check each field for errors
    if (formData.petName === '') {
      newErrors = { ...newErrors, petName: 'Pet name is required' };
    } else if (!pattern.test(formData.petName)) {
      newErrors = { ...newErrors, petName: 'No numbers allowed in pet name' };
    }

    if (formData.type === '') {
      newErrors = { ...newErrors, type: 'Pet type is required' };
    } else if (!pattern.test(formData.type)) {
      newErrors = { ...newErrors, type: 'No numbers allowed in pet type' };
    }

    if (formData.gender === '') {
      newErrors = { ...newErrors, gender: 'Pet gender is required' };
    }
    if (formData.size === '') {
      newErrors = { ...newErrors, size: 'Pet size is required' };
    }

    if (formData.age === '') {
      newErrors = { ...newErrors, age: 'Pet age is required' };
    }

    if (formData.location.trim() === '') {
      newErrors = { ...newErrors, location: 'Location is required' };
    }

    if (images.length < 2) {
      newErrors = { ...newErrors, photos: 'Please upload at least 2 photos' };
    }

    if (formData.description === '') {
      newErrors = { ...newErrors, description: 'Description pet is required' };
    }

    // Add validation for other fields here

    setErrors(newErrors as any);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const [location, setLocation] = useState<LatLng | null>(null);

  const [givenLocationByField, setGivenLocationByField] = useState('');

  const iconPinMap = new Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [15, 20], // Size of the icon
    iconAnchor: [1, 25], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34],
  });

  const fetchCityName = (lat: number, lng: number) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const city = data.address.city;
        setFormData((prevData) => ({
          ...prevData,
          location: city,
        }));
      })
      .catch((error) => {
        console.error('Error fetching city name:', error);
      });
  };

  const SetLocationMarker = () => {
    const map = useMapEvents({
      click() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation(new LatLng(latitude, longitude));
              // fetchCityName(latitude, longitude);
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            },
          );
        }

        map.locate();
      },

      locationfound(e) {
        setLocation(e.latlng);
        fetchCityName(e.latlng.lat, e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    if (location) {
      map.flyTo(location, map.getZoom());
    }

    return location === null ? null : (
      <Marker position={[location.lat, location.lng]} icon={iconPinMap} />
    );
  };

  const findLocation = (location: string) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setLocation(new LatLng(parseFloat(lat), parseFloat(lon)));
        } else {
          console.error('Location not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  };

  const handleSearchLocation = () => {
    if (formData.location === '') {
      setErrors({ ...errors, location: 'Location is required' });
      return;
    }
    findLocation(givenLocationByField);
  };

  const handleOnBlur = (event: any) => {
    const { name, value } = event.target;
    if (name === 'location' && value.length > 0) {
      setGivenLocationByField(value);
    } else {
      setGivenLocationByField('');
    }
  };

  const uploadImagesToFirebase = async () => {
    const uploadPromises = images.map(async (image) => {
      const imageRef = ref(storage, `images/${image.file.name + '_' + v4()}`);
      await uploadBytes(imageRef, image.file);
      const imageUrl = await getDownloadURL(imageRef);

      return imageUrl;
    });

    return Promise.all(uploadPromises);
  };

  const onImageUpload = (imageList: any) => {
    setImages(imageList);
    if (imageList.length >= 2) {
      setErrors({ ...errors, photos: [] });
    }
  };

  const handleFormSubmit = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;

    if (!token) {
      return;
    }

    try {
      const imageUrls = await uploadImagesToFirebase();

      const updatedFormData = {
        ...formData,
        photos: imageUrls,
      };

      // Send form data to MongoDB
      const response = await axios.post(`${URL}/addPets`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setFormData({
          petName: '',
          type: '',
          gender: '',
          size: '',
          age: '',
          breed: '',
          remarks: {
            microchipped: '',
            neutered: '',
            specialNeeds: '',
            houseTrained: '',
            goodWithKids: '',
            behaviouralIssues: '',
            goodWithOtherPets: [],
          },
          description: '',
          location: '',
          photos: [],
        });

        setErrors({
          petName: '',
          type: '',
          gender: '',
          size: '',
          breed: '',
          age: '',
          description: '',
          location: '',
          photos: [],
        });

        setImages([]);
        setLocation(null);
        toast.success(response.data.message, {
          position: 'bottom-center',
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.error, { position: 'bottom-center' });
    }
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
        }}
      >
        <Box data-testid="main" className={style.main}>
          <Box className={style.titleSection}>
            <Typography className={style.title}>Rehome your Pet</Typography>
            <div className={style.breadcrumbsDiv}>
              <Breadcrumbs />
            </div>
          </Box>
          <Box data-testid="box" className={style.boxHolder}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <img
                src="./images/paws_background.jpg"
                title="paws background"
                alt="paws background"
                style={{
                  width: 'calc(100vw - 20px)',
                  position: 'absolute',
                  opacity: '0.1',
                  // transform: 'translateX(calc((1200px - 100%)/2))',
                }}
              />
              <Card className={style.cardHolder} data-testid="card-holder">
                <Box className={style.petInfoBox}>
                  <Box className="caracteristici">
                    <Typography className={style.characteristicsTitle}>
                      Characteristics of the pet
                    </Typography>
                    <Box
                      className={style.characteristicBox}
                      data-testid="characteristics-box"
                    >
                      <Box>
                        <Box
                          className={style.nameBox}
                          component="form"
                          data-testid="form"
                        >
                          <Typography>Name*</Typography>
                          <TextField
                            required
                            size="small"
                            name="petName"
                            label=""
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) => handleErrorsOnBlur(e)}
                            error={Boolean(errors.petName)}
                            helperText={errors.petName}
                            value={toTitleCase(formData.petName)}
                          />
                        </Box>
                        <Box className={style.nameBox}>
                          <Typography>Type*</Typography>
                          <TextField
                            required
                            size="small"
                            label=""
                            name="type"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) => handleErrorsOnBlur(e)}
                            error={Boolean(errors.type)}
                            helperText={errors.type}
                            value={formData.type}
                          />
                        </Box>
                        <Box className={style.nameBox}>
                          <FormControl
                            required
                            size="small"
                            sx={{ width: 222 }}
                            error={Boolean(errors.gender)}
                          >
                            <Typography>Gender*</Typography>
                            <Select
                              id="gender-select"
                              name="gender"
                              label=""
                              value={formData.gender}
                              onChange={(event) => handleInputChange(event)}
                              onBlur={(e) => handleErrorsOnBlur(e)}
                            >
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                            </Select>
                            <FormHelperText>{errors.gender}</FormHelperText>
                          </FormControl>
                        </Box>
                      </Box>
                      <Box>
                        <Box className={style.nameBox}>
                          <FormControl
                            required
                            size="small"
                            sx={{ width: 222 }}
                            error={Boolean(errors.size)}
                          >
                            <Typography>Size*</Typography>
                            <Select
                              id="size-select"
                              name="size"
                              label=""
                              required
                              value={formData.size}
                              onChange={(event) => handleInputChange(event)}
                              onBlur={(e) => handleErrorsOnBlur(e)}
                            >
                              <MenuItem value="Small">Small</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="Large">Large</MenuItem>
                            </Select>
                            <FormHelperText>{errors.size}</FormHelperText>
                          </FormControl>
                        </Box>
                        <Box className={style.nameBox}>
                          <Box>
                            <Typography>Age*</Typography>
                            <Tooltip
                              title="Please enter the age in years for more accuracy. Ex: 1.5 years, 0.5 years, 0.3 years, etc."
                              placement="right"
                              slotProps={{
                                popper: {
                                  modifiers: [
                                    {
                                      name: 'offset',
                                      options: {
                                        offset: [0, -10],
                                      },
                                    },
                                  ],
                                },
                              }}
                            >
                              <HelpOutlineIcon
                                color="action"
                                sx={{ fontSize: 10 }}
                              />
                            </Tooltip>
                          </Box>

                          <TextField
                            size="small"
                            variant="outlined"
                            label=""
                            required
                            name="age"
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) => handleErrorsOnBlur(e)}
                            error={Boolean(errors.age)}
                            helperText={errors.age}
                            value={formData.age}
                          />
                        </Box>
                        <Box className={style.nameBox}>
                          <Typography>Breed</Typography>
                          <TextField
                            size="small"
                            name="breed"
                            label=""
                            onChange={(e) => handleInputChange(e)}
                            onBlur={(e) => handleErrorsOnBlur(e)}
                            value={formData.breed}
                            error={Boolean(errors.breed)}
                            helperText={errors.breed}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="remarci">
                    <Typography className={style.remarksTitle}>
                      Remarks
                    </Typography>
                    <Box className={style.remarkQuestionsBox}>
                      <FormControl
                        className={style.formControlRemarks}
                        data-testid="form-control-remarks"
                      >
                        <FormLabel sx={{ width: 180 }}>Microchipped</FormLabel>
                        {radioButtonsOptions(
                          'microchipped',
                          formData.remarks.microchipped,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarks}>
                        <FormLabel sx={{ width: 180 }}>Neutered</FormLabel>
                        {radioButtonsOptions(
                          'neutered',
                          formData.remarks.neutered,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarks}>
                        <FormLabel sx={{ width: 180 }}>
                          Has special needs
                        </FormLabel>
                        {radioButtonsOptions(
                          'specialNeeds',
                          formData.remarks.specialNeeds,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarks}>
                        <FormLabel sx={{ width: 180 }}>House trained</FormLabel>
                        {radioButtonsOptions(
                          'houseTrained',
                          formData.remarks.houseTrained,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarks}>
                        <FormLabel sx={{ width: 180 }}>
                          Good with kids
                        </FormLabel>
                        {radioButtonsOptions(
                          'goodWithKids',
                          formData.remarks.goodWithKids,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarks}>
                        <FormLabel sx={{ width: 180 }}>
                          Has behavioural issues
                        </FormLabel>
                        {radioButtonsOptions(
                          'behaviouralIssues',
                          formData.remarks.behaviouralIssues,
                        )}
                      </FormControl>
                      <FormControl className={style.formControlRemarksLastItem}>
                        <FormLabel sx={{ width: 180 }}>
                          Good with other pets
                        </FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  (
                                    formData.remarks
                                      .goodWithOtherPets as string[]
                                  ).includes('dogs')
                                    ? true
                                    : false
                                }
                              />
                            }
                            label="Dogs"
                            name="dogs"
                            onChange={(e) => handleGoodWithOtherPetsChange(e)}
                            value={formData.remarks.goodWithOtherPets}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  (
                                    formData.remarks
                                      .goodWithOtherPets as string[]
                                  ).includes('cats')
                                    ? true
                                    : false
                                }
                              />
                            }
                            label="Cats"
                            name="cats"
                            onChange={(e) => handleGoodWithOtherPetsChange(e)}
                            value={formData.remarks.goodWithOtherPets}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  (
                                    formData.remarks
                                      .goodWithOtherPets as string[]
                                  ).includes('rabbits')
                                    ? true
                                    : false
                                }
                              />
                            }
                            label="Rabbits"
                            name="rabbits"
                            onChange={(e) => handleGoodWithOtherPetsChange(e)}
                            value={formData.remarks.goodWithOtherPets}
                            // checked={formData.remarks.goodWithOtherPets ? true : false}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  (
                                    formData.remarks
                                      .goodWithOtherPets as string[]
                                  ).includes('birds')
                                    ? true
                                    : false
                                }
                              />
                            }
                            label="Birds"
                            name="birds"
                            onChange={(e) => handleGoodWithOtherPetsChange(e)}
                            value={formData.remarks.goodWithOtherPets}
                          />
                        </FormGroup>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box className="story">
                    <Typography className={style.storyTitle}>
                      Pet's Story
                    </Typography>
                    <Typography className={style.info}>
                      Share anything about your pet. Include information such
                      as:
                    </Typography>
                    <Typography className={style.detailesForDescription}>
                      &#x2022; Your pet's story: how long you've had them, where
                      you got from and why you need to rehome them <br />
                      &#x2022; Details about who your pet lived with: children,
                      other pets, outside/ inside of the house
                      <br />
                      &#x2022; Your pet's personality: what they like to do,
                      their favourite toys, games, treats, etc.
                      <br />
                      &#x2022; Anything they scared of suck as fireworks, loud
                      noises, etc. <br />
                      &#x2022; Your pet's health: any medical conditions,
                      special food, medicamentations or behavioural issues
                      <br />
                      &#x2022; Anything else you think is important for
                      potential adopters to know about your pet
                      <br />
                    </Typography>
                    <div className={style.errorMessageForDescpritionAndPhotos}>
                      {errors.description}
                    </div>
                    <TextareaAutosize
                      id="description"
                      name="description"
                      minRows={15}
                      maxRows={15}
                      className={style.textareaDescription}
                      onChange={(e) => handleInputChange(e)}
                      value={formData.description}
                      onBlur={(e) => handleErrorsOnBlur(e)}
                      placeholder="Please provide a description for your pet. This field is required."
                    />
                  </Box>
                  <Box className=" incarca poze">
                    <Typography className={style.photosUploadTitle}>
                      Photos
                    </Typography>
                    <Typography className={style.info}>
                      Please upload at least 2 photos of your pet
                    </Typography>
                    <Box>
                      <div
                        className={style.errorMessageForDescpritionAndPhotos}
                      >
                        {errors.photos}
                      </div>
                      <ImageUploading
                        multiple
                        value={images}
                        maxNumber={maxImages}
                        acceptType={acceptType}
                        onChange={onImageUpload}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageUpdate,
                          onImageRemove,
                        }) => (
                          <div>
                            <div>
                              <Button
                                onClick={onImageUpload}
                                className={style.photosButtons}
                              >
                                Upload here
                              </Button>
                              <Button
                                onClick={onImageRemoveAll}
                                className={style.photosButtons}
                              >
                                Remove all images
                              </Button>
                            </div>

                            <div className={style.photoUploadBox}>
                              {imageList.map((image, index) => (
                                <div key={index} className={style.imageItem}>
                                  <Card className={style.photoUploadCard}>
                                    <img
                                      src={image['data_url']}
                                      alt=""
                                      width="200"
                                    />
                                  </Card>
                                  <div
                                    className={style.imageButtons}
                                    data-testid="buttons"
                                  >
                                    <button
                                      onClick={() => onImageUpdate(index)}
                                    >
                                      Update
                                    </button>
                                    <button
                                      onClick={() => onImageRemove(index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </ImageUploading>
                    </Box>
                  </Box>
                  <Box className="locatie">
                    <Typography className={style.locationTitle}>
                      Location*
                    </Typography>
                    <Box className={style.locationForm}>
                      <Typography className={style.info}>
                        Please enter the location of your pet
                      </Typography>
                      <div
                        className={style.locationSearcher}
                        data-testid="location-sercher"
                      >
                        <TextField
                          size="small"
                          placeholder="City"
                          name="location"
                          label=""
                          error={Boolean(errors.location)}
                          helperText={errors.location}
                          onChange={(e) => handleInputChange(e)}
                          value={formData.location}
                          onBlur={(e) => handleOnBlur(e)}
                        />
                        <Tooltip
                          title="Search location on the map"
                          placement="bottom-end"
                          slotProps={{
                            popper: {
                              modifiers: [
                                {
                                  name: 'offset',
                                  options: {
                                    offset: [0, -14],
                                  },
                                },
                              ],
                            },
                          }}
                        >
                          <Button
                            style={{ height: '10%' }}
                            onClick={handleSearchLocation}
                          >
                            <TravelExploreIcon color="action" />
                          </Button>
                        </Tooltip>
                      </div>
                    </Box>

                    <div className={style.mapHolder}>
                      <MapContainer
                        center={[46.8, 23.45]}
                        zoom={8}
                        style={{ height: '450px' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        />
                        <SetLocationMarker />
                      </MapContainer>
                    </div>
                  </Box>
                </Box>
              </Card>

              <Button
                className={style.submitFormButton}
                onClick={handleFormSubmit}
              >
                <Typography>Submit</Typography>
              </Button>
            </div>
          </Box>
        </Box>
      </div>
      <Footer />
    </>
  );
};

export default RehomePet;
