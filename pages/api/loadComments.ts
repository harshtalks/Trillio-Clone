import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    let comment;
    const { cardId } = req.body;

    try {
      comment = await prisma.comment.findMany({
        where: {
          cardId: cardId,
        },
        include: {
          user: true,
        },
      });
    } catch (e: any) {
      res.status(401);
      res.json({ error: e.message });
      return;
    }

    return res.json(comment);
  }
);
