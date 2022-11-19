import type { Issue, Project } from "@prisma/client";
import { prisma } from "~/db.server";

export function createIssue({
  summary,
  projectId,
}: Pick<Issue, "summary"> & {
  projectId: Project["id"];
}) {
  return prisma.issue.create({
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
