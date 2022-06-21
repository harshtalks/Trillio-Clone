import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { boardId, description } = req.body;

    let board;

    try {
      board = await prisma.board.update({
        where: {
          id: boardId,
        },
        data: {
          description: description,
        },
      });
    } catch (e: any) {
      res.status(404).json({ error: e.message });
      return;
    }

    return res.json(board);
  }
);
