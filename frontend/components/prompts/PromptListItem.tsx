import { Prompt } from '@/lib/api';
import { Button } from '@/components/ui/button';
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
import { Calendar, GitBranch, Trash2 } from 'lucide-react';

interface PromptListItemProps {
  prompt: Prompt;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function PromptListItem({ prompt, isSelected, onSelect, onDelete }: PromptListItemProps) {
  return (
    <div
      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-primary/10 border-l-2 border-primary'
          : 'hover:bg-accent border-l-2 border-transparent'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-sm truncate">{prompt.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{new Date(prompt.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete &quot;{prompt.name}&quot;? This action cannot be undone and will delete all versions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

