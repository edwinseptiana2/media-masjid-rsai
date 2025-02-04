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
  if (!category || category === "ALL")
    return prisma.post.findMany({ where: { published: true } });
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
    where: { slug, published: true },
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
      published: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function getCategories() {
  return prisma.categoriesOnPosts.findMany({
    distinct: ["categoryName"],
    select: {
      categoryName: true,
    },
    where: {
      post: {
        published: true,
      },
    },
    orderBy: {
      categoryName: "asc",
    },
  });
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function deletePost(slug: string) {
  const post = await getPost(slug);
  if (!post) return null;
  await prisma.categoriesOnPosts.deleteMany({
    where: {
      postId: post.id,
    },
  });

  await prisma.post.deleteMany({
    where: {
      id: post.id,
    },
  });

  return {
    status: 201,
    message: "Post deleted successfully.",
  };
}
