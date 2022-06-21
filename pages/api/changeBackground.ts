import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { cardId, image } = req.body;

    let card;

    try {
      card = await prisma.card.update({
        where: {
          id: cardId,
        },
        data: {
          image: image,
        },
      });
    } catch (E: any) {
      res.status(404).json({ error: E.message });
      return;
    }

    return res.json(card);
  }
);
