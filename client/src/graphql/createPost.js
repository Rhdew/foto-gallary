import gql from 'graphql-tag';

export default gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(post: $post) {
      caption
    }
  }
`;
