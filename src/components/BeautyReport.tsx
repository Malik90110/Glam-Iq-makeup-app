
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Calendar, Award, Target, BarChart3 } from 'lucide-react';

interface BeautyReportProps {
  userAnalysis?: any;
  savedLooks?: any[];
  isPremium: boolean;
}

const BeautyReport: React.FC<BeautyReportProps> = ({ 
  userAnalysis, 
  savedLooks = [], 
  isPremium 
}) => {
  const [selectedMonth, setSelectedMonth] = useState('current');

  const getReportData = () => {
    return {
      totalLooks: savedLooks.length || 12,
      favoriteColors: ['Rose Gold', 'Warm Brown', 'Coral Pink'],
      improvementAreas: ['Eye blending', 'Lip definition', 'Color matching'],
      achievements: ['Consistent daily routine', 'Tried 5 new techniques', 'Perfect winged eyeliner'],
      skillProgress: 78,
      nextGoals: ['Master contouring', 'Experiment with bold colors', 'Perfect evening looks']
    };
  };

  if (!isPremium) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-orange-50 to-red-50">
        <BarChart3 className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Monthly Beauty Report</h3>
        <p className="text-gray-600 mb-6">Get detailed insights into your beauty journey and progress</p>
        <div className="bg-white p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Your report includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>📊 Detailed usage analytics</li>
            <li>🎯 Personalized improvement tips</li>
            <li>🏆 Achievement tracking</li>
            <li>📈 Progress visualization</li>
            <li>🎨 Style evolution insights</li>
          </ul>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-red-500">
          Upgrade for Beauty Reports
        </Button>
      </Card>
    );
  }

  const reportData = getReportData();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">Monthly Beauty Report</h3>
              <p className="text-gray-600">Your beauty journey insights</p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700">
            December 2024
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg text-center">
            <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Looks Created</h4>
            <p className="text-2xl font-bold text-orange-600">{reportData.totalLooks}</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <Target className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Skill Progress</h4>
            <p className="text-2xl font-bold text-orange-600">{reportData.skillProgress}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <Award className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-800">Achievements</h4>
            <p className="text-2xl font-bold text-orange-600">{reportData.achievements.length}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Skill Progress
          </h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Overall Progress</span>
                <span className="text-sm font-medium">{reportData.skillProgress}%</span>
              </div>
              <Progress value={reportData.skillProgress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Eye Makeup</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Base Makeup</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Color Coordination</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-orange-500" />
            This Month's Achievements
          </h4>
          <div className="space-y-3">
            {reportData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Favorite Color Palette</h4>
          <div className="flex flex-wrap gap-2">
            {reportData.favoriteColors.map((color, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Areas for Improvement</h4>
          <div className="space-y-2">
            {reportData.improvementAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-4 h-4 text-orange-500" />
                {area}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h4 className="font-semibold text-gray-800 mb-4">Next Month's Goals</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportData.nextGoals.map((goal, index) => (
            <div key={index} className="bg-white p-4 rounded-lg text-center">
              <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-700">{goal}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BeautyReport;
