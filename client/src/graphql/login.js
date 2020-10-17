import gql from 'graphql-tag';

export default gql`
  query login($username: String, $password: String) {
    login(username: $username, password: $password)
  }
`;
