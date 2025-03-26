import { css } from '@emotion/css';

const cardHeight = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-around',
};

const title = {
  fontFamily: 'ABeeZee, serif !important',
  fontSize: '18px !important',
  fontWeight: '600 !important',
};

const InfoCardStyle = () => {
  return {
    cardTitle: css`
      ${title}
    `,
    description: css`
      font-family: 'Inter', sans-serif !important;
      font-size: 16px !important;
      line-height: 24px !important;
      font-weight: 400 !important;
    `,

    petCareCard: css`
      ${cardHeight}
      box-shadow: none !important;
    `,

    card: css`
      ${cardHeight}
    `,

    petCareImage: css`
      border-radius: 12px;
    `,

    seeMoreButton: css`
      text-transform: none !important;
      font-family: 'Inter', sans-serif !important;
      font-size: 14px !important;
    `,

    cardAction: css`
      justify-content: flex-end;
      > button > svg {
        transform: rotate(40deg);
        color: #fab005 !important;
        opacity: 0.5;
        margin-right: 5px;
      }
    `,

    modalTitle: css`
      ${title}
      padding-top: 10px;
    `,

    closeModalButton: css`
      display: flex !important;
      justify-content: flex-end !important;
      margin-top: 40px;
      > button {
        width: 50px;
        text-transform: none !important;
        font-family: 'Inter', sans-serif !important;
        font-size: 14px !important;
      }
    `,

    sectionsTitle: css`
      font-family: 'ABeeZee', serif !important;
      font-size: 18px;
      line-height: 36px;
      font-weight: 600;
    `,

    sectionsDescription: css`
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      line-height: 24px;
    `,
  };
};

export default InfoCardStyle;
