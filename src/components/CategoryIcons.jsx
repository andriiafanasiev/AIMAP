import React from 'react';
import { 
  FileText, 
  Image, 
  Video, 
  Music, 
  MessageSquare, 
  Code, 
  Mic, 
  Zap, 
  TrendingUp, 
  Search, 
  Github, 
  BookOpen, 
  Gamepad2 
} from 'lucide-react';

const CategoryIcons = ({ category, className = "w-4 h-4" }) => {
  const iconMap = {
    'text': FileText,
    'image': Image,
    'video': Video,
    'audio': Music,
    'chatbot': MessageSquare,
    'code': Code,
    'voice': Mic,
    'productivity': Zap,
    'marketing': TrendingUp,
    'research': Search,
    'open-source': Github,
    'education': BookOpen,
    'fun': Gamepad2
  };

  const IconComponent = iconMap[category] || FileText;

  return <IconComponent className={className} />;
};

export default CategoryIcons; 