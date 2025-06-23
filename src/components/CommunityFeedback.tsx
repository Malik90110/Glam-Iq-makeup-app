
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Heart, MessageCircle, Share2, Camera, ThumbsUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  user: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

interface CommunityFeedbackProps {
  userAnalysis?: any;
  savedLooks?: any[];
  isPremium: boolean;
}

const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ 
  userAnalysis, 
  savedLooks = [], 
  isPremium 
}) => {
  const [activeTab, setActiveTab] = useState('feed');

  const getCommunityPosts = (): CommunityPost[] => {
    return [
      {
        id: '1',
        user: 'BeautyLover23',
        avatar: '👩‍🦰',
        image: '🖼️',
        caption: 'Finally nailed my everyday natural look! Any tips for making it last longer?',
        likes: 24,
        comments: 8,
        timestamp: '2 hours ago',
        tags: ['natural', 'everyday', 'beginner']
      },
      {
        id: '2',
        user: 'GlamQueen',
        avatar: '👸',
        image: '🖼️',
        caption: 'Bold red lip for date night! Feeling confident ✨',
        likes: 45,
        comments: 12,
        timestamp: '5 hours ago',
        tags: ['bold', 'evening', 'confident']
      },
      {
        id: '3',
        user: 'MakeupNewbie',
        avatar: '🙋‍♀️',
        image: '🖼️',
        caption: 'First time trying winged eyeliner... practice makes perfect!',
        likes: 18,
        comments: 15,
        timestamp: '1 day ago',
        tags: ['learning', 'eyeliner', 'practice']
      }
    ];
  };

  const handleLike = (postId: string) => {
    toast({ 
      title: "Liked! ❤️", 
      description: "Your support means a lot to the community" 
    });
  };

  const handleShare = () => {
    toast({ 
      title: "Look shared! ✨", 
      description: "Your look has been shared with the community" 
    });
  };

  if (!isPremium) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
        <Users className="w-16 h-16 text-pink-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Feedback</h3>
        <p className="text-gray-600 mb-6">Connect with beauty enthusiasts and get feedback on your looks</p>
        <div className="bg-white p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Community features:</h4>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>💬 Share your looks and get feedback</li>
            <li>❤️ Like and support other users</li>
            <li>🎯 Get personalized tips from experts</li>
            <li>🌟 Join beauty challenges</li>
            <li>👥 Build your beauty network</li>
          </ul>
        </div>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500">
          Join the Community
        </Button>
      </Card>
    );
  }

  const communityPosts = getCommunityPosts();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-pink-500" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Beauty Community</h3>
              <p className="text-gray-600">Share, learn, and grow together</p>
            </div>
          </div>
          <Button 
            onClick={handleShare}
            className="bg-gradient-to-r from-pink-500 to-purple-500"
          >
            <Camera className="w-4 h-4 mr-2" />
            Share Look
          </Button>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm">
          <TabsTrigger 
            value="feed"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Users className="w-4 h-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger 
            value="my-posts"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <Camera className="w-4 h-4" />
            My Posts
          </TabsTrigger>
          <TabsTrigger 
            value="trending"
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            <ThumbsUp className="w-4 h-4" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-6">
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-800">{post.user}</h5>
                      <span className="text-sm text-gray-500">{post.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{post.caption}</p>
                    
                    <div className="bg-gray-100 rounded-lg p-8 mb-4 text-center text-4xl">
                      {post.image}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-pink-500"
                      >
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-2 text-gray-600 hover:text-green-500"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-posts" className="mt-6">
          <Card className="p-8 text-center bg-gray-50">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Share Your First Look!</h4>
            <p className="text-gray-600 mb-4">Show off your makeup skills and get feedback from the community</p>
            <Button onClick={handleShare} className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Camera className="w-4 h-4 mr-2" />
              Share a Look
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-gray-800">Trending This Week</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-100 text-yellow-800">#GoldenHour</Badge>
                <Badge className="bg-orange-100 text-orange-800">#NaturalGlow</Badge>
                <Badge className="bg-red-100 text-red-800">#BoldLips</Badge>
                <Badge className="bg-purple-100 text-purple-800">#Smokey Eyes</Badge>
              </div>
            </Card>
            
            {communityPosts.slice(0, 2).map((post) => (
              <Card key={post.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-semibold text-gray-800">{post.user}</h5>
                      <Badge variant="outline" className="text-xs">Trending</Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{post.caption}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityFeedback;
