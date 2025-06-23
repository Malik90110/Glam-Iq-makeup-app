import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Calendar, Trophy, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  day: number;
  title: string;
  description: string;
  tasks: string[];
  completed: boolean;
  reward: string;
}

interface GlowUpChallengeProps {
  userAnalysis?: any;
  savedLooks?: any[];
  isPremium: boolean;
}

const GlowUpChallenge: React.FC<GlowUpChallengeProps> = ({ userAnalysis, savedLooks, isPremium }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    initializeChallenges();
  }, []);

  const initializeChallenges = () => {
    const challengeData: Challenge[] = [
      {
        id: '1',
        day: 1,
        title: 'Foundation Day',
        description: 'Perfect your base makeup routine',
        tasks: ['Take a no-makeup selfie', 'Try a new foundation technique', 'Document your skin concerns'],
        completed: false,
        reward: '10 Beauty Points'
      },
      {
        id: '2',
        day: 2,
        title: 'Eye Enhancement',
        description: 'Master eye makeup basics',
        tasks: ['Practice eyeshadow blending', 'Try winged eyeliner', 'Experiment with mascara techniques'],
        completed: false,
        reward: '15 Beauty Points'
      },
      {
        id: '3',
        day: 3,
        title: 'Lip Perfection',
        description: 'Discover your perfect lip look',
        tasks: ['Try 3 different lip colors', 'Practice lip contouring', 'Find your signature lip style'],
        completed: false,
        reward: '12 Beauty Points'
      },
      {
        id: '4',
        day: 4,
        title: 'Skincare Focus',
        description: 'Enhance your skincare routine',
        tasks: ['Try a new face mask', 'Establish morning routine', 'Research ingredients for your skin type'],
        completed: false,
        reward: '20 Beauty Points'
      },
      {
        id: '5',
        day: 5,
        title: 'Color Harmony',
        description: 'Master color coordination',
        tasks: ['Create a monochromatic look', 'Try complementary colors', 'Experiment with seasonal palette'],
        completed: false,
        reward: '18 Beauty Points'
      },
      {
        id: '6',
        day: 6,
        title: 'Special Occasion',
        description: 'Create an elevated look',
        tasks: ['Design an evening look', 'Try advanced techniques', 'Add glamorous elements'],
        completed: false,
        reward: '25 Beauty Points'
      },
      {
        id: '7',
        day: 7,
        title: 'Glow-Up Reveal',
        description: 'Showcase your transformation',
        tasks: ['Take final photos', 'Compare before/after', 'Share your journey'],
        completed: false,
        reward: '50 Beauty Points + Certificate'
      }
    ];
    
    setChallenges(challengeData);
  };

  const toggleTaskCompletion = (challengeId: string, taskIndex: number) => {
    const taskKey = `${challengeId}-${taskIndex}`;
    const newCompleted = new Set(completedTasks);
    
    if (completedTasks.has(taskKey)) {
      newCompleted.delete(taskKey);
    } else {
      newCompleted.add(taskKey);
      toast({ 
        title: "Task completed! 🎉", 
        description: "You're one step closer to your glow-up!" 
      });
    }
    
    setCompletedTasks(newCompleted);
  };

  const getTasksCompletedForChallenge = (challengeId: string, tasksCount: number) => {
    let completed = 0;
    for (let i = 0; i < tasksCount; i++) {
      if (completedTasks.has(`${challengeId}-${i}`)) {
        completed++;
      }
    }
    return completed;
  };

  const totalProgress = challenges.reduce((acc, challenge) => {
    const completed = getTasksCompletedForChallenge(challenge.id, challenge.tasks.length);
    return acc + (completed / challenge.tasks.length) * 100;
  }, 0) / challenges.length;

  if (!isPremium) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-pink-50">
        <Trophy className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">7-Day Glow-Up Challenge</h3>
        <p className="text-gray-600 mb-6">Transform your beauty routine with our structured daily challenges</p>
        <div className="bg-white p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Preview: Day 1 - Foundation Day</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✨ Take a no-makeup selfie</li>
            <li>✨ Try a new foundation technique</li>
            <li>✨ Document your skin concerns</li>
          </ul>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          Upgrade to Start Challenge
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">7-Day Glow-Up Challenge</h3>
              <p className="text-gray-600">Day {currentDay} of 7</p>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-700">
            {Math.round(totalProgress)}% Complete
          </Badge>
        </div>
        
        <Progress value={totalProgress} className="mb-4" />
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>Complete all tasks to earn rewards and track your progress</span>
        </div>
      </Card>

      <div className="grid gap-4">
        {challenges.map((challenge) => {
          const tasksCompletedForChallenge = getTasksCompletedForChallenge(challenge.id, challenge.tasks.length);
          const isCurrentDay = challenge.day === currentDay;
          const isAccessible = challenge.day <= currentDay;
          
          return (
            <Card 
              key={challenge.id} 
              className={`p-6 transition-all duration-200 ${
                isCurrentDay ? 'ring-2 ring-purple-500 shadow-lg' : ''
              } ${!isAccessible ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tasksCompletedForChallenge === challenge.tasks.length 
                      ? 'bg-green-100 text-green-600' 
                      : isCurrentDay 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {tasksCompletedForChallenge === challenge.tasks.length ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Day {challenge.day}: {challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {challenge.reward}
                </Badge>
              </div>

              <div className="space-y-3">
                {challenge.tasks.map((task, index) => {
                  const taskKey = `${challenge.id}-${index}`;
                  const isCompleted = completedTasks.has(taskKey);
                  
                  return (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        isCompleted ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                      } ${!isAccessible ? 'pointer-events-none' : ''}`}
                      onClick={() => isAccessible && toggleTaskCompletion(challenge.id, index)}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${isCompleted ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>

              {tasksCompletedForChallenge === challenge.tasks.length && isAccessible && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                  <span className="text-green-700 font-medium">🎉 Challenge Complete! Reward: {challenge.reward}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GlowUpChallenge;
