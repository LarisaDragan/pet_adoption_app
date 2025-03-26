import { css } from '@emotion/css';

const RehomePetStyle = () => {
  const interStyle = css`
    font-family: 'Inter', sans-serif !important;
    font-size: 16px !important;
    line-height: 24px !important;
    font-weight: 400 !important;
    color: black;
  `;

  return {
    main: css`
      max-width: 1200px;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 32px;
      position: relative;
    `,

    titleSection: css`
      height: 200px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: flex-end;
    `,

    title: css`
      color: black;
      font-size: 44px !important;
      font-family: 'ABeeZee', serif !important;
      font-weight: 600 !important;
    `,

    breadcrumbsDiv: css`
      width: 100%;
      > div > div > a {
        font-size: 18px !important;
        font-family: 'Inter', sans-serif;
      }
    `,

    boxHolder: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,

    cardHolder: css`
      height: auto;
      margin-top: 20px;
      z-index: 1;
    `,

    petInfoBox: css`
      padding: 40px;
    `,

    characteristicsTitle: css`
      margin-bottom: 20px !important;
      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
    `,

    characteristicBox: css`
      display: flex;
      justify-content: space-evenly;
    `,

    nameBox: css`
      margin-bottom: 15px;

      > div {
        display: flex;
        > p {
          ${interStyle}
        }
      }

      > p {
        ${interStyle}
      }
    `,

    photoUploadBoxAAA: css``,

    photoUploadCard: css`
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        display: flex;
        flex-direction: column;
      }
    `,

    photoUploadBox: css`
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-row-gap: 25px;
      justify-items: center;
      margin-top: 10px;
    `,

    imageItem: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,

    imageButtons: css`
      margin-top: 5px;
      display: flex;
      width: 150px;
      justify-content: space-around;
      > button {
        font-family: 'ABeeZee', serif !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        color: black;
        background: transparent;
        border: 1px solid #5cc3eb !important;
      }
    `,

    remarksTitle: css`
      margin-bottom: 20px !important;
      margin-top: 20px !important;
      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
      color: black;
    `,

    remarkQuestionsBox: css`
      display: flex;
      flex-direction: column;
    `,

    formControlRemarks: css`
      display: flex !important;
      flex-direction: row !important;
      align-items: center;
      > label {
        margin-right: 50px;
        ${interStyle}
      }

      > div {
        > label > span {
          ${interStyle}
        }
      }
    `,

    formControlRemarksLastItem: css`
      display: flex !important;
      flex-direction: row !important;
      align-items: start;
      > label,
      p {
        margin-right: 50px;
        ${interStyle}
      }

      > div {
        > label > span {
          ${interStyle}
        }
    `,

    storyTitle: css`
      margin-bottom: 20px !important;
      margin-top: 20px !important;

      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
      color: black;
    `,

    info: css`
      ${interStyle}
    `,

    detailesForDescription: css`
      padding-left: 15px;
      margin-bottom: 15px !important;
      ${interStyle}
    `,

    errorMessageForDescpritionAndPhotos: css`
      color: #d32f2f !important;
      font-weight: 400;
      font-size: 0.75rem;
      line-height: 1.66;
      letter-spacing: 0.03333em;
      text-align: left;
      margin-top: 4px;
      margin-right: 14px;
      margin-bottom: 0;
      margin-left: 14px;

      ${interStyle}
    `,

    textareaDescription: css`
      width: 100%;
      margin-left: 15px;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px;
      font-weight: 400 !important;
    `,

    photosUploadTitle: css`
      margin-bottom: 20px !important;
      margin-top: 20px !important;

      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
      color: black;
    `,

    photosButtons: css`
      margin: 10px 10px 10px !important;
      text-transform: none !important;
      color: black !important;
      padding: 3px 10px !important;
      border: 2px solid #5cc3eb !important;

      font-family: 'ABeeZee', serif !important;
      font-size: 14px !important;
      font-weight: 400 !important;
      color: black;
    `,

    locationTitle: css`
      margin-bottom: 20px !important;
      margin-top: 20px !important;

      font-family: 'ABeeZee', serif !important;
      font-size: 24px !important;
      line-height: 36px !important;
      font-weight: 600 !important;
      color: black;
    `,

    locationForm: css`
      margin-bottom: 20px !important;
    `,

    locationSearcher: css`
      display: flex;
      margin-top: 10px;
      > div {
        > p {
          ${interStyle}
        }
      }
    `,

    mapHolder: css`
      // width: 90%;
      margin-top: 20px;
      border: 2px solid #b4c3c9;
    `,

    submitFormButton: css`
      margin: 10px 0 10px !important;
      text-transform: none !important;
      background: #eb845c !important;
      color: white !important;
      padding: 10px 20px !important;

      > p {
        font-size: 18px !important;
        font-family: 'ABeeZee', serif !important;
        font-weight: 500 !important;
      }
    `,
  };
};

export default RehomePetStyle;
