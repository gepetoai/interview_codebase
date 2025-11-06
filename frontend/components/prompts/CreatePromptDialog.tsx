import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface CreatePromptDialogProps {
  onCreatePrompt: (name: string, content: string, createdBy?: string) => Promise<void>;
  loading: boolean;
}

export function CreatePromptDialog({ onCreatePrompt, loading }: CreatePromptDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  const handleCreate = async () => {
    if (!name || !content) return;
    
    await onCreatePrompt(name, content, createdBy || undefined);
    setIsOpen(false);
    setName('');
    setContent('');
    setCreatedBy('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Prompt</DialogTitle>
          <DialogDescription>Add a new prompt to your collection</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter prompt name"
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter prompt content"
              rows={5}
            />
          </div>
          <div>
            <Label htmlFor="created-by">Created By (optional)</Label>
            <Input
              id="created-by"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading || !name || !content}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

