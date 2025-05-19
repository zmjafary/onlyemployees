
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getDistinctCategories, getDistinctTopics } from "@/data/questions";

interface QuestionFilterProps {
  onFilterChange: (filters: { category?: string; topic?: string }) => void;
}

export function QuestionFilter({ onFilterChange }: QuestionFilterProps) {
  const [category, setCategory] = useState<string>("all");
  const [topic, setTopic] = useState<string>("all");
  
  const categories = getDistinctCategories();
  const topics = getDistinctTopics();
  
  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onFilterChange({ category: value === "all" ? undefined : value, topic: topic === "all" ? undefined : topic });
  };
  
  const handleTopicChange = (value: string) => {
    setTopic(value);
    onFilterChange({ category: category === "all" ? undefined : category, topic: value === "all" ? undefined : value });
  };
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-sm">
      <h3 className="font-medium mb-4">Filter Stories & Questions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category" className="mb-2 block">Category</Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="topic" className="mb-2 block">Topic</Label>
          <Select value={topic} onValueChange={handleTopicChange}>
            <SelectTrigger id="topic">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}