import { css } from '@emotion/css';

const NavBarStyle = () => {
  const navBarStyle = css`
    > div {
      > div {
        > a {
          color: white;
          font-family: 'ABeeZee', serif !important;
          font-weight: 600;

          :hover {
            background-color: rgb(250, 176, 5, 0.5) !important;
            border-radius: 62% 38% 82% 18% / 54% 61% 39% 46% !important;
            transition: all 0.6s ease-in-out !important;
          }
        }
      }
    }
  `;
  return {
    toolbar: css`
      display: flex;
      justify-content: space-between;
      flex: 1;
      @media (max-width: 850px) {
        border: 1px solid blue;
      }
    `,

    appBar: css`
      background: transparent !important;
      ${navBarStyle}
    `,

    loginRegisterNavBar: css`
      ${navBarStyle}
      background: transparent !important;
      box-shadow: none !important;
    `,

    petProfileNavBar: css`
      background: #162f51 !important;
      ${navBarStyle}
    `,

    scrolledNavBar: css`
      background: #162f51 !important;
      ${navBarStyle}
    `,

    activeButton: css`
      background-color: rgb(250, 176, 5, 0.8) !important;
      border-radius: 62% 38% 82% 18% / 54% 61% 39% 46% !important;
      transition: all 0.6s ease-in-out !important;
      width: fit-content;
    `,

    userProfile: css`
      display: flex;
      justify-content: center;
      align-items: center;
      > a {
        color: white;
        font-family: 'ABeeZee', serif !important;
        font-weight: 600;

        :hover {
          background-color: rgb(250, 176, 5, 0.5) !important;
          border-radius: 62% 38% 82% 18% / 54% 61% 39% 46% !important;
          transition: all 0.6s ease-in-out !important;
        }
      }
    `,

    avatar: css`
      height: 30px;
      width: 30px;
    `,

    toolbarMobile: css`
      padding: 0px 25px 0px;
      display: flex;
      justify-content: space-between;
      > button > svg {
        color: #fab005;
      }
    `,

    logoMobileVersion: css`
      height: 70px;
    `,

    navListItems: css`
      margin-top: 15px;
    `,

    navAccessList: css`
      display: flex;
      justifycontent: center;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      margin-bottom: 20px;
      width: max-content;
    `,

    mobileOptionsHeader: css`
      color: white;
      font-size: 18px;
      font-family: 'ABeeZee', serif !important;

      > div :hover {
        background-color: rgb(250, 176, 5, 0.5) !important;
        border-radius: 62% 38% 82% 18% / 54% 61% 39% 46% !important;
        transition: all 0.6s ease-in-out !important;
      }

      > button {
        color: white;
      }

      > div > a {
        width: fit-content;
      }
    `,
  };
};

export default NavBarStyle;
