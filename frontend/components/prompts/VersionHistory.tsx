import { PromptVersion } from '@/lib/api';
import { Accordion } from '@/components/ui/accordion';
import { VersionHistoryItem } from './VersionHistoryItem';
import { EmptyState } from './EmptyState';
import { History } from 'lucide-react';

interface VersionHistoryProps {
  versions: PromptVersion[];
  onRevertToVersion: (version: number) => void;
}

export function VersionHistory({ versions, onRevertToVersion }: VersionHistoryProps) {
  if (versions.length === 0) {
    return <EmptyState icon={History} title="No version history available" />;
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {versions.map((version, index) => (
        <VersionHistoryItem
          key={version.id}
          version={version}
          isLatest={index === 0}
          onRevert={() => onRevertToVersion(version.version)}
        />
      ))}
    </Accordion>
  );
}

