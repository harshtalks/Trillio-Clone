import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { name, description, image, listId } = req.body;

    let card;

    try {
      card = await prisma.card.create({
        data: {
          name: name,
          description: description,
          image: image,
          listId: listId,
        },
      });
    } catch (e: any) {
      res.status(401).json({ error: e.message });
      return;
    }

    return res.json(card);
  }
);
