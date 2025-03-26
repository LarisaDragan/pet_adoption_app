import { useState } from 'react';
import Carousel from 'react-simply-carousel';

interface PetArrayType {
  _id: String;
  petName: String;
  location: String;
  age: Number;
  type: String;
  gender: String;
  size: String;
  breed: String;
  description: String;
  remarks: object;
  userId: String;
  userName: String;
  userEmailAddress: String;
  photos: String[];
}

const CarouselComp = ({ petArray }: { petArray: PetArrayType[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const takePhotos = (petArray: PetArrayType[]) => {
    let photos: any = [];
    petArray.forEach((pet: any) => {
      photos = photos.concat(pet.photos[0]);
    });
    return photos;
  };

  const photosOfAllPets = takePhotos(petArray);

  return (
    <Carousel
      data-testid="carusel-componenta"
      containerProps={{
        style: {
          justifyContent: 'center',
          paddingLeft: '15px',
          paddingRight: '15px',
        },
      }}
      activeSlideIndex={activeSlide}
      onRequestChange={setActiveSlide}
      forwardBtnProps={{ show: false }}
      backwardBtnProps={{ show: false }}
      swipeRatio={1}
      dotsNav={{
        show: true,
        itemBtnProps: {
          style: {
            height: 16,
            width: 16,
            margin: '2px',
            borderRadius: '50%',
            border: 0,
          },
        },
        activeItemBtnProps: {
          style: {
            height: 16,
            width: 16,
            margin: '2px',
            borderRadius: '50%',
            border: 0,
            background: '#fab005',
            opacity: 0.7,
          },
        },
      }}
      responsiveProps={[
        {
          minWidth: 1200,
          itemsToShow: 4,
        },
        {
          maxWidth: 1450,
          itemsToShow: 3,
        },
        {
          maxWidth: 1100,
          itemsToShow: 2,
        },
        {
          maxWidth: 1030,
          itemsToShow: 1,
        },
      ]}
      speed={400}
    >
      {photosOfAllPets.map((item: any, index: any) => (
        <div
          style={{
            width: 350,
            padding: '30px',
            textAlign: 'center',
          }}
          data-testid="div-carousel"
          key={index}
        >
          <img
            src={item}
            alt="pet"
            style={{
              width: '100%',
              height: '250px',
              borderRadius: '14px',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselComp;
