import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: any) => {
    const { cardId } = req.body;
    let card;

    try {
      card = await prisma.card.findUnique({
        where: {
          id: cardId,
        },
        include: {
          labels: true,
          members: {
            include: {
              user: true,
            },
          },
          comments: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (e: any) {
      res.status(401);
      res.json({ error: e.message });
      return;
    }

    return res.json(card);
  }
);
