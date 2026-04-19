'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { formatProgress } from '@/lib/utils';

interface Anime {
  id: string;
  title: string;
  currentSeason: number | null;
  currentEpisode: number;
  isFavorite: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [episode, setEpisode] = useState('1');
  const [season, setSeason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAnimes();
  }, []);

  async function fetchAnimes() {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/anime');
      const data = await res.json();
      
      if (data.success) {
        setAnimes(data.data || []);
      } else {
        setError(data.error || 'Failed to load anime');
      }
    } catch (err) {
      setError('Network error: ' + String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter an anime title');
      return;
    }

    setSubmitting(true);
    setError('');

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

      const data = await res.json();
      
      if (data.success) {
        setAnimes([data.data, ...animes]);
        setTitle('');
        setEpisode('1');
        setSeason('');
        setError('');
      } else {
        setError(data.error || 'Failed to add anime');
      }
    } catch (err) {
      setError('Network error: ' + String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this anime?')) return;

    try {
      const res = await fetch(`/api/anime/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (data.success) {
        setAnimes(animes.filter(a => a.id !== id));
      } else {
        setError(data.error || 'Failed to delete');
      }
    } catch (err) {
      setError('Network error: ' + String(err));
    }
  }

  async function handleUpdateEpisode(id: string, newEpisode: number) {
    try {
      const res = await fetch(`/api/anime/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEpisode: newEpisode }),
      });

      const data = await res.json();
      
      if (data.success) {
        setAnimes(animes.map(a => (a.id === id ? data.data : a)));
      }
    } catch (err) {
      setError('Failed to update: ' + String(err));
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

      const data = await res.json();
      
      if (data.success) {
        setAnimes(animes.map(a => (a.id === id ? data.data : a)));
      }
    } catch (err) {
      setError('Failed to update: ' + String(err));
    }
  }

  const filtered = animes.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: animes.length,
    favorites: animes.filter(a => a.isFavorite).length,
    episodes: animes.reduce((sum, a) => sum + a.currentEpisode, 0),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-8 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-5xl font-bold text-white">AniTrack</h1>
              <p className="text-neutral-400 mt-2">Keep track of your anime watching journey</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-900/20 border-blue-800">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-sm text-neutral-400 mt-1">Total Anime</div>
            </CardContent>
          </Card>
          <Card className="bg-purple-900/20 border-purple-800">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-purple-400">{stats.favorites}</div>
              <div className="text-sm text-neutral-400 mt-1">Favorites</div>
            </CardContent>
          </Card>
          <Card className="bg-green-900/20 border-green-800">
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-green-400">{stats.episodes}</div>
              <div className="text-sm text-neutral-400 mt-1">Episodes Watched</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Form */}
        <Card className="mb-8 bg-neutral-900 border-neutral-800">
          <CardContent className="pt-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <Input
                label="Anime Title"
                placeholder="e.g. Attack on Titan, One Piece..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Season (optional)"
                  type="number"
                  placeholder="1"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  disabled={submitting}
                />
                <Input
                  label="Current Episode"
                  type="number"
                  placeholder="1"
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <Button 
                variant="primary" 
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Adding...' : 'Add Anime'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="🔍 Search your anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Anime List */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">Your Anime List</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">⟳</div>
              <p className="text-neutral-400 mt-2">Loading anime...</p>
            </div>
          ) : filtered.length === 0 ? (
            <Card className="bg-neutral-900 border-neutral-800 text-center py-12">
              <p className="text-neutral-400 text-lg">
                {animes.length === 0 
                  ? '✨ No anime yet. Add your first one above!' 
                  : '🔍 No results found'}
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((anime) => (
                <Card 
                  key={anime.id} 
                  className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 hover:shadow-lg transition-all"
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg">{anime.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">
                          {formatProgress(anime.currentSeason, anime.currentEpisode)}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleToggleFavorite(anime.id)}
                          title={anime.isFavorite ? 'Unfavorite' : 'Favorite'}
                        >
                          {anime.isFavorite ? '★' : '☆'}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleUpdateEpisode(anime.id, anime.currentEpisode + 1)}
                          title="Increment episode"
                        >
                          +1
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(anime.id)}
                          title="Delete"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
