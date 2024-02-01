import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  query ($locale: I18NLocaleCode!) {
    postCategories(locale: $locale, sort: "rank:asc") {
      data {
        id
        attributes {
          rank
          name
          slug
        }
      }
    }
  }
`;
