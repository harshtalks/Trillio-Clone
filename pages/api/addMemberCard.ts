import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { cardId, userId } = req.body;

    let card;
    let member;

    try {
      card = await prisma.board.findUnique({
        where: {
          id: cardId,
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      if (card?.members.find((member) => member.user.id === userId)) {
        throw new Error("Member Already Exists.");
      }

      member = await prisma.memberCard.create({
        data: {
          userId: userId,
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

    return res.json(member);
  }
);
