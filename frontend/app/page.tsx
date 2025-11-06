'use client';

import { useEffect, useState } from 'react';
import { api, Prompt, PromptVersion } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, History, Trash2, FileText, Calendar, User, Clock, GitBranch } from 'lucide-react';

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newPromptName, setNewPromptName] = useState('');
  const [newPromptContent, setNewPromptContent] = useState('');
  const [newPromptCreatedBy, setNewPromptCreatedBy] = useState('');

  const [editContent, setEditContent] = useState('');
  const [editCreatedBy, setEditCreatedBy] = useState('');

  useEffect(() => {
    loadPrompts();
  }, []);

  useEffect(() => {
    if (selectedPrompt) {
      loadVersions(selectedPrompt.id);
    }
  }, [selectedPrompt]);

  const loadPrompts = async () => {
    try {
      const data = await api.getPrompts();
      setPrompts(data);
    } catch (error) {
      console.error('Error loading prompts:', error);
    }
  };

  const loadVersions = async (promptId: string) => {
    try {
      const data = await api.getVersions(promptId);
      setVersions(data);
      if (data.length > 0) {
        setEditContent(data[0].content);
      }
    } catch (error) {
      console.error('Error loading versions:', error);
    }
  };

  const handleCreatePrompt = async () => {
    if (!newPromptName || !newPromptContent) return;
    
    setLoading(true);
    try {
      await api.createPrompt(newPromptName, newPromptContent, newPromptCreatedBy || undefined);
      setIsCreateOpen(false);
      setNewPromptName('');
      setNewPromptContent('');
      setNewPromptCreatedBy('');
      await loadPrompts();
    } catch (error) {
      console.error('Error creating prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateContent = async () => {
    if (!selectedPrompt || !editContent) return;
    
    setLoading(true);
    try {
      await api.updatePromptContent(selectedPrompt.id, editContent, editCreatedBy || undefined);
      await loadVersions(selectedPrompt.id);
      setEditCreatedBy('');
    } catch (error) {
      console.error('Error updating prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePrompt = async (id: string) => {
    setLoading(true);
    try {
      await api.deletePrompt(id);
      if (selectedPrompt?.id === id) {
        setSelectedPrompt(null);
        setVersions([]);
      }
      await loadPrompts();
    } catch (error) {
      console.error('Error deleting prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevertToVersion = async (version: number) => {
    if (!selectedPrompt) return;
    
    setLoading(true);
    try {
      await api.revertToVersion(selectedPrompt.id, version, editCreatedBy || undefined);
      await loadVersions(selectedPrompt.id);
    } catch (error) {
      console.error('Error reverting to version:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Prompt Manager</h1>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
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
                      value={newPromptName}
                      onChange={(e) => setNewPromptName(e.target.value)}
                      placeholder="Enter prompt name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newPromptContent}
                      onChange={(e) => setNewPromptContent(e.target.value)}
                      placeholder="Enter prompt content"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="created-by">Created By (optional)</Label>
                    <Input
                      id="created-by"
                      value={newPromptCreatedBy}
                      onChange={(e) => setNewPromptCreatedBy(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePrompt} disabled={loading || !newPromptName || !newPromptContent}>
                    Create
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Prompts ({prompts.length})
                </h2>
              </div>
              {prompts.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">No prompts yet</p>
                  <p className="text-xs text-muted-foreground">Create your first prompt to get started</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {prompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className={`group p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedPrompt?.id === prompt.id 
                          ? 'bg-primary/10 border-l-2 border-primary' 
                          : 'hover:bg-accent border-l-2 border-transparent'
                      }`}
                      onClick={() => setSelectedPrompt(prompt)}
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
                                onClick={() => handleDeletePrompt(prompt.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-5xl">

            {selectedPrompt ? (
              <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {selectedPrompt.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Created {new Date(selectedPrompt.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Updated {new Date(selectedPrompt.updated_at).toLocaleDateString()}
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
                      <div className="space-y-2">
                        <Label htmlFor="edit-content" className="text-sm font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Prompt Content
                        </Label>
                        <Textarea
                          id="edit-content"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
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
                          value={editCreatedBy}
                          onChange={(e) => setEditCreatedBy(e.target.value)}
                          placeholder="Your name"
                          className="bg-slate-50 dark:bg-slate-900/50"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button onClick={handleUpdateContent} disabled={loading} className="gap-2">
                          <GitBranch className="h-4 w-4" />
                          Save Changes
                        </Button>
                        {loading && (
                          <span className="text-sm text-muted-foreground flex items-center">
                            Saving...
                          </span>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="versions" className="mt-0">
                      {versions.length === 0 ? (
                        <div className="text-center py-12 px-4">
                          <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <History className="h-6 w-6 text-slate-400" />
                          </div>
                          <p className="text-sm text-muted-foreground">No version history available</p>
                        </div>
                      ) : (
                        <Accordion type="single" collapsible className="w-full">
                          {versions.map((version, index) => (
                            <AccordionItem key={version.id} value={version.id} className="border-b-slate-200 dark:border-b-slate-800">
                              <AccordionTrigger className="hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-900/50 px-4 rounded-lg transition-colors">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <div className="flex items-center gap-3">
                                    <Badge variant={index === 0 ? "default" : "outline"} className="font-mono">
                                      v{version.version}
                                    </Badge>
                                    {index === 0 && (
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
                                  {version.version !== versions[0].version && (
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
                                          <AlertDialogAction onClick={() => handleRevertToVersion(version.version)}>
                                            Revert
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      )}
                    </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            ) : (
              <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardContent className="flex flex-col items-center justify-center h-[600px] text-center">
                  <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <FileText className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Prompt Selected</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Select a prompt from the sidebar to view and edit its content, or create a new one to get started.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

