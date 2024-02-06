import gql from "graphql-tag";

export const GET_STRAPI_PAGE = gql`
  query (
    $locale: I18NLocaleCode!
    $slug: String!
    $publicationState: PublicationState
  ) {
    pages(
      locale: $locale
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
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
