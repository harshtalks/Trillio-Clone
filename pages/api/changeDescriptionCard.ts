import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { cardId, description } = req.body;

    let card;

    try {
      card = await prisma.card.update({
        where: {
          id: cardId,
        },
        data: {
          description: description,
        },
      });
    } catch (e: any) {
      res.status(404).json({ error: e.message });
      return;
    }

    return res.json(card);
  }
);
