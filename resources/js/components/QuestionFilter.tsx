
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { getDistinctCategories, getDistinctTopics } from "@/data/questions";
import { useEffect, useState } from "react";

interface QuestionFilterProps {
  selectedCategories?: string[];
  selectedTopics?: string[];
  onCategoryChange?: (categories: string[]) => void;
  onTopicChange?: (topics: string[]) => void;
  onFilterChange?: (filters: { category?: string; topic?: string }) => void;
}

export function QuestionFilter({
  selectedCategories = [],
  selectedTopics = [],
  onCategoryChange,
  onTopicChange,
  onFilterChange,
}: QuestionFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [categoriesData, topicsData] = await Promise.all([
          getDistinctCategories(),
          getDistinctTopics()
        ]);
        setCategories(categoriesData);
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to load filter data:", error);
      }
    };

    loadFilters();
  }, []);

  const handleCategorySelect = (category: string) => {
    if (category === "all") {
      onCategoryChange?.([]);
      onFilterChange?.({ category: undefined });
    } else if (!selectedCategories.includes(category)) {
      const newCategories = [...selectedCategories, category];
      onCategoryChange?.(newCategories);
      onFilterChange?.({ category });
    }
  };

  const handleTopicSelect = (topic: string) => {
    if (topic === "all") {
      onTopicChange?.([]);
      onFilterChange?.({ topic: undefined });
    } else if (!selectedTopics.includes(topic)) {
      const newTopics = [...selectedTopics, topic];
      onTopicChange?.(newTopics);
      onFilterChange?.({ topic });
    }
  };

  const removeCategoryFilter = (category: string) => {
    const newCategories = selectedCategories.filter(c => c !== category);
    onCategoryChange?.(newCategories);
  };

  const removeTopicFilter = (topic: string) => {
    const newTopics = selectedTopics.filter(t => t !== topic);
    onTopicChange?.(newTopics);
  };

  const clearAllFilters = () => {
    onCategoryChange?.([]);
    onTopicChange?.([]);
    onFilterChange?.({});
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <h3 className="font-semibold text-lg">Filter Questions</h3>
      
      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Filter by Category:</label>
        <Select onValueChange={handleCategorySelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Topic Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Filter by Topic:</label>
        <Select onValueChange={handleTopicSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedTopics.length > 0) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Filters:</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="cursor-pointer">
                {category}
                <button
                  onClick={() => removeCategoryFilter(category)}
                  className="ml-1 text-xs hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
            {selectedTopics.map((topic) => (
              <Badge key={topic} variant="outline" className="cursor-pointer">
                {topic}
                <button
                  onClick={() => removeTopicFilter(topic)}
                  className="ml-1 text-xs hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
