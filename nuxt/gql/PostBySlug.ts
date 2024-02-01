import gql from "graphql-tag";

export const GET_POST_BY_SLUG = gql`
  query ($locale: I18NLocaleCode!, $slug: String!) {
    posts(locale: $locale, filters: { slug: { eq: $slug } }) {
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

export const GET_TRANSLATION = gql`
  query ($locale: I18NLocaleCode!, $slug: String!, $translation: String!) {
    posts(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
          localizations(filters: { locale: { eq: $translation } }) {
            data {
              id
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
