import styled from 'styled-components';

const NotFound = () => {
  return (
    <>
      <Wrapper>
        <div>
          <h1>Page is not found!</h1>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: block;
`;

export default NotFound;
