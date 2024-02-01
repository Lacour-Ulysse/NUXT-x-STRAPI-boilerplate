import gql from "graphql-tag";

export const GET_META_AND_TRANSLATIONS = gql`
  query ($locale: I18NLocaleCode!) {
    websiteInformation(locale: $locale) {
      data {
        id
        attributes {
          SEO {
            id
            title
            description
            image {
              data {
                id
                attributes {
                  alternativeText
                  formats
                }
              }
              __typename
            }
          }
          Translations {
            test
          }
        }
      }
    }
    __typename
  }
`;
