import gql from "graphql-tag";

export const GET_ALL_POSTS = gql`
  query ($locale: I18NLocaleCode!, $publicationState: PublicationState) {
    posts(
      locale: $locale
      sort: "rank:asc"
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          rank
          title
          slug
          updatedAt
        }
      }
    }
  }
`;
