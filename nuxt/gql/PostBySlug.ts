import gql from "graphql-tag";

export const GET_POST_BY_SLUG = gql`
  query (
    $locale: I18NLocaleCode!
    $slug: String!
    $publicationState: PublicationState
  ) {
    posts(
      locale: $locale
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          title
          slug
          description
          image {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;
