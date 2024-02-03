import { Avatar } from '../avatars/Avatar'; // Adjust the path as needed
import { TypingBubble } from '@/components';

export const LoadingBubble = () => (
  <div class="flex justify-start mb-2 items-start animate-fade-in host-container">
    <Avatar /* Here, the Avatar component will use the globally set avatarSrc */ />
    <span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble rounded-full" data-testid="host-bubble">
      <TypingBubble />
    </span>
  </div>
);