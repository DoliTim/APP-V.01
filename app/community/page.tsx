'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark,
  Music2,
  Brain,
  Zap,
  Filter,
  TrendingUp,
  Clock,
  Plus
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth/local-storage";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

const categories = [
  { name: 'All', icon: Filter },
  { name: 'Experiences', icon: Brain },
  { name: 'Frequencies', icon: Music2 },
  { name: 'Healing', icon: Zap },
  { name: 'Discussion', icon: MessageSquare },
];

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Sarah K.',
      avatar: '/avatars/sarah.jpg'
    },
    title: 'Amazing experience with 528Hz Love Frequency',
    content: "I've been practicing with the Love Frequency for a week now, and the transformation in my daily life is incredible. My relationships have improved, and I feel more connected to everything around me.",
    category: 'Experiences',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 12,
    isLiked: false,
    isBookmarked: false,
    tags: ['528Hz', 'Love Frequency', 'Transformation']
  },
  {
    id: '2',
    author: {
      name: 'Michael R.',
      avatar: '/avatars/michael.jpg'
    },
    title: 'Guide: Getting started with Schumann Resonance',
    content: "Here's my comprehensive guide to beginning your journey with the Earth's frequency. I'll share my daily practice routine and tips for maximizing benefits.",
    category: 'Frequencies',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 24,
    isLiked: true,
    isBookmarked: true,
    tags: ['Schumann Resonance', 'Beginner Guide', 'Practice Tips']
  }
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Discussion',
    tags: ''
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getCurrentUser();
    const newPostData: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author: {
        name: user?.username || 'Anonymous',
        avatar: '/avatars/default.jpg'
      },
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false,
      isBookmarked: false,
      tags: newPost.tags.split(',').map(tag => tag.trim())
    };
    setPosts([newPostData, ...posts]);
    setShowNewPostForm(false);
    setNewPost({ title: '', content: '', category: 'Discussion', tags: '' });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          The Schumann Community
        </h1>
        <p className="text-gray-400">
          Share experiences, ask questions, and connect with fellow frequency practitioners
        </p>
      </motion.div>

      {/* Categories and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(({ name, icon: Icon }) => (
            <Button
              key={name}
              variant="outline"
              className={`border-purple-500/20 ${
                selectedCategory === name ? 'bg-purple-500/10' : ''
              }`}
              onClick={() => setSelectedCategory(name)}
            >
              <Icon className="h-4 w-4 mr-2" />
              {name}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border-purple-500/20"
          />
          <Button
            onClick={() => setShowNewPostForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="bg-black/40 border-purple-500/20">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <Input
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="bg-black/40 border-purple-500/20"
              />
              <Textarea
                placeholder="Share your experience or ask a question..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="bg-black/40 border-purple-500/20 min-h-[100px]"
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                className="bg-black/40 border-purple-500/20"
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Post
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewPostForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts
          .filter(post => 
            (selectedCategory === 'All' || post.category === selectedCategory) &&
            (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.content.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-black/40 border-purple-500/20 hover:border-purple-500/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-purple-500/10 border-purple-500/20">
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-gray-300">{post.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-purple-500/5 border-purple-500/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`text-gray-400 hover:text-purple-400 ${
                            post.isLiked ? 'text-purple-400' : ''
                          }`}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-purple-400"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-purple-400"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={`text-gray-400 hover:text-purple-400 ${
                            post.isBookmarked ? 'text-purple-400' : ''
                          }`}
                        >
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
} 