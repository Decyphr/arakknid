import type { User, Project } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Project } from "@prisma/client";

export function getProject({
  id,
  userId,
}: Pick<Project, "id"> & {
  userId: User["id"];
}) {
  return prisma.project.findFirst({
    select: { id: true, title: true, description: true },
    where: { id, userId },
  });
}

export function getProjectListItems({ userId }: { userId: User["id"] }) {
  return prisma.project.findMany({
    where: { userId },
    select: { id: true, title: true },
  });
}

export function createProject({
  title,
  description,
  userId,
}: Pick<Project, "title" | "description"> & {
  userId: User["id"];
}) {
  return prisma.project.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteProject({
  id,
  userId,
}: Pick<Project, "id"> & { userId: User["id"] }) {
  return prisma.project.deleteMany({
    where: { id, userId },
  });
}
