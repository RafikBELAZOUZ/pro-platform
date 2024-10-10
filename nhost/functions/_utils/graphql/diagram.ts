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

//   import { Request, Response } from 'express';
//   import { GraphQLClient, gql } from 'graphql-request';
  
//   // GraphQL queries and mutations
//   const GET_PROJECTS = gql`
//     query GetProjects {
//       projects {
//         id
//         description
//       }
//     }
//   `;
  
//   const CREATE_PROJECT = gql`
//     mutation CreateProject($input: ProjectInput!) {
//       createProject(input: $input) {
//         id
//         description
//       }
//     }
//   `;
  
//   const UPDATE_PROJECT = gql`
//     mutation UpdateProject($id: ID!, $input: ProjectInput!) {
//       updateProject(id: $id, input: $input) {
//         id
//         description
//       }
//     }
//   `;
  
//   const DELETE_PROJECT = gql`
//     mutation DeleteProject($id: ID!) {
//       deleteProject(id: $id) {
//         id
//       }
//     }
//   `;
  
//   // Function to handle different operations
//   const handleProjects = async (req: Request, res: Response) => {
//     const { method, body, params } = req;
//     let response;
  
//     try {
//       switch (method) {
//         case 'GET':
//           response = await GraphQLClient.request(GET_PROJECTS);
//           res.status(200).json(response.projects);
//           break;
//         case 'POST':
//           response = await GraphQLClient.request(CREATE_PROJECT, { input: body });
//           res.status(201).json(response.createProject);
//           break;
//         case 'PUT':
//           const { id } = params;
//           response = await GraphQLClient.request(UPDATE_PROJECT, { id, input: body });
//           res.status(200).json(response.updateProject);
//           break;
//         case 'DELETE':
//           const { id: deleteId } = params;
//           response = await GraphQLClient.request(DELETE_PROJECT, { id: deleteId });
//           res.status(204).send();
//           break;
//         default:
//           res.status(405).send('Method Not Allowed');
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   export default handleProjects;
  