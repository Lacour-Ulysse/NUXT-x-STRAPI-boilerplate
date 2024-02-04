import gql from "graphql-tag";

export const GET_POSTS_BY_CATEGORY = gql`
  query (
    $category: String!
    $locale: I18NLocaleCode!
    $publicationState: PublicationState
  ) {
    posts(
      filters: { categories: { slug: { eqi: $category } } }
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
          categories {
            data {
              attributes {
                rank
                name
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;
