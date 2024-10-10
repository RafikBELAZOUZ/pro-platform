import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { removeTeamMember } from '../_utils/graphql/team-subscriptions';
import { updateSeatQuantity } from '../_utils/stripe';
import { getIncludedSeats, getSeatPricing } from '../_utils/graphql/team-subscriptions';
import {getUsersProjects} from '../_utils/graphql/diagram'

const getUsersProject = async (req: Request, res: Response) => {
    const userIds = res.locals.userId;
    const { userId } = req.body;
    console.log("userid", userId)
    console.log("userid",userIds)

    const response = await getUsersProjects(userId)
    console.log("response = " + response)
    res.status(200).send(`Hello ${response}!`)
}

export default authPost(getUsersProject);

// async function removeTeamMemberHandler(req: Request, res: Response) {
//   const { email } = req.body;
//   const userId = res.locals.userId;

//   if (!userId || !email) {
//     return res.status(405).send({ message: 'Bad request.' });
//   }

//   const removedCount = await removeTeamMember({ createdById: userId, email });

//   await updateSeatQuantity(userId);

//   return res.status(200).send({ message: `removed ${removedCount} team member` });
// }

// export const removeTeamMemberHandlerwithAuth = authPost(removeTeamMemberHandler);


// async function getTeamStatus(req: Request, res: Response) {
//   const userId = res.locals.userId;
//   const includedSeats = await getIncludedSeats(userId);

//   try {
//     const pricing = await getSeatPricing(userId);
//     return res.status(200).send({ includedSeats, ...pricing });
//   } catch (err) {
//     console.log(err);
//     return res.status(200).send({ includedSeats });
//   }
// }

// export const getTeamStatusWithAUth = authPost(getTeamStatus);
