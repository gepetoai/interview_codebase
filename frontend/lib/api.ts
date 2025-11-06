const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Prompt {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PromptVersion {
  id: string;
  prompt_id: string;
  version: number;
  content: string;
  created_at: string;
  created_by: string | null;
}

export const api = {
  async getPrompts(): Promise<Prompt[]> {
    const res = await fetch(`${API_BASE_URL}/prompts`);
    if (!res.ok) throw new Error('Failed to fetch prompts');
    return res.json();
  },

  async createPrompt(name: string, content: string, created_by?: string): Promise<Prompt> {
    const res = await fetch(`${API_BASE_URL}/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, content, created_by }),
    });
    if (!res.ok) throw new Error('Failed to create prompt');
    return res.json();
  },

  async updatePromptContent(id: string, content: string, created_by?: string): Promise<Prompt> {
    const res = await fetch(`${API_BASE_URL}/prompts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, created_by }),
    });
    if (!res.ok) throw new Error('Failed to update prompt');
    return res.json();
  },

  async renamePrompt(id: string, name: string): Promise<Prompt> {
    const res = await fetch(`${API_BASE_URL}/prompts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error('Failed to rename prompt');
    return res.json();
  },

  async deletePrompt(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/prompts/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete prompt');
  },

  async getVersions(promptId: string): Promise<PromptVersion[]> {
    const res = await fetch(`${API_BASE_URL}/prompts/${promptId}/versions`);
    if (!res.ok) throw new Error('Failed to fetch versions');
    return res.json();
  },

  async revertToVersion(promptId: string, version: number, created_by?: string): Promise<Prompt> {
    const url = new URL(`${API_BASE_URL}/prompts/${promptId}/revert/${version}`);
    if (created_by) {
      url.searchParams.append('created_by', created_by);
    }
    const res = await fetch(url.toString(), { method: 'POST' });
    if (!res.ok) throw new Error('Failed to revert to version');
    return res.json();
  },
};

