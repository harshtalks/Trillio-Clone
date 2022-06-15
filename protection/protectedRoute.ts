import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const validateRouter = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let session;
    try {
      session = await getSession({ req });

      if (!session) {
        throw new Error("Not a real user");
      }
    } catch (error) {
      res.status(401);
      res.json({ error: "you are not authorized" });
      return;
    }

    return handler(req, res);
  };
};
