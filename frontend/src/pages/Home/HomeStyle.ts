import { css } from '@emotion/css';

const HomeStyle = () => {
  return {
    searchDiv: css`
      display: flex;
      justify-content: space-around;
      width: 100%;
      position: absolute;
      z-index: 2;
    `,

    picture: css`
      position: relative;
      width: 100%;
    `,

    askLoginDialog: css`
      > div > div {
        height: 220px !important;
        width: 420px !important;
        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;

          > div {
            display: flex;
            justify-content: space-evenly;
            width: 100%;

            > a {
              text-decoration: none;
              color: #fab005;
            }
          }
        }
      }
    `,

    closeDialog: css`
      height: 15% !important;
      padding: 0 !important;
      > button {
        padding: 0;
        > svg {
          height: 20px;
        }
      }
    `,

    dialogContent: css`
      > p {
        font-family: 'ABeeZee', serif !important;
        font-weight: 600;
      }
      > div {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
      }
    `,

    loadingContainer: css`
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;

      > button {
        > span {
          > span {
            width: 50px !important;
            height: 50px !important;
            color: orange;
          }
        }
      }
    `,

    boxImage: css`
      display: flex;
      align-items: flex-end;
      position: relative;
    `,

    overlay: css`
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 85vh;
      position: absolute;
      z-index: 1;
    `,

    welcomeBox: css`
      position: absolute;
      z-index: 2;
      left: 10%;
      bottom: 55%;
      width: 90%;

      @media (max-width: 1600px) {
        left: 10%;
        bottom: 50%;
      }

      @media (max-width: 1400px) {
        left: 10%;
        bottom: 45%;
      }

      @media (max-width: 975px) {
        left: 10%;
        bottom: 40%;
      }

      @media (max-width: 900px) {
        left: 10%;
        bottom: 35%;
      }
    `,

    welcomeTextContainer: css`
      width: 35%;
      display: flex;
      flex-direction: column;
      margin-bottom: 25px;
    `,

    welcomeText: css`
      font-size: 32px !important;
      font-family: 'ABeeZee', serif !important;
      font-weight: 600 !important;
      color: white !important;
      > span {
        color: #fab005;
      }

      @media (min-width: 1600px) {
        font-size: 40px !important;
      }
    `,

    whatIwantSection: css`
      height: 50px;
      display: flex;
      width: 400px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    `,

    wantToAdoptButton: css`
      background: #fab005 !important;
      padding: 10px;
      border-radius: 45px !important;
      width: 35%;

      > button {
        color: white;
        height: 20px !important;
        transition: 0.3s;
        > div {
          > h6 {
            font-family: 'Inter', sans-serif !important;
            font-weight: 450 !important;
          }
        }
        :hover {
          opacity: 8;
          transition: background-color 0.5s ease-in 0.3s;
        }
      }
    `,

    wantToRehomeButton: css`
      padding: 10px;
      border: 3px solid white !important;
      background: transparent !important;
      border-radius: 45px !important;
      width: 35%;

      > button {
        height: 20px !important;
        color: #000000;

        > div {
          > h6 {
            font-family: 'Inter', sans-serif !important;
            font-weight: 450 !important;
          }
        }
      }
    `,

    optionsAvailableCards: css`
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;

      > svg {
        padding: 10px;
      }
    `,

    svgImage: css`
    position: absolute;
    z-index: 1;
    > path{
      fill: white;
    }
}
    `,

    searchContainer: css`
      position: absolute;
      width: 100%;
      z-index: 1;
      border: 2px red solid;
      top: 95vh;
    `,

    group: css`
      border: 1px black solid;
      border-radius: 16px !important;
    `,

    beforeAdoptContainer: css`
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-around;
      padding-top: 5%;
      padding-bottom: 3%;
    `,

    beforeYouAdoptSection: css`
      display: flex;
      width: 70%;
      border-radius: 12px !important;
      cursor: pointer;

      @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    `,

    beforeYouAdoptImageSection: css`
      border-radius: 12px;
      width: 50% !important;
    `,

    beforeYouAdoptInfo: css`
      margin-left: 30px;

      > div {
      font-family: 'ABeeZee', serif !important;
       
        font-size: 24px;
        line-height: 36px;
        font-weight: 600;
      }

      > p {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400 !important;
    }
      }

    `,

    carouselBox: css`
      width: 100%;
      margin-top: 40px;
      margin-bottom: 40px;
      padding-bottom: 20px;
      align-content: space-around;
      display: flex;
      justify-content: center;

      > div {
        margin-bottom: 40px;
        width: 100%;

        > p {
          margin-left: 70px;
          padding-top: 10px;
          width: 70%;
          margin-left: 10% !important;
          font-family: 'ABeeZee', serif !important;
          font-size: 24px;
          line-height: 36px;
          font-weight: 600;

          > svg {
            transform: rotate(40deg);
            color: #fab005 !important;
            opacity: 0.5;
          }
        }
      }
    `,

    adoptingSection: css`
      position: relative;
      display: flex;
      justify-content: center;
      margin-bottom: 5%;

      > div {
        width: 90%;
        > div {
          height: 250px;
          margin-bottom: 15px;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 100px;
          margin-left: 140px;
          background-color: rgb(216, 229, 247, 0.62) !important;
          border-radius: 12px;
          padding: 10px;
          cursor: pointer;

          > img {
            height: 100%;
            border-radius: 8px;
            width: 35%;
          }
        }
      }
    `,

    titleCardsAdoptionInfo: css`
      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
      margin-bottom: 15px !important;
    `,

    contentCardAdoptionInfo: css`
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      line-height: 24px !important;
      font-weight: 400 !important;
    `,
  };
};

export default HomeStyle;
