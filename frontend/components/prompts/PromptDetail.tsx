import { Prompt, PromptVersion } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PromptEditor } from './PromptEditor';
import { VersionHistory } from './VersionHistory';
import { EmptyState } from './EmptyState';
import { FileText, History, Clock, Calendar } from 'lucide-react';

interface PromptDetailProps {
  prompt: Prompt | null;
  versions: PromptVersion[];
  onUpdateContent: (content: string, createdBy?: string) => Promise<void>;
  onRevertToVersion: (version: number) => void;
  loading: boolean;
}

export function PromptDetail({
  prompt,
  versions,
  onUpdateContent,
  onRevertToVersion,
  loading,
}: PromptDetailProps) {
  if (!prompt) {
    return (
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardContent className="flex flex-col items-center justify-center h-[600px] text-center">
          <EmptyState
            icon={FileText}
            title="No Prompt Selected"
            description="Select a prompt from the sidebar to view and edit its content, or create a new one to get started."
          />
        </CardContent>
      </Card>
    );
  }

  const latestVersion = versions.length > 0 ? versions[0] : null;

  return (
    <Card className="shadow-lg border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              {prompt.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Created {new Date(prompt.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Updated {new Date(prompt.updated_at).toLocaleDateString()}
              </span>
            </CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <History className="h-3 w-3" />
            {versions.length} {versions.length === 1 ? 'version' : 'versions'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="edit" className="gap-2">
              <FileText className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="versions" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6 mt-0">
            <PromptEditor
              latestVersion={latestVersion}
              onSave={onUpdateContent}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="versions" className="mt-0">
            <VersionHistory
              versions={versions}
              onRevertToVersion={onRevertToVersion}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

