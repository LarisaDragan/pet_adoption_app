import { css } from '@emotion/css';

const AdoptPetStyle = () => {
  const dropdownFilterStyle = css`
.MuiAutocomplete-listbox: {
  > div {
    > ul {
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      line-height: 24px !important;
    }
  }
`;

  return {
    grid: css`
      background: #e3eceb;
    `,
    titleSection: css`
      height: 565px;
      width: 100%;
      background-color: #b4c3c9;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      position: relative;
    `,

    overlay: css`
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    `,

    poza: css`
      position: relative;
      background-image: url('./images/adoptPetBackground.jpg');
      width: 100%;

      height: 100%;
      objectfit: cover;
      background-size: cover; /* Cover the entire div */
      background-position: center;
    `,

    title: css`
      color: white;
      position: absolute;
      z-index: 3;
      font-size: 44px !important;
      font-family: 'ABeeZee', serif !important;
      font-weight: 600 !important;
      color: white !important;
    `,

    breadcrumbDiv: css`
      position: absolute;
      display: flex;
      height: 100px;
      align-items: flex-end;
      min-width: 180px;
      z-index: 3;
      > div {
        color: white;
        > div > a {
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 18px !important;
        }
      }
    `,

    searchSection: css`
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
    `,

    searchFilterCard: css`
      z-index: 1;
      position: relative;
      bottom: 15px;
      height: 150px;
      width: 50%;
      // left: 25%;
      bottom: 30%;
      border-radius: 12px !important;
      min-width: 495px;

      @media (max-width: 2000 and min-width: 1200px) {
        height: 500px;
        width: 30%;
      }
    `,

    searchTypes: css`
      display: flex;
      justify-content: center;
      height: 40%;

      > button {
        margin: 10px 15px 0px;
        text-transform: capitalize;
        color: black;
        font-family: 'ABeeZee', serif !important;
        font-size: 18px !important;

        :hover {
          background-color: transparent;
        }
      }
    `,

    filterTypes: css`
      display: flex;
      justify-content: center;
      justify-content: space-around;
      margin-top: 10px;
      > div {
        width: 25%;
        > div {
          > div {
            font-family: 'Inter', sans-serif !important;
            font-size: 16px !important;
            line-height: 24px !important;
          }
        }
      }
    `,

    autocompleteField: css`
      ${dropdownFilterStyle}
    `,

    petsCardsBox: css`
      width: 80%;
      margin: auto;
    `,

    petCards: css`
      display: grid !important;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: auto;
      grid-gap: 2rem;
      justify-items: center;

      @media (max-width: 2000px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
      }
    `,

    cards: css`
      width: 300px;
      min-width: 300px;
      height: 500px;
      border-radius: 12px !important;
      padding: 10px;
      margin: 25px;
    `,

    cardMedia: css`
      height: 45%;
      border-radius: 12px !important;
    `,

    cardContent: css`
      height: 25%;
      margin-top: 10%;
      margin-left: 5%;

      > div {
        font-family: 'ABeeZee', serif !important;
        font-size: 20px !important;
        line-height: 24px !important;
        font-weight: 400 !important;
      }
      p {
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
        line-height: 24px !important;
        font-weight: 400 !important;
      }
    `,

    headerCardContent: css`
      display: flex;
      > div {
        margin-right: 5px;
      }
    `,

    cardButton: css`
      flex-direction: column;
      align-items: flex-end !important;
      margin-top: 10%;
      margin-right: 5%;

      > button {
        text-transform: none;
        color: black;
        font-family: 'Inter', sans-serif !important;
        font-size: 14px !important;
      }
    `,

    loadMoreButton: css`
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin: 30px;

      > button {
        text-transform: none;
        color: black;
        border: 1px solid #5cc3eb;
        padding: 5px 10px;
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
    `,
  };
};

export default AdoptPetStyle;
