import { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  Button,
  Autocomplete,
  TextField,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
} from '@mui/material';
import { Typography } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import NavbarNew from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  convertStringToArray,
  createPetsAgeForDropdown,
  checkAgeMonthOrYear,
} from '../../helpers/helpers';
import { addIconForType } from '../../helpers/petsIcon';
import 'react-toastify/dist/ReactToastify.css';
import AdoptPetStyle from './AdoptPetStyle';

type Option = {
  label: string;
  tooltipText: string;
};

const URL = process.env.REACT_APP_URL;

const AdoptAPet = () => {
  const style = AdoptPetStyle();

  const navigate = useNavigate();
  const allPetsReceived = useLocation();

  const allPets = allPetsReceived?.state?.allPets;

  // ce animal am selectat - type
  const [selectedPetType, setSelectedPetType] = useState('all');

  // lista cu animale selectate la click, default e allPets pt ca il primeste de la Home - e array
  const [searchedPets, setSearchedPets] = useState(allPets);

  // se salveaza un array cu toate animalele care au locatia selectata
  const [petsWithFilterApplied, setPetsWithFilterApplied] = useState([]);

  const [locationValue, setLocationValue] = useState(null);

  const [genderValue, setGenderValue] = useState<string | null>(null);
  const [genderOptions, setGenderOptions] = useState<string[]>([]);

  const [sortedLocations, setSortedLocations] = useState<string[]>([]);

  const [ageValue, setAgeValue] = useState<string[]>([]);

  const [selectedAge, setSelectedAge] = useState<Option | null>(null);

  const [visible, setVisible] = useState(8);

  // search pets by type
  const searchPets = async (searchedPet: any) => {
    let searchedPetByType = '';

    if (searchedPet === 'all') {
      searchedPetByType = 'all';
    } else if (searchedPet === 'other') {
      searchedPetByType = 'other';
    } else {
      searchedPetByType = searchedPet;
    }
    try {
      const pets = await axios.get(
        `${URL}/searchPets?searchedPet=${searchedPetByType}`,
      );
      setSearchedPets(pets.data);

      setSelectedPetType(searchedPet);
      setPetsWithFilterApplied([]);
      setLocationValue(null);
      setSelectedAge(null);

      // setGenderValue(null);
      setVisible(8);
    } catch (error) {
      toast.error('Error loading pets', { position: 'bottom-center' });
    }
  };

  // populate dropdowns: location, age, gender
  const populateLocationDropdown = () => {
    try {
      axios
        .get(`${URL}/populateLocationDropdown?searchedPet=${selectedPetType}`)
        .then((response) => {
          setSortedLocations(response.data);
        });
    } catch (error) {
      toast.error('Error loading locations', { position: 'bottom-center' });
    }
  };

  const populateAgeDropdown = () => {
    try {
      axios
        .get(`${URL}/populateAgeDropdown?searchedPet=${selectedPetType}`)
        .then((response) => {
          setAgeValue(response.data);
        });
    } catch (error) {
      toast.error('Error loading ages', { position: 'bottom-center' });
    }
  };

  const populateGenderDropdown = () => {
    try {
      axios
        .get(`${URL}/populateGenderDropdown?searchedPet=${selectedPetType}`)
        .then((response) => {
          setGenderOptions(response.data);
        });
    } catch (error) {
      toast.error('Error loading genders', { position: 'bottom-center' });
    }
  };

  // filters

  const filterPets = async (location: any, gender: any, age: any) => {
    const ageConverted = convertStringToArray(age?.tooltipText);
    try {
      const params = {
        location,
        gender,
        age: ageConverted,
      };

      const petsByFilter = await axios.get(
        `${URL}/filterPetsByTypeAndProperties?type=${selectedPetType}`,
        {
          params,
        },
      );

      setPetsWithFilterApplied(petsByFilter?.data);
    } catch (error: any) {
      const { message } = error.response?.data;

      toast.error(message, { position: 'bottom-center' });
    }
  };

  const handlerLoadMore = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    searchPets(selectedPetType);
    populateLocationDropdown();
    populateAgeDropdown();
    populateGenderDropdown();
  }, [selectedPetType]);

  const displayPets = (displaySelectedPets: any) => {
    return (
      <>
        <Box className={style.petsCardsBox} data-testid="boxul-mare ">
          <Box data-testid="grid-mare" className={style.petCards}>
            {displaySelectedPets
              ?.slice(0, visible)
              .map((pet: any, index: any) => {
                let currentPetPhoto =
                  pet.photos.length > 0 ? pet.photos[0] : '';

                return (
                  <Card
                    className={style.cards}
                    key={index}
                    data-testid="card-return"
                  >
                    <CardMedia
                      className={style.cardMedia}
                      image={currentPetPhoto}
                      title="pet-image"
                    />
                    <CardContent
                      className={style.cardContent}
                      data-testid="card-content-pet-profile"
                    >
                      <Typography
                        className={style.headerCardContent}
                        gutterBottom
                        variant="h6"
                        component="div"
                        data-testid="petName"
                      >
                        <div>{addIconForType(pet.type)}</div>
                        Name: {pet.petName}
                      </Typography>
                      <Typography variant="body2">
                        Age: {`${pet.age} ${checkAgeMonthOrYear(pet.age)}`}
                        <br />
                        Gender: {pet.gender}
                        <br />
                        Location: {pet.location}
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions className={style.cardButton}>
                      <Button
                        size="small"
                        onClick={() =>
                          navigate('/adoptapet/petprofile', { state: { pet } })
                        }
                      >
                        See more
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </Box>
        </Box>

        <Box className={style.loadMoreButton}>
          {visible >= searchedPets?.length ? (
            <Button onClick={handleScrollToTop}>Go to top</Button>
          ) : (
            <Button onClick={handlerLoadMore}>Load more...</Button>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <NavbarNew />
      <Grid className={style.grid}>
        <Box className={style.titleSection} data-testid="box-image">
          {/* <div className={style.poza}></div> */}

          <div data-testid="overlay" className={style.overlay} />
          <img
            src="./images/adoptPetBackground.jpg"
            alt="Pet profile"
            style={{
              width: '100%',
              position: 'relative',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Typography variant="h3" className={style.title}>
            Adopt a pet
          </Typography>
          <div className={style.breadcrumbDiv}>
            <Breadcrumb />
          </div>
        </Box>
        <Box className={style.searchSection} data-testid="search-section">
          <Card
            className={style.searchFilterCard}
            data-testid="search-filtered-cards"
          >
            <div className={style.searchTypes} data-testid="search-types">
              <Button
                onClick={() => searchPets('Cat')}
                style={{
                  border: selectedPetType === 'Cat' ? '1px solid #eb845c' : '',
                }}
              >
                Cats
              </Button>
              <Button
                onClick={() => searchPets('Dog')}
                style={{
                  border: selectedPetType === 'Dog' ? '1px solid #eb845c' : '',
                }}
              >
                Dogs
              </Button>
              <Button
                onClick={() => searchPets('Bird')}
                style={{
                  border: selectedPetType === 'Bird' ? '1px solid #eb845c' : '',
                }}
              >
                Birds
              </Button>
              <Button
                onClick={() => searchPets('other')}
                style={{
                  border:
                    selectedPetType === 'other' ? '1px solid #eb845c' : '',
                }}
              >
                Other pets
              </Button>
              <Button
                onClick={() => searchPets('all')}
                style={{
                  border: selectedPetType === 'all' ? '1px solid #eb845c' : '',
                }}
              >
                All pets
              </Button>
            </div>
            <div className={style.filterTypes} data-testid="filter-types">
              <Autocomplete
                // className={style.autocomplete}
                id="location-field"
                size="small"
                options={sortedLocations}
                value={locationValue}
                onChange={(event: any, value: any) => {
                  setLocationValue(value);
                  filterPets(value, genderValue, selectedAge);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Location"
                    data-testid="location-autocomplete"
                    className={style.autocompleteField}
                  />
                )}
              />
              <Autocomplete
                id="gender-field"
                size="small"
                options={genderOptions}
                value={genderValue}
                onChange={(event: any, value: any) => {
                  setGenderValue(value);
                  filterPets(locationValue, value, selectedAge);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Gender"
                  />
                )}
              />
              <Autocomplete
                id="age-field"
                size="small"
                options={createPetsAgeForDropdown(ageValue)}
                value={selectedAge || null}
                renderOption={(props, option) => (
                  <Tooltip key={option.label} title={option.tooltipText} arrow>
                    <li {...props}>{option.label}</li>
                  </Tooltip>
                )}
                onChange={(event: any, value: any) => {
                  setSelectedAge(value);

                  filterPets(locationValue, genderValue, value);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" placeholder="Age" />
                )}
              />
            </div>
          </Card>
        </Box>

        {petsWithFilterApplied.length === 0
          ? displayPets(searchedPets)
          : displayPets(petsWithFilterApplied)}
        <Footer />
      </Grid>
    </>
  );
};
export default AdoptAPet;
