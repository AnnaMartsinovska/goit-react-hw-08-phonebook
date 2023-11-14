import { StyledWrap } from './Phonebook/Phonebook.styled';

const { Outlet } = require('react-router-dom');
const { NavBar } = require('./NavBar');

const Layout = () => {
  return (
    <div>
      <div>
        <div>
          <NavBar />
        </div>
        <StyledWrap>
          <Outlet />
        </StyledWrap>
      </div>
    </div>
  );
};

export default Layout;
