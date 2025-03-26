import { Box } from '@mui/material';
import FooterStyle from './FooterStyle';

const Footer = () => {
  const style = FooterStyle();

  return (
    <div>
      <Box component="footer" className={style.footer}>
        <p>© 2023-2024 Copyright: All rights reserved</p>
      </Box>
    </div>
  );
};

export default Footer;
