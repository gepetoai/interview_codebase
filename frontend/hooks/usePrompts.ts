import { useState, useEffect } from 'react';
import { api, Prompt } from '@/lib/api';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPrompts = async () => {
    try {
      setLoading(true);
      const data = await api.getPrompts();
      setPrompts(data);
    } catch (error) {
      console.error('Error loading prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  return {
    prompts,
    loading,
    reload: loadPrompts,
  };
}

