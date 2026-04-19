import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateTitle, validateEpisode } from "@/lib/utils";

/**
 * GET /api/anime - Get all anime for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add Clerk auth check
    const userId = "temp-user-id"; // Placeholder until Clerk is integrated

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const isFavorite = searchParams.get("favorite") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(query && {
        OR: [
          { title: { contains: query, mode: "insensitive" as const } },
        ],
      }),
      ...(isFavorite && { isFavorite: true }),
    };

    const [animes, total] = await Promise.all([
      prisma.anime.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: "desc" },
      }),
      prisma.anime.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: animes,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("[GET /api/anime]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch anime" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/anime - Create new anime entry
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add Clerk auth check
    const userId = "temp-user-id"; // Placeholder until Clerk is integrated

    const body = await request.json();
    const { title, currentSeason, currentEpisode, notes, coverUrl } = body;

    // Validation
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
