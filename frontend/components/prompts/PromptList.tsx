import { Prompt } from '@/lib/api';
import { PromptListItem } from './PromptListItem';
import { EmptyState } from './EmptyState';
import { FileText } from 'lucide-react';

interface PromptListProps {
  prompts: Prompt[];
  selectedPromptId: string | null;
  onSelectPrompt?: (prompt: Prompt) => void;
  onDeletePrompt: (id: string) => void;
}

export function PromptList({
  prompts,
  selectedPromptId,
  onSelectPrompt,
  onDeletePrompt,
}: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No prompts yet"
        description="Create your first prompt to get started"
      />
    );
  }

  return (
    <div className="space-y-1">
      {prompts.map((prompt) => (
        <PromptListItem
          key={prompt.id}
          prompt={prompt}
          isSelected={selectedPromptId === prompt.id}
          onSelect={() => onSelectPrompt?.(prompt)}
          onDelete={() => onDeletePrompt(prompt.id)}
        />
      ))}
    </div>
  );
}

