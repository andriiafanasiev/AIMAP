import React from 'react';
import { BarChart3, Users, Zap, Code } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Stats = ({ tools }) => {
    const { t } = useLanguage();
    const totalTools = tools.length;
    const freeTools = tools.filter((tool) => tool.isFree).length;
    const apiTools = tools.filter((tool) => tool.hasAPI).length;

    const categoryCounts = {};
    tools.forEach((tool) => {
        tool.categories.forEach((category) => {
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
    });

    const topCategory = Object.entries(categoryCounts).sort(
        ([, a], [, b]) => b - a
    )[0];

    const stats = [
        {
            label: t('catalog.stats.total'),
            value: totalTools,
            icon: BarChart3,
            color: 'bg-blue-500',
        },
        {
            label: t('catalog.stats.free'),
            value: freeTools,
            icon: Users,
            color: 'bg-green-500',
        },
        {
            label: t('catalog.stats.api'),
            value: apiTools,
            icon: Code,
            color: 'bg-purple-500',
        },
        {
            label: t('catalog.stats.popularCategory'),
            value: topCategory ? t(`categories.${topCategory[0]}`) : 'Н/Д',
            icon: Zap,
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('catalog.stats.title')}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="text-center">
                            <div
                                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.color} text-white mb-3`}
                            >
                                <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    {t('catalog.stats.distribution')}
                </h4>
                <div className="space-y-2">
                    {Object.entries(categoryCounts)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([category, count]) => (
                            <div
                                key={category}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                    {t(`categories.${category}`)}
                                </span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {count}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
