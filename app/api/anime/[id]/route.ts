import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateTitle, validateEpisode } from "@/lib/utils";

const userId = "temp-user-id";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anime = await prisma.anime.findFirst({ where: { id, userId } });

    if (!anime) {
      return NextResponse.json(
        { success: false, error: "Anime not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: anime });
  } catch (error) {
    console.error("[GET /api/anime/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch anime" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anime = await prisma.anime.findFirst({ where: { id, userId } });

    if (!anime) {
      return NextResponse.json(
        { success: false, error: "Anime not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, currentSeason, currentEpisode, notes, coverUrl, isFavorite } = body;

    if (title !== undefined && !validateTitle(title)) {
      return NextResponse.json(
        { success: false, error: "Invalid title" },
        { status: 400 }
      );
    }

    if (currentEpisode !== undefined && !validateEpisode(currentEpisode)) {
      return NextResponse.json(
        { success: false, error: "Invalid episode number" },
        { status: 400 }
      );
    }

    const updated = await prisma.anime.update({
      where: { id },
      data: {
        ...(title && { title: title.trim() }),
        ...(currentSeason !== undefined && { currentSeason }),
        ...(currentEpisode !== undefined && { currentEpisode }),
        ...(notes !== undefined && { notes: notes?.trim() || null }),
        ...(coverUrl !== undefined && { coverUrl }),
        ...(isFavorite !== undefined && { isFavorite }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[PATCH /api/anime/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to update anime" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anime = await prisma.anime.findFirst({ where: { id, userId } });

    if (!anime) {
      return NextResponse.json(
        { success: false, error: "Anime not found" },
        { status: 404 }
      );
    }

    await prisma.anime.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/anime/[id]]", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete anime" },
      { status: 500 }
    );
  }
}
