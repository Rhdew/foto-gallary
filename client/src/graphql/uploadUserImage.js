import gql from 'graphql-tag';

export default gql`
  mutation uploadUserImage($image: Upload!) {
    uploadUserImage(image: $image) {
      username
    }
  }
`;
