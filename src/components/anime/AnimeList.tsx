'use client';

import { Anime } from '@/types';
import { AnimeCard } from './AnimeCard';
import { useCallback, useState } from 'react';

interface AnimeListProps {
  animes: Anime[];
  loading?: boolean;
  onUpdate: (anime: Anime) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onQuickUpdate?: (id: string) => void;
}

export function AnimeList({
  animes,
  loading = false,
  onUpdate,
  onDelete,
  onToggleFavorite,
  onQuickUpdate,
}: AnimeListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-neutral-900 rounded-xl border border-neutral-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (animes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-neutral-400 text-lg mb-2">No anime yet</p>
        <p className="text-neutral-500 text-sm">Create your first entry to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onEdit={onUpdate}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onQuickUpdate={onQuickUpdate}
        />
      ))}
    </div>
  );
}
