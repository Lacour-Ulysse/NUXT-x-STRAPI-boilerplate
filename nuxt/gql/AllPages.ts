import gql from "graphql-tag";

export const GET_ALL_PAGES = gql`
  query ($locale: I18NLocaleCode!) {
    pages(locale: $locale, sort: "rank:asc") {
      data {
        attributes {
          rank
          title
          slug
        }
      }
    }
  }
`;
