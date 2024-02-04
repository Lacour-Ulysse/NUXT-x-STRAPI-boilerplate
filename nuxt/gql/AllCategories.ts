import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  query ($locale: I18NLocaleCode!, $publicationState: PublicationState) {
    postCategories(
      locale: $locale
      sort: "rank:asc"
      publicationState: $publicationState
    ) {
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
