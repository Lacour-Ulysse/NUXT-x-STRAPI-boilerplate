import gql from "graphql-tag";

export const GET_POSTS_BY_CATEGORY = gql`
  query ($category: String!, $locale: I18NLocaleCode!) {
    posts(
      filters: { categories: { slug: { eqi: $category } } }
      locale: $locale
      sort: "rank:asc"
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

export const GET_TRANSLATION = gql`
  query ($category: String!, $locale: I18NLocaleCode!, $translation: String!) {
    postCategories(
      filters: { slug: { eqi: $category } }
      locale: $locale
      sort: "rank:asc"
    ) {
      data {
        id
        attributes {
          slug
          localizations(filters: { locale: { eq: $translation } }) {
            data {
              attributes {
                slug
              }
            }
          }
        }
      }
    }
  }
`;
