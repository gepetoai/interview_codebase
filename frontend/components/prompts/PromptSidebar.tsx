import { Prompt } from '@/lib/api';
import { CreatePromptDialog } from './CreatePromptDialog';
import { PromptList } from './PromptList';
import { FileText } from 'lucide-react';

interface PromptSidebarProps {
  prompts: Prompt[];
  selectedPromptId: string | null;
  onSelectPrompt: (prompt: Prompt) => void;
  onCreatePrompt: (name: string, content: string, createdBy?: string) => Promise<void>;
  onDeletePrompt: (id: string) => void;
  loading: boolean;
}

export function PromptSidebar({
  prompts,
  selectedPromptId,
  onSelectPrompt,
  onCreatePrompt,
  onDeletePrompt,
  loading,
}: PromptSidebarProps) {
  return (
    <div className="w-80 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Prompt Manager</h1>
        </div>
        <CreatePromptDialog onCreatePrompt={onCreatePrompt} loading={loading} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Prompts ({prompts.length})
            </h2>
          </div>
          <PromptList
            prompts={prompts}
            selectedPromptId={selectedPromptId}
            onSelectPrompt={onSelectPrompt}
            onDeletePrompt={onDeletePrompt}
          />
        </div>
      </div>
    </div>
  );
}

