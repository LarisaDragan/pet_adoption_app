import { css } from '@emotion/css';

const FooterStyle = () => {
  return {
    footer: css`
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      background: #162f51 !important;
      font-family: 'ABeeZee', serif !important;
      color: white !important;

      z-index: 1;
      position: relative;
      > p {
        margin-left: 20px;
      }
    `,

    svgImage: css`
      height: 30px;
      width: 100%;
    `,
  };
};

export default FooterStyle;
