import type { Ticket, Project } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Project } from "@prisma/client";

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

export function updateTicket({
  id,
  summary,
}: Pick<Ticket, "id" | "summary"> & { userId: Project["id"] }) {
  const data: any = {};
  if (summary) data.description = summary;

  // TODO: ensure that only a user that owns a project can delete it
  return prisma.ticket.update({
    where: { id },
    data,
  });
}

export function deleteProject({
  id,
  projectId,
}: Pick<Ticket, "id"> & { projectId: Project["id"] }) {
  return prisma.ticket.deleteMany({
    where: { id, projectId },
  });
}
