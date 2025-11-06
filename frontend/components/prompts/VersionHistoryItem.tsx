import { PromptVersion } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Calendar, Clock, GitBranch, User } from 'lucide-react';

interface VersionHistoryItemProps {
  version: PromptVersion;
  isLatest: boolean;
  onRevert: () => void;
}

export function VersionHistoryItem({ version, isLatest, onRevert }: VersionHistoryItemProps) {
  return (
    <AccordionItem
      value={version.id}
      className="border-b-slate-200 dark:border-b-slate-800"
    >
      <AccordionTrigger className="hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-900/50 px-4 rounded-lg transition-colors">
        <div className="flex items-center justify-between w-full pr-4">
          <div className="flex items-center gap-3">
            <Badge variant={isLatest ? 'default' : 'outline'} className="font-mono">
              v{version.version}
            </Badge>
            {isLatest && (
              <Badge variant="secondary" className="text-xs">
                Latest
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(version.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(version.created_at).toLocaleTimeString()}
            </span>
            {version.created_by && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {version.created_by}
              </span>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4 pt-4">
          <Separator />
          <Textarea
            value={version.content}
            readOnly
            rows={10}
            className="font-mono text-sm resize-none bg-slate-50 dark:bg-slate-900/50 cursor-default"
          />
          {!isLatest && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <GitBranch className="h-4 w-4" />
                  Revert to this version
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Revert to Version {version.version}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will create a new version with the content from version {version.version}. Your current version will be preserved in the history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onRevert}>Revert</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

