import gql from "graphql-tag";

export const GET_STRAPI_PAGE = gql`
  query ($locale: I18NLocaleCode!, $slug: String!) {
    pages(locale: $locale, filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          Components {
            ... on ComponentBlockTextAndMedia {
              id
              title
              media_side
              media {
                data {
                  attributes {
                    alternativeText
                    caption
                    mime
                    url
                  }
                }
              }
              text
            }
            ... on ComponentBlockGallery {
              id
              title
              medias {
                data {
                  attributes {
                    alternativeText
                    caption
                    mime
                    url
                  }
                }
              }
              description
            }
          }
          SEO {
            title
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
          }
        }
      }
    }
  }
`;

export const GET_TRANSLATION = gql`
  query ($locale: I18NLocaleCode!, $slug: String!, $translation: String!) {
    pages(locale: $locale, filters: { slug: { eq: $slug } }) {
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
