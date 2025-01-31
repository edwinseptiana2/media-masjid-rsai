import { prisma } from "~/utils/db.server";

export async function getPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getPostsByCategory(category: string) {
  if (!category) return prisma.post.findMany();
  return prisma.post.findMany({
    where: {
      published: true,
      categories: {
        some: {
          category: {
            name: category.toUpperCase(),
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { categories: true },
  });
}

export async function getAnotherPost(category: string) {
  return prisma.post.findMany({
    take: 3,
    where: {
      categories: {
        some: {
          category: {
            name: category,
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany();
}

export async function getUsers() {
  return prisma.user.findMany();
}
