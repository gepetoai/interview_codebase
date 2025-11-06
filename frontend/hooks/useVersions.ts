import { useState, useEffect } from 'react';
import { api, PromptVersion } from '@/lib/api';

export function useVersions(promptId: string | null) {
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [loading, setLoading] = useState(false);

  const loadVersions = async (id: string) => {
    try {
      setLoading(true);
      const data = await api.getVersions(id);
      setVersions(data);
      return data;
    } catch (error) {
      console.error('Error loading versions:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promptId) {
      loadVersions(promptId);
    } else {
      setVersions([]);
    }
  }, [promptId]);

  return {
    versions,
    loading,
    reload: promptId ? () => loadVersions(promptId) : async () => [],
  };
}

