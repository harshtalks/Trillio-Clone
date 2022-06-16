import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/prisma";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse, session: any) => {
    const userId = session.user.id;

    let boards;

    try {
      boards = await prisma.board.findMany({
        where: { userId: userId },
        include: {
          lists: {
            include: {
              card: {
                include: {
                  labels: true,
                  members: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          },
          members: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      });
    } catch (error: any) {
      res
        .status(405)
        .json({ error: error ? error.message : "Error in Creating the Board" });
      return;
    }

    return res.json(boards);
  }
);
