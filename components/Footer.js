import Box from '@material-ui/core/Box';
import { withTheme } from '@material-ui/styles';

const footerStyle = {
  color: "white",
  backgroundColor: "#FA1BE9",
  padding: 20,
};

const Footer = () => (
  <Box className="header" style={footerStyle}>
    <Box className="baseline" textAlign="center" >
      <h4>un projet LPDW 2019</h4>
    </Box>
  </Box>
);

export default Footer;