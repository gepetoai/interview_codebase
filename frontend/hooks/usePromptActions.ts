import { useState } from 'react';
import { api } from '@/lib/api';

export function usePromptActions() {
  const [loading, setLoading] = useState(false);

  const createPrompt = async (
    name: string,
    content: string,
    createdBy?: string
  ) => {
    setLoading(true);
    try {
      await api.createPrompt(name, content, createdBy || undefined);
      return true;
    } catch (error) {
      console.error('Error creating prompt:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePromptContent = async (
    id: string,
    content: string,
    createdBy?: string
  ) => {
    setLoading(true);
    try {
      await api.updatePromptContent(id, content, createdBy || undefined);
      return true;
    } catch (error) {
      console.error('Error updating prompt:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePrompt = async (id: string) => {
    setLoading(true);
    try {
      await api.deletePrompt(id);
      return true;
    } catch (error) {
      console.error('Error deleting prompt:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revertToVersion = async (
    promptId: string,
    version: number,
    createdBy?: string
  ) => {
    setLoading(true);
    try {
      await api.revertToVersion(promptId, version, createdBy || undefined);
      return true;
    } catch (error) {
      console.error('Error reverting to version:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createPrompt,
    updatePromptContent,
    deletePrompt,
    revertToVersion,
  };
}

