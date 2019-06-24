import Link from 'next/link';
import Box from '@material-ui/core/Box';

const headerStyle = {
  position: "fixed",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100vw",
};

const linkStyle = {
  padding: 15,
};

const Header = () => (
  <Box className="header" textAlign="right" style={headerStyle}>
    <Box className="logo" >
      <img src="https://via.placeholder.com/60"></img>
    </Box>
    <Box className="links" >
      <Link href="#concept">
        <a  style={linkStyle}>CONCEPT</a>
      </Link>
      <Link href="#how">
        <a  style={linkStyle}>HOW TO</a>
      </Link>
      <Link href="/leaderboard">
        <a  style={linkStyle}>LEADERBOARD</a>
      </Link>
      <Link href="#download">
        <a  style={linkStyle}>TÉLÉCHARGER</a>
      </Link>
    </Box>
  </Box>
);

export default Header;