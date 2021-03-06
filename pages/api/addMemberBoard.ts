import { Session } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
    const { boardId, userId } = req.body;

    let board;
    let member;

    try {
      board = await prisma.board.findUnique({
        where: {
          id: boardId,
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
        },
      });

      if (board?.members.find((member) => member.user.id === userId)) {
        throw new Error("Member Already Exists.");
      }

      member = await prisma.memberBoard.create({
        data: {
          userId: userId,
          boardId: boardId,
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
