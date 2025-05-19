
import { useState } from "react";
import { StoryType } from "@/types/company";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { questionsData } from "@/data/questions";
import { QuestionFilter } from "@/components/QuestionFilter";

interface CompanyStoriesProps {
  stories?: StoryType[];
}

export function CompanyStories({ stories = [] }: CompanyStoriesProps) {
  const [filters, setFilters] = useState<{ category?: string; topic?: string }>({});
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return "Unknown date";
    }
  };

  // Filter stories based on selected category and topic
  const filteredStories = stories.filter(story => {
    // Find the corresponding question
    const question = questionsData.find(q => q.id === story.questionId);
    if (!question) return false;
    
    // Apply category filter if set
    if (filters.category && question.category !== filters.category) {
      return false;
    }
    
    // Apply topic filter if set
    if (filters.topic && question.topic !== filters.topic) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (newFilters: { category?: string; topic?: string }) => {
    setFilters(newFilters);
  };

  if (stories.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Employee Stories</h2>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No stories have been shared yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Employee Stories</h2>
      
      <QuestionFilter onFilterChange={handleFilterChange} />
      
      {filteredStories.length > 0 ? (
        <div className="space-y-6">
          {filteredStories.map((story, index) => {
            // Find the corresponding question data
            const questionData = questionsData.find(q => q.id === story.questionId);
            
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <CardTitle className="text-lg">
                        {story.question}
                      </CardTitle>
                      <Badge variant={story.answer ? "default" : "destructive"}>
                        {story.answer ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="bg-secondary/20">
                        {questionData?.category || story.category}
                      </Badge>
                      {questionData && (
                        <Badge variant="outline" className="bg-secondary/20">
                          {questionData.topic}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{story.comment}"</p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Shared on {formatDate(story.timestamp)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            {stories.length > 0 
              ? "No stories match the selected filters." 
              : "No stories have been shared yet."}
          </p>
        </div>
      )}
    </div>
  );
}
