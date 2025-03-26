import { css } from '@emotion/css';

const PetProfileStyle = () => {
  const styleSubmitButton = css`
    font-size: 18px !important;
    font-family: 'ABeeZee', serif !important;
    font-weight: 500 !important;
  `;
  return {
    root: css`
      padding: 0 32px;

      @media (max-width: 768px) {
        padding: 0 16px;
      }
    `,
    grid: css`
      background: #e3eceb;
      position: relative;
    `,

    header: css`
      height: 200px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: flex-end;
    `,

    title: css`
      width: 100%;
      color: black;
      position: relative;
      z-index: 3;
      font-size: 44px !important;
      font-family: 'ABeeZee', serif !important;
      font-weight: 600 !important;
    `,

    photoSection: css`
      display: flex;
      align-items: center;
      justify-content: start;

      @media (max-width: 480px) {
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
    `,

    imageCard: css`
      height: 320px;
      width: 320px;
      border-radius: 50%;
      transition: all 1s ease-in-out;

      @media (max-width: 768px) {
        width: 230px;
        height: 230px;
      }
    `,

    petMainInfo: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;

      > p {
        color: black;
        font-family: 'ABeeZee', serif !important;
        font-size: 24px !important;
        font-weight: 500 !important;
      }
      > div {
        > p {
          color: black;
          font-family: 'ABeeZee', serif !important;
          font-size: 18px !important;
          font-weight: 500 !important;
        }
      }
      @media (max-width: 480px) {
        margin: 0;
      }
    `,

    headerInfoHolder: css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      margin-top: 30px;

      @media (max-width: 480px) {
        grid-gap: 10px;
      }
    `,

    moreInfoPet: css`
      display: flex;
      flex-direction: column;
      align-items: start;
    `,

    personalityInfo: css`
      margin-bottom: 30px;
      line-height: 1.8 !important;
      > div {
        margin-bottom: 20px;
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
    `,

    importantPersonalityPet: css`
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      > div {
        > div {
          font-family: 'ABeeZee', serif !important;
          font-size: 24px;
          line-height: 36px;
          font-weight: 600;

          @media (max-width: 480px) {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          @media (max-width: 768px) {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      }
    `,

    otherInfoDiv: css`
      color: black;
    `,

    petsRemarks: css`
      display: grid !important;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 3px;
      margin-top: 10px !important;
      white-space: nowrap;

      > div {
        > p {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 24px;
          font-weight: 400 !important;
        }
      }
    `,

    petsRemarkValue: css`
      display: flex;
      justify-content: center;
    `,

    gallerySection: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
    `,

    imageContainer: css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin: 0 auto;
      justify-content: center;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    `,

    emailSection: css`
      width: 100%;
      margin-top: 50px;
      margin-bottom: 30px;
      display: flex;
      align-items: start;
      flex-direction: column;
    `,

    formSection: css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;

      > svg {
        margin-right: 3px;
        transform: rotate(20deg);
        color: #fab005 !important;
        opacity: 0.5;
      }

      > h6 {
        margin-bottom: 15px !important;
      }
    `,

    emailFormAndMessage: css`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 50%;

      @media (max-width: 480px) {
        width: 100%;
      }
    `,

    emailForm: css`
      > div{
        color: #2c2c2c !important;
        background-color: white !important;
        font-family: 'Inter', sans-serif; !important;
      }
      p{
        font-family: 'Inter', sans-serif; !important;
        font-size: 14px;
        line-height: 24px;
      }
    `,

    textArea: css`
    border-radius: 4px;
      > textarea {
        font-family: 'Inter', sans-serif; !important;
      }
    `,

    contactMeTitle: css`
      margin-bottom: 30px !important;
      padding-top: 30px !important;
      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
    `,

    contactMeForm: css`
      width: 100%;

      > div {
        margin-bottom: 15px;
        > div {
          > fieldset {
            border-color: transparent !important;
        }
      }
      > button {
        margin-bottom: 20px;
        width: 100px;
      }
    `,

    submitButton: css`
      ${styleSubmitButton}
      background-color: #eb845c !important;
      text-transform: none !important;
      color: White;
    `,

    submitButtonDisabled: css`
      ${styleSubmitButton}
      background-color: #eb845c66 !important;
      text-transform: none !important;
      color: white !important;
    `,

    formContactResponseMessage: css`
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      font-weight: 600 !important;
    `,
  };
};

export default PetProfileStyle;
