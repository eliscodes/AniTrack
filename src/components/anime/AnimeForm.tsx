'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Anime, CreateAnimeInput } from '@/types';

interface AnimeFormProps {
  defaultValues?: Anime;
  onSubmit: (data: CreateAnimeInput) => void | Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}

export function AnimeForm({
  defaultValues,
  onSubmit,
  loading = false,
  onCancel,
}: AnimeFormProps) {
  const [formData, setFormData] = useState<CreateAnimeInput>({
    title: defaultValues?.title || '',
    currentSeason: defaultValues?.currentSeason || undefined,
    currentEpisode: defaultValues?.currentEpisode || 1,
    notes: defaultValues?.notes || '',
    coverUrl: defaultValues?.coverUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.currentEpisode || formData.currentEpisode < 1)
      newErrors.currentEpisode = 'Episode must be at least 1';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Anime Title"
        placeholder="e.g., Attack on Titan"
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        error={errors.title}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Season (Optional)"
          type="number"
          min="1"
          placeholder="1"
          value={formData.currentSeason || ''}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              currentSeason: e.target.value ? parseInt(e.target.value) : undefined,
            }))
          }
        />

        <Input
          label="Episode"
          type="number"
          min="1"
          placeholder="1"
          value={formData.currentEpisode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              currentEpisode: parseInt(e.target.value) || 1,
            }))
          }
          error={errors.currentEpisode}
        />
      </div>

      <Input
        label="Notes (Optional)"
        placeholder="e.g., Awesome series!"
        value={formData.notes || ''}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, notes: e.target.value }))
        }
      />

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          loading={loading}
        >
          {defaultValues ? 'Update' : 'Create'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
