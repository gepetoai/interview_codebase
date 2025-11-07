'use client';

import { useState } from 'react';
import { Prompt } from '@/lib/api';
import { usePrompts } from '@/hooks/usePrompts';
import { useVersions } from '@/hooks/useVersions';
import { usePromptActions } from '@/hooks/usePromptActions';
import { PromptSidebar } from '@/components/prompts/PromptSidebar';
import { PromptDetail } from '@/components/prompts/PromptDetail';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  
  const { prompts, reload: reloadPrompts } = usePrompts();
  const { versions, reload: reloadVersions } = useVersions(selectedPrompt?.id || null);
  const {
    loading,
    createPrompt,
    updatePromptContent,
    deletePrompt,
    revertToVersion,
  } = usePromptActions();

  const handleCreatePrompt = async (
    name: string,
    content: string,
    createdBy?: string
  ) => {
    const success = await createPrompt(name, content, createdBy);
    if (success) {
      await reloadPrompts();
    }
  };

  const handleUpdateContent = async (content: string, createdBy?: string) => {
    if (!selectedPrompt) return;
    const success = await updatePromptContent(selectedPrompt.id, content, createdBy);
    if (success) {
      await reloadVersions();

      //Reload prompts and update selected prompt
      const updatedPrompts = await reloadPrompts();
      const updatedPrompt = updatedPrompts.find(p => p.id === selectedPrompt.id);
      if (updatedPrompt) {
        setSelectedPrompt(updatedPrompt);
      }
    }
  };

  const handleDeletePrompt = async (id: string) => {
    const success = await deletePrompt(id);
    if (success) {
      if (selectedPrompt?.id === id) {
        setSelectedPrompt(null);
      }
      await reloadPrompts();
    }
  };

  const handleRevertToVersion = async (version: number) => {
    if (!selectedPrompt) return;
    const success = await revertToVersion(selectedPrompt.id, version);
    if (success) {
      await reloadVersions();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="flex h-screen">
        <PromptSidebar
          prompts={prompts}
          selectedPromptId={selectedPrompt?.id || null}
          onSelectPrompt={setSelectedPrompt}
          onCreatePrompt={handleCreatePrompt}
          onDeletePrompt={handleDeletePrompt}
          loading={loading}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-5xl">
            <PromptDetail
              prompt={selectedPrompt}
              versions={versions}
              onUpdateContent={handleUpdateContent}
              onRevertToVersion={handleRevertToVersion}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
