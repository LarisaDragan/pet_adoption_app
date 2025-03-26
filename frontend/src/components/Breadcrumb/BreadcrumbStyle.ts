import { css } from '@emotion/css';

const BreadcrumbStyle = () => {
  return {
    breadcrumbs: css`
      width: 100%;
      display: flex;

      > div {
        :after {
          content: '>';
          margin-left: 10px;
          margin-right: 10px;
        }

        :nth-last-child(1) {
          :after {
            content: '';
          }
        }
        > a,
        span {
          font-size: 20px;
          color: black;
          text-decoration: none;
        }
      }
    `,

    breadcrumbsFirstDiv: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    currentBreadcrumb: css`
      color: #fab005 !important;
    `,
  };
};

export default BreadcrumbStyle;
