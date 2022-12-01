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
    select: { id: true, title: true, description: true, tickets: true },
    where: { id, userId },
  });
}

export function getProjectListItems({ userId }: { userId: User["id"] }) {
  return prisma.project.findMany({
    where: { userId },
    select: { id: true, title: true, description: true },
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

export function updateProject({
  id,
  title,
  description,
}: Pick<Project, "id" | "title" | "description"> & { userId: User["id"] }) {
  const data: any = {};
  if (title) data.title = title;
  if (description) data.description = description;

  // TODO: ensure that only a user that owns a project can delete it
  return prisma.project.update({
    where: { id },
    data,
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
