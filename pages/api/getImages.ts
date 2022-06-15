import { NextApiRequest, NextApiResponse } from "next";
import { createApi } from "unsplash-js";
import { validateRouter } from "../../protection/protectedRoute";

export default validateRouter(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.body;
    const api = createApi({
      accessKey: process.env.NEXT_PUBLIC_FB_UNSPLASH_CLIENT_ID as string,
    });

    api.search
      .getPhotos({ query: query, page: 1, perPage: 48 })
      .then((result) => {
        switch (result.type) {
          case "error":
            console.log("error occurred: ", result.errors[0]);
            res.json({ error: result.errors[0] });
          case "success":
            const photo = result.response;
            res.json(photo);
        }
      });
  }
);
