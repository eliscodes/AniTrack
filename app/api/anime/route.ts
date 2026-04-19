import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateTitle, validateEpisode } from "@/lib/utils";

const userId = "temp-user-id";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";

    const where = {
      userId,
      ...(query && {
        OR: [{ title: { contains: query, mode: "insensitive" as const } }],
      }),
    };

    const animes = await prisma.anime.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: animes });
  } catch (error) {
    console.error("[GET /api/anime]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch anime" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, currentSeason, currentEpisode, notes, coverUrl } = body;

    if (!validateTitle(title)) {
      return NextResponse.json(
        { success: false, error: "Invalid title" },
        { status: 400 }
      );
    }

    if (!validateEpisode(currentEpisode)) {
      return NextResponse.json(
        { success: false, error: "Invalid episode number" },
        { status: 400 }
      );
    }

    const anime = await prisma.anime.create({
      data: {
        userId,
        title: title.trim(),
        currentSeason: currentSeason || null,
        currentEpisode,
        notes: notes?.trim() || null,
        coverUrl: coverUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: anime }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/anime]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create anime" },
      { status: 500 }
    );
  }
}
