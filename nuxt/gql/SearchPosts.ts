import gql from "graphql-tag";

export const SEARCH_POST_BY_TITLE = gql`
  query (
    $title: String!
    $page: Int!
    $pageSize: Int!
    $locale: I18NLocaleCode!
  ) {
    posts(
      filters: { title: { containsi: $title } }
      pagination: { page: $page, pageSize: $pageSize }
      locale: $locale
      sort: "rank:asc"
    ) {
      data {
        id
        attributes {
          rank
          title
          slug
          updatedAt
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;
