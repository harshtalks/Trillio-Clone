import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";
export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    let comment;

    const { commentId } = req.body;

    try {
      comment = await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    } catch (E: any) {
      res.status(401);
      res.json({ error: E.message });
      return;
    }

    return res.json(comment);
  }
);
