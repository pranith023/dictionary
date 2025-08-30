import React from 'react';
import { Trophy, Star, Target, Award, TrendingUp, Zap } from 'lucide-react';
import { Badge, Achievement } from '../types/community';
import { mockBadges, mockAchievements } from '../data/mockCommunity';

interface GamificationTabProps {
  isDarkMode: boolean;
  userLevel: number;
  userPoints: number;
  userStreak: number;
}

export function GamificationTab({ isDarkMode, userLevel, userPoints, userStreak }: GamificationTabProps) {
  const [badges] = React.useState<Badge[]>(mockBadges);
  const [achievements] = React.useState<Achievement[]>(mockAchievements);

  const unlockedBadges = badges.filter(badge => badge.unlockedAt);
  const lockedBadges = badges.filter(badge => !badge.unlockedAt);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-100 text-gray-700';
      case 'rare':
        return isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700';
      case 'epic':
        return isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700';
      case 'legendary':
        return isDarkMode ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
      default:
        return isDarkMode ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-100 text-gray-700';
    }
  };

  const nextLevelPoints = (userLevel + 1) * 100;
  const currentLevelPoints = userLevel * 100;
  const progressToNextLevel = ((userPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  return (
    <div>
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500'
        }`}>
          <Trophy className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Progress
          </h2>
          <p className={`${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Level up your vocabulary skills
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-br from-indigo-800/50 to-purple-800/50 backdrop-blur-xl border-indigo-600/30' 
            : 'bg-gradient-to-br from-indigo-50 to-purple-50 backdrop-blur-xl border-indigo-200'
        } border rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <Star className={`h-8 w-8 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Level {userLevel}
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`}>
                {userPoints} points
              </p>
            </div>
          </div>
          
          <div className={`${
            isDarkMode ? 'bg-gray-700' : 'bg-white'
          } rounded-lg p-3`}>
            <div className="flex justify-between text-sm mb-2">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Progress to Level {userLevel + 1}
              </span>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                {Math.round(progressToNextLevel)}%
              </span>
            </div>
            <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-br from-orange-800/50 to-red-800/50 backdrop-blur-xl border-orange-600/30' 
            : 'bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-xl border-orange-200'
        } border rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <Zap className={`h-8 w-8 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            <div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {userStreak} Days
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-orange-400' : 'text-orange-600'
              }`}>
                Current streak
              </p>
            </div>
          </div>
          
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Keep searching daily to maintain your streak and earn bonus points!
          </p>
        </div>

        <div className={`${
          isDarkMode 
            ? 'bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-xl border-emerald-600/30' 
            : 'bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-xl border-emerald-200'
        } border rounded-2xl p-6`}>
          <div className="flex items-center space-x-3 mb-4">
            <Award className={`h-8 w-8 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <div>
              <h3 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {unlockedBadges.length}
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                Badges earned
              </p>
            </div>
          </div>
          
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {lockedBadges.length} more badges to unlock
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl p-6 mb-8`}>
        <h3 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Achievements
        </h3>

        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`${
                achievement.completed
                  ? isDarkMode ? 'bg-green-600/20 border-green-600/30' : 'bg-green-50 border-green-200'
                  : isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'
              } border rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.completed
                      ? 'bg-green-500 text-white'
                      : isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Target className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    achievement.completed
                      ? 'text-green-500'
                      : isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    +{achievement.points}
                  </div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    points
                  </div>
                </div>
              </div>

              {!achievement.completed && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Progress: {achievement.progress}/{achievement.maxProgress}
                    </span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                    </span>
                  </div>
                  <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/50 backdrop-blur-xl border-gray-700' 
          : 'bg-white/70 backdrop-blur-xl border-gray-200'
      } border rounded-2xl p-6`}>
        <h3 className={`text-xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Badge Collection
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`text-center p-4 rounded-xl transition-all duration-200 ${
                badge.unlockedAt
                  ? isDarkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-white border-gray-200'
                  : isDarkMode ? 'bg-gray-800/30 border-gray-700' : 'bg-gray-50 border-gray-300'
              } border hover:scale-105`}
            >
              <div className={`text-4xl mb-2 ${
                badge.unlockedAt ? '' : 'grayscale opacity-50'
              }`}>
                {badge.icon}
              </div>
              
              <h4 className={`font-bold text-sm mb-1 ${
                badge.unlockedAt
                  ? isDarkMode ? 'text-white' : 'text-gray-900'
                  : isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {badge.name}
              </h4>
              
              <p className={`text-xs mb-2 ${
                badge.unlockedAt
                  ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  : isDarkMode ? 'text-gray-600' : 'text-gray-500'
              }`}>
                {badge.description}
              </p>
              
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRarityColor(badge.rarity)}`}>
                {badge.rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}