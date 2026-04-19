'use client';

import { useState, useEffect } from 'react';
import { AnimeList } from '@/components/anime/AnimeList';
import { AnimeForm } from '@/components/anime/AnimeForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Anime, CreateAnimeInput } from '@/types';
import { Plus, Search } from 'lucide-react';

export default function Dashboard() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);

  // Mock data for demo
  useEffect(() => {
    // TODO: Fetch from API endpoint
    const mockData: Anime[] = [
      {
        id: '1',
        userId: 'user1',
        title: 'Attack on Titan',
        coverUrl: null,
        isFavorite: true,
        notes: 'Amazing series!',
        currentSeason: 2,
        currentEpisode: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: 'user1',
        title: 'One Piece',
        coverUrl: null,
        isFavorite: true,
        notes: null,
        currentSeason: null,
        currentEpisode: 1050,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setAnimes(mockData);
  }, []);

  const handleCreateAnime = async (data: CreateAnimeInput) => {
    setLoading(true);
    try {
      // TODO: Call API endpoint
      const newAnime: Anime = {
        id: Math.random().toString(),
        userId: 'user1',
        ...data,
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setAnimes([newAnime, ...animes]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (anime: Anime) => {
    setEditingAnime(anime);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    // TODO: Call API endpoint
    setAnimes(animes.filter((a) => a.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    // TODO: Call API endpoint
    setAnimes(
      animes.map((a) =>
        a.id === id ? { ...a, isFavorite: !a.isFavorite } : a
      )
    );
  };

  const handleQuickUpdate = (id: string) => {
    // TODO: Call API endpoint
    setAnimes(
      animes.map((a) =>
        a.id === id
          ? { ...a, currentEpisode: a.currentEpisode + 1, updatedAt: new Date() }
          : a
      )
    );
  };

  const filteredAnimes = animes.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            AniTrack
          </h1>
          <p className="text-neutral-400">Track your anime progress beautifully</p>
        </div>

        {/* Form Section */}
        {showForm && (
          <Card className="mb-8 p-6 border-blue-500/50">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingAnime ? 'Edit Anime' : 'Add New Anime'}
            </h2>
            <AnimeForm
              defaultValues={editingAnime || undefined}
              onSubmit={handleCreateAnime}
              loading={loading}
              onCancel={() => {
                setShowForm(false);
                setEditingAnime(null);
              }}
            />
          </Card>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!showForm && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowForm(true)}
              className="md:w-auto"
            >
              <Plus size={20} className="mr-2" />
              Add Anime
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <p className="text-3xl font-bold text-blue-400">
              {animes.length}
            </p>
            <p className="text-neutral-400 text-sm mt-1">Total Anime</p>
          </Card>

          <Card className="text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {animes.filter((a) => a.isFavorite).length}
            </p>
            <p className="text-neutral-400 text-sm mt-1">Favorites</p>
          </Card>

          <Card className="text-center">
            <p className="text-3xl font-bold text-green-400">
              {animes.reduce((sum, a) => sum + a.currentEpisode, 0)}
            </p>
            <p className="text-neutral-400 text-sm mt-1">Episodes Watched</p>
          </Card>

          <Card className="text-center">
            <p className="text-3xl font-bold text-purple-400">
              {Math.round((animes.filter((a) => a.isFavorite).length / Math.max(animes.length, 1)) * 100)}%
            </p>
            <p className="text-neutral-400 text-sm mt-1">Favorite Rate</p>
          </Card>
        </div>

        {/* Anime List */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-6">
            Your Anime
          </h2>
          <AnimeList
            animes={filteredAnimes}
            loading={loading}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
            onQuickUpdate={handleQuickUpdate}
          />
        </div>
      </div>
    </main>
  );
}
