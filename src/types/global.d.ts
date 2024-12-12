import { IconType } from 'react-icons';

/* Social Media */

interface SocialMedia {
  id: number;
  icon: IconType;
  url: string;
}

export type SocialMediaList = SocialMedia[];
