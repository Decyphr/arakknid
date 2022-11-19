import type { Ticket, Project } from "@prisma/client";
import { prisma } from "~/db.server";

export function createTicket({
  summary,
  projectId,
}: Pick<Ticket, "summary"> & {
  projectId: Project["id"];
}) {
  return prisma.ticket.create({
    data: {
      summary,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });
}
