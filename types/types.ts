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

import {
  Board,
  Card,
  Comment,
  Label,
  List,
  MemberBoard,
  MemberCard,
  User,
} from "@prisma/client";

type memberBoardType = Array<MemberBoard & { user: User }>;
type memberCardType = Array<MemberCard & { user: User }>;

export type BoardProps = Board & {
  lists: Array<
    List & {
      card: Array<Card & { labels: Array<Label>; members: memberCardType }>;
    }
  >;
  user: User;
  members: memberBoardType;
};

export type CardProps = Card & {
  labels: Array<Label>;
  members: memberCardType;
  comments: Array<Comment & { user: User }>;
};

export type listProps = List & {
  card: Array<Card & { labels: Array<Label>; members: memberCardType }>;
};
