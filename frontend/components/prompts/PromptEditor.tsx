import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GitBranch, User, FileText } from 'lucide-react';
import { PromptVersion } from '@/lib/api';

interface PromptEditorProps {
  latestVersion: PromptVersion | null;
  onSave: (content: string, createdBy?: string) => Promise<void>;
  loading: boolean;
}

export function PromptEditor({ latestVersion, onSave, loading }: PromptEditorProps) {
  const [content, setContent] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    if (latestVersion) {
      setContent(latestVersion.content);
    }
  }, [latestVersion]);

  const handleSave = async () => {
    if (!content) return;
    await onSave(content, createdBy || undefined);
    setCreatedBy('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="edit-content" className="text-sm font-medium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Prompt Content
        </Label>
        <Textarea
          id="edit-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          className="font-mono text-sm resize-none bg-slate-50 dark:bg-slate-900/50"
          placeholder="Enter your prompt content here..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="edit-created-by" className="text-sm font-medium flex items-center gap-2">
          <User className="h-4 w-4" />
          Updated By <span className="text-xs text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="edit-created-by"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          placeholder="Your name"
          className="bg-slate-50 dark:bg-slate-900/50"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button onClick={handleSave} disabled={loading || !content} className="gap-2">
          <GitBranch className="h-4 w-4" />
          Save Changes
        </Button>
        {loading && (
          <span className="text-sm text-muted-foreground flex items-center">
            Saving...
          </span>
        )}
      </div>
    </div>
  );
}

