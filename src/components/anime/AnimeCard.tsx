'use client';

import { Anime } from '@/types';
import { Card, CardContent, CardHeader } from './Card';
import { Button } from './Button';
import { ProgressBar } from './ProgressBar';
import { formatProgress } from '@/lib/utils';
import { Star, Edit2, Trash2 } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
  onEdit: (anime: Anime) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onQuickUpdate?: (id: string) => void;
}

export function AnimeCard({
  anime,
  onEdit,
  onDelete,
  onToggleFavorite,
  onQuickUpdate,
}: AnimeCardProps) {
  return (
    <Card hoverable className="group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white truncate">
              {anime.title}
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              {formatProgress(anime.currentSeason, anime.currentEpisode)}
            </p>
          </div>
          <button
            onClick={() => onToggleFavorite(anime.id)}
            className="ml-2 transition-transform duration-200 hover:scale-110"
          >
            <Star
              size={20}
              className={anime.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-500'}
            />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {anime.notes && (
          <p className="text-sm text-neutral-400 italic">"{anime.notes}"</p>
        )}

        <ProgressBar value={anime.currentEpisode} max={anime.currentEpisode + 10} />

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(anime)}
            className="flex-1"
          >
            <Edit2 size={16} className="mr-1" />
            Edit
          </Button>

          {onQuickUpdate && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onQuickUpdate(anime.id)}
              className="flex-1"
            >
              +1 Episode
            </Button>
          )}

          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(anime.id)}
            className="px-3"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
