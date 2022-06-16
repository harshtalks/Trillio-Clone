// model Board {
//   id          String   @id @default(cuid())
//   createdAt   DateTime @default(now())
//   editedAt    DateTime? @updatedAt
//   name        String
//   userId      String
//   publiclyVisible Boolean
//   image String?
//   description String?
//   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//   members Member[]
//   lists List[]
// }

import { Board, Card, Label, List, Member, User } from "@prisma/client";

type memberType = Array<Member & { user: User }>;

export type BoardProps = Board & {
  lists: Array<
    List & { cards: Array<Card & { labels: Array<Label>; members: Member }> }
  >;
  user: User;
  members: memberType;
};
