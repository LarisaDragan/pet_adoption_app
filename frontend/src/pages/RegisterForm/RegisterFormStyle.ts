import { css } from '@emotion/css';

const RegisterFormStyle = () => {
  return {
    registerContainer: css`
      height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    `,

    registerForm: css`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      gap: 32px;
      margin-bottom: 120px;
    `,

    header: css`
      color: #fab005;
      font-size: 32px !important;
      font-family: 'ABeeZee', serif !important;
      font-weight: 600 !important;
    `,

    form: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 32px;
    `,

    usernameField: css`
      > div > div,
      p {
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
      > div > div {
        :after {
          border-bottom: 2px solid #fab005 !important;
        }
      }
    `,

    // autofillInput: css`
    //   :-internal-autofill-selected {
    //     background-color: #fff !important;
    //   }
    // `,

    emailField: css`
      > div > div,
      p {
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
      > div > div {
        :after {
          border-bottom: 2px solid #fab005 !important;
        }
      }
    `,

    passwordField: css`
      display: flex;
      flex-direction: column;
      max-width: 255px;
      > div > div,
      p {
        font-family: 'Inter', sans-serif !important;
        font-size: 16px !important;
      }
      > div > div {
        :after {
          border-bottom: 2px solid #fab005 !important;
        }
    `,

    seePass: css`
      > svg {
        font-size: 15px;
      }
    `,

    signUpButton: css`
      margin-top: 20px;
      > button {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border-color: 1px solid black;
        background: #fab005;
        color: white;
        font-family: 'Inter', sans-serif !important;
        font-weight: 450 !important;
        text-transform: capitalize;
        font-size: 1.25rem;

        :hover {
          background-color: #fab005;
          color: white;
        }
      }
    `,
    formIconsStyle: css`
      fontsize: small;
      // color: green;
      // color: #5cc3eb;
      color: black;
    `,

    alternativeSignUP: css`
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 270px;
      > div {
        > button {
          width: 100%;
          border-radius: 20px;
          border-color: 1px solid black;
          color: black;
          gap: 16px;
          text-transform: unset;
          background-color: #629c44;
        }
      }
    `,

    signUpFacebook: css`
      padding-left: 17px;
    `,

    registerImage: css`
      height: 100%;
      flex: 1;
      @media (max-width: 850px) {
        display: none;
      }
    `,
  };
};

export default RegisterFormStyle;
