import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Grid, GridItem } from "@strapi/design-system";
import { ContentBox, useTracking } from "@strapi/helper-plugin";
import { Feather, PriceTag, Dashboard, InformationSquare } from "@strapi/icons";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";
import styled from "styled-components";

const BlockLink = styled.a`
  text-decoration: none;
`;

const StyledFeather = styled(Feather)`
  path {
    fill: #7289da !important;
    stroke: #7289da !important;
  }
`;

const StyledPriceTag = styled(PriceTag)`
  path {
    fill: #7289da !important;
    stroke: #7289da !important;
  }
`;

const StyledDashboard = styled(Dashboard)`
  path {
    fill: #7289da !important;
    stroke: #7289da !important;
  }
`;

const StyledInformationSquare = styled(InformationSquare)`
  path:first-child {
    fill: #7289da !important;
    stroke: #7289da !important;
  }

  path:last-child {
    fill: #ffffff !important;
    stroke: #ffffff !important;
  }
`;

const ContentBlocks = () => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();

  const { push } = useHistory();
  const navigate = (e, url) => {
    e.preventDefault();
    push(url);
  };

  return (
    <Flex direction="column" alignItems="stretch" gap={5}>
      <Grid gap={5}>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/collectionType/api::post.post?page=1&pageSize=100"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: getTrad("plugin.dashbored.posts.title"),
                defaultMessage: "Posts",
              })}
              subtitle={formatMessage({
                id: getTrad("plugin.dashbored.posts.subtitle"),
                defaultMessage: "Add or edit Posts",
              })}
              icon={<StyledFeather />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/collectionType/api::post-category.post-category?page=1&pageSize=100"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: getTrad("plugin.dashbored.post-categories.title"),
                defaultMessage: "Post Categories",
              })}
              subtitle={formatMessage({
                id: getTrad("plugin.dashbored.post-categories.subtitle"),
                defaultMessage: "Add or edit categories",
              })}
              icon={<StyledPriceTag />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/collectionType/api::page.page?page=1&pageSize=100"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: getTrad("plugin.dashbored.pages.title"),
                defaultMessage: "Pages",
              })}
              subtitle={formatMessage({
                id: getTrad("plugin.dashbored.pages.subtitle"),
                defaultMessage: "Add or edit pages",
              })}
              icon={<StyledDashboard />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
        <GridItem col={3}>
          <BlockLink
            href="#"
            onClick={(e) => {
              navigate(
                e,
                "/content-manager/singleType/api::website-information.website-information"
              );
            }}
          >
            <ContentBox
              title={formatMessage({
                id: getTrad("plugin.dashbored.homepage.title"),
                defaultMessage: "Website infos",
              })}
              subtitle={formatMessage({
                id: getTrad("plugin.dashbored.homepage.subtitle"),
                defaultMessage: "Edit website infos",
              })}
              icon={<StyledInformationSquare />}
              iconBackground="primary100"
            />
          </BlockLink>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ContentBlocks;
