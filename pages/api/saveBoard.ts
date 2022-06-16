import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { name, image, description, publiclyVisible, userId } = req.body;

    let board;
    try {
      board = await prisma.board.create({
        data: {
          name: name,
          description: description,
          image: image,
          publiclyVisible: publiclyVisible,
          userId: userId,
        },
      });
    } catch (error: any) {
      res.status(401);
      res.json({
        error: error ? error.message : "Error in Creating the Board",
      });
      return;
    }

    return res.json(board);
  }
);
