import { css } from '@emotion/css';

const PetCareStyle = () => {
  return {
    container: css`
      max-width: 1200px;
      display: flex;
      align-items: start;
      flex-direction: column;
      gap: 32px;
      position: relative;
      background: white;
      padding: 30px 55px 55px 55px !important;
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
  };
};
export default PetCareStyle;
