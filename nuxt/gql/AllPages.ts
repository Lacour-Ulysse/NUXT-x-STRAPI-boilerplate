import gql from "graphql-tag";

export const GET_ALL_PAGES = gql`
  query ($locale: I18NLocaleCode!, $publicationState: PublicationState) {
    pages(
      locale: $locale
      sort: "rank:asc"
      publicationState: $publicationState
    ) {
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
