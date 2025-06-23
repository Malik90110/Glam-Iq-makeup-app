
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, Twitter, Facebook, Instagram, Link, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SocialSharingProps {
  lookName?: string;
  imageData?: string;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ lookName = "My AI Makeup Look", imageData }) => {
  const shareText = `Check out my personalized makeup look created with AI Makeup Advisor! 💄✨ #MakeupAI #BeautyTech`;
  const shareUrl = window.location.href;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: lookName,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link copied to clipboard!" });
  };

  const handleSocialShare = (platform: string) => {
    let url = '';
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'instagram':
        toast({ title: "Open Instagram app to share your look!" });
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const handleReferFriend = () => {
    const referralText = `Try AI Makeup Advisor - get personalized makeup recommendations with AI! ${shareUrl}`;
    if (navigator.share) {
      navigator.share({
        title: 'AI Makeup Advisor Referral',
        text: referralText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(referralText);
      toast({ title: "Referral link copied! Share with friends to earn rewards." });
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Your Look
          </h4>
          <p className="text-sm text-gray-600">Show off your AI-powered makeup transformation!</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleNativeShare} variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button onClick={handleCopyLink} variant="outline" size="sm" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Copy Link
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button 
            onClick={() => handleSocialShare('twitter')} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-blue-500 border-blue-200 hover:bg-blue-50"
          >
            <Twitter className="w-4 h-4" />
            Tweet
          </Button>
          <Button 
            onClick={() => handleSocialShare('facebook')} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Facebook className="w-4 h-4" />
            Share
          </Button>
          <Button 
            onClick={() => handleSocialShare('instagram')} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-pink-500 border-pink-200 hover:bg-pink-50"
          >
            <Instagram className="w-4 h-4" />
            Story
          </Button>
        </div>

        <div className="pt-2 border-t border-pink-200">
          <Button 
            onClick={handleReferFriend}
            variant="outline" 
            size="sm"
            className="w-full flex items-center gap-2 text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            <Users className="w-4 h-4" />
            Refer a Friend & Get Rewards
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SocialSharing;
