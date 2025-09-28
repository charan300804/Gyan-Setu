import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ChatContact, Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowLeft, Send } from 'lucide-react';

interface ChatMessagesProps {
  contact: ChatContact | null;
  conversation: Conversation | undefined;
  onBack: () => void;
}

export function ChatMessages({ contact, conversation, onBack }: ChatMessagesProps) {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-teacher');
  const contactAvatar = PlaceHolderImages.find(p => p.id === contact?.avatarId);

  if (!contact) {
    return (
      <div className="hidden lg:flex items-center justify-center h-full text-muted-foreground">
        Select a conversation to start chatting.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={contactAvatar?.imageUrl} alt={contact.name} data-ai-hint={contactAvatar?.imageHint} />
          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.role}</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversation?.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-end gap-2',
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.sender === 'other' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={contactAvatar?.imageUrl} alt={contact.name} data-ai-hint={contactAvatar?.imageHint} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg p-3 lg:max-w-md',
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{message.text}</p>
                <p className={cn(
                    "text-xs mt-1",
                    message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                )}>{message.timestamp}</p>
              </div>
              {message.sender === 'me' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src={userAvatar?.imageUrl} alt="You" data-ai-hint={userAvatar?.imageHint} />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="relative">
          <Input placeholder="Type your message..." className="pr-12" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <Send className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
