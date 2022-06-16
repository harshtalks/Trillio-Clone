import { Session } from "inspector";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    let members;

    try {
      members = await prisma.user.findMany({});
    } catch (e: any) {
      res.status(401).json({ err: e.message });
    }
    return res.json(members);
  }
);
