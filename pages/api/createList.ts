import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: any) => {
    const { name, boardID } = req.body;

    let list;

    try {
      list = await prisma.list.create({
        data: {
          name: name,
          boardId: boardID,
        },
      });
    } catch (e: any) {
      res.status(401).json({ error: e.message });
      return;
    }
    return res.json(list);
  }
);
