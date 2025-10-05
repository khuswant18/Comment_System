import prisma from "../lib/prisma.js";

export const createComment = async (req, res) => {
  try {
    const { text, parentId, uid, author, email, photoURL } = req.body;

    if (!text || !uid || !author) {
      return res
        .status(400)
        .json({ error: "Text, uid, and author are required" });
    }

    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }, 
      });
      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment does not exist" });
      }
    } 

    await prisma.user.upsert({
      where: { id: uid },
      update: {
        name: author,
        email: email || undefined,
      },
      create: {
        id: uid,
        name: author,
        email: email || null,
      },
    });    const newComment = await prisma.comment.create({
      data: {
        text,
        authorId: uid,
        parentId: parentId || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        children: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
}; 

export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { timestamp: "desc" },
    });

    const commentMap = new Map();

    comments.forEach((comment) => {
      comment.children = [];
      commentMap.set(comment.id, comment);
    });

    const rootComments = [];

    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.children.push(comment); 
        } else {
          rootComments.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    const sortChildren = (comments) => {
      comments.forEach((comment) => {
        if (comment.children && comment.children.length > 0) {
          comment.children.sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          sortChildren(comment.children);
        }
      });
    };

    sortChildren(rootComments);

    res.json(rootComments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        children: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            children: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.body;

    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
 
    if (comment.authorId !== uid) {
      return res
        .status(403)
        .json({ error: "You can only delete your own comments" });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params; 
    const { uid } = req.body; 

    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_commentId: { 
          userId: uid,
          commentId: id,
        }, 
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_commentId: {
            userId: uid,
            commentId: id,
          },
        },
      }); 

      await prisma.comment.update({
        where: { id },
        data: {
          likes: {
            decrement: 1,
          }, 
        },
      });

      res.json({ message: "Comment unliked", liked: false });
    } else {
      await prisma.like.create({
        data: {
          userId: uid,
          commentId: id,
        },
      }); 

      await prisma.comment.update({
        where: { id },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      res.json({ message: "Comment liked", liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};
