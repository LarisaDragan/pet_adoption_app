import { css } from '@emotion/css';

const AdoptionInfoStyle = () => {
  return {
    container: css`
      max-width: 1200px;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 32px;
      position: relative;
      background: white;
      padding-right: 55px !important;
      padding-left: 55px !important;
      padding-top: 30px;
      padding-bottom: 55px !important;
      margin-bottom: 50px;
      border-radius: 12px;
    `,

    titleSection: css`
      height: 200px;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-end;
      max-width: 1200px;
      width: 100%;
      margin-bottom: 50px;
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
  };
};
export default AdoptionInfoStyle;
