import { NhostClient } from '@nhost/nhost-js';
import { gql } from 'graphql-request';

import GraphQLClient from './client';

const GET_PROJECTS = gql`
query GetProjectByUserId($userId: uuid!) {
    projects(where: { user_id: { _eq: $userId } }) {
      id
      description
    }
  }
`;

export async function getUsersProjects(userId: string): Promise<string> {
    const response = await GraphQLClient.request(GET_PROJECTS, { userId });
    return response.projects;
  }