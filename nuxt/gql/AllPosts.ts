import gql from "graphql-tag";

export const GET_ALL_POSTS = gql`
  query ($locale: I18NLocaleCode!) {
    posts(locale: $locale, sort: "rank:asc") {
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
