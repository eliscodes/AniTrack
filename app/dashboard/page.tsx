'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { formatProgress } from '@/lib/utils';

interface Anime {
  id: string;
  title: string;
  currentSeason: number | null;
  currentEpisode: number;
  isFavorite: boolean;
  notes: string | null;
}

export default function Dashboard() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [episode, setEpisode] = useState('1');
  const [season, setSeason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch anime on mount
  useEffect(() => {
    fetchAnimes();
  }, []);

  async function fetchAnimes() {
    try {
      const res = await fetch('/api/anime');
      const data = await res.json();
      setAnimes(data.data || []);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          currentEpisode: parseInt(episode) || 1,
          currentSeason: season ? parseInt(season) : null,
        }),
      });

      if (res.ok) {
        const newAnime = await res.json();
        setAnimes([newAnime.data, ...animes]);
        setTitle('');
        setEpisode('1');
        setSeason('');
      }
    } catch (error) {
      console.error('Failed to add:', error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/anime/${id}`, { method: 'DELETE' });
      setAnimes(animes.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  }

  async function handleUpdateEpisode(id: string, newEpisode: number) {
    try {
      const res = await fetch(`/api/anime/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEpisode: newEpisode }),
      });

      if (res.ok) {
        const updated = await res.json();
        setAnimes(animes.map(a => (a.id === id ? updated.data : a)));
      }
    } catch (error) {
      console.error('Failed to update:', error);
    }
  }

  async function handleToggleFavorite(id: string) {
    const anime = animes.find(a => a.id === id);
    if (!anime) return;

    try {
      const res = await fetch(`/api/anime/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !anime.isFavorite }),
      });

      if (res.ok) {
        const updated = await res.json();
        setAnimes(animes.map(a => (a.id === id ? updated.data : a)));
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  }

  const filtered = animes.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AniTrack</h1>
          <p className="text-neutral-400">Track your anime progress</p>
        </div>

        {/* Add Form */}
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white">Add New Anime</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Anime Title"
                placeholder="Enter anime name..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Season (optional)"
                  type="number"
                  placeholder="1"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
                <Input
                  label="Current Episode"
                  type="number"
                  placeholder="1"
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value)}
                />
              </div>
              <Button variant="primary" onClick={handleAdd} className="w-full">
                Add Anime
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Anime List */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Your Anime</h2>
          {loading ? (
            <p className="text-neutral-400">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-neutral-400">No anime yet. Add one!</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((anime) => (
                <Card key={anime.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{anime.title}</h3>
                      <p className="text-sm text-neutral-400">
                        {formatProgress(anime.currentSeason, anime.currentEpisode)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleToggleFavorite(anime.id)}
                      >
                        {anime.isFavorite ? '★' : '☆'}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleUpdateEpisode(anime.id, anime.currentEpisode + 1)}
                      >
                        +1
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(anime.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
