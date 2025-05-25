
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCompany } from "@/hooks/useCompanyData";
import { CompanyWithFlags, StoryType } from "@/types/company";
import { motion } from "framer-motion";
import { Building, Calendar, ExternalLink, Flag, MapPin, MessageSquare, Users, Send, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from '@inertiajs/react';
import { questionsData } from "@/data/questions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Example stories data for demonstration
const exampleStories: StoryType[] = [
  {
    id: "story-1",
    questionId: 1,
    answer: true,
    comment: "The company offers competitive salaries compared to industry standards, with good annual raises and performance bonuses.",
    category: "Compensation & Benefits",
    question: "Does the company offer competitive salaries?",
    timestamp: "2025-04-01T12:00:00Z"
  },
  {
    id: "story-2",
    questionId: 3,
    answer: true,
    comment: "Great health insurance package with dental and vision. They also offer wellness programs and gym membership discounts.",
    category: "Compensation & Benefits",
    question: "Are health and wellness benefits provided?",
    timestamp: "2025-04-02T15:30:00Z"
  },
  {
    id: "story-3",
    questionId: 4,
    answer: false,
    comment: "Unfortunately, the work hours are very rigid. You must be in the office from 9-5 with little flexibility.",
    category: "Work-Life Balance",
    question: "Is there flexibility in work hours?",
    timestamp: "2025-04-03T09:15:00Z"
  },
  {
    id: "story-4",
    questionId: 5,
    answer: true,
    comment: "They have a great remote work policy. You can work from anywhere as long as you attend the necessary meetings.",
    category: "Work-Life Balance",
    question: "Can you work remotely if needed?",
    timestamp: "2025-04-05T14:45:00Z"
  },
  {
    id: "story-5",
    questionId: 6,
    answer: true,
    comment: "The company has a very inclusive culture. They celebrate diversity and have regular inclusion initiatives.",
    category: "Company Culture",
    question: "Is the company culture inclusive?",
    timestamp: "2025-04-10T11:20:00Z"
  }
];

export function CompanyProfile({ companyId = "google" }: { companyId?: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [filters, setFilters] = useState<{ category?: string; topic?: string }>({});
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  console.log('CompanyProfile - companyId:', companyId);
  
  // Get distinct categories and topics for filters
  const categories = [...new Set(questionsData.map(q => q.category).filter(Boolean))].sort();
  const topics = [...new Set(questionsData.map(q => q.topic).filter((t): t is string => typeof t === "string"))].sort();

  // Use the optimized hook for company data
  const { data: company, isLoading, error } = useCompany(companyId);

  console.log('CompanyProfile - company data:', company);
  console.log('CompanyProfile - isLoading:', isLoading);
  console.log('CompanyProfile - error:', error);

  // Filter stories based on selected category and topic
  const getFilteredStories = () => {
    const stories = company?.stories || exampleStories;
    
    return stories.filter(story => {
      const question = questionsData.find(q => q.id === story.questionId);
      if (!question) return false;
      
      if (filters.category && question.category !== filters.category) {
        return false;
      }
      
      if (filters.topic && question.topic !== filters.topic) {
        return false;
      }
      
      return true;
    });
  };

  // Format date helper function
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

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="container-custom">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-muted rounded-lg mb-4"></div>
            <div className="h-8 w-60 bg-muted rounded mb-2"></div>
            <div className="h-4 w-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    console.error('CompanyProfile - Error or no company found:', error);
    return (
      <div className="py-20 text-center">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-4">Company Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            We couldn't find information for the requested company. 
            {companyId && ` (ID: ${companyId})`}
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
            <Button asChild>
              <Link href="/explore">Explore Companies</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const redFlags = company.flags?.filter((flag) => flag.type === "red") || [];
  const greenFlags = company.flags?.filter((flag) => flag.type === "green") || [];
  const filteredStories = getFilteredStories();

  return (
    <div className="py-8 md:py-12">
      <div className="container-custom">
        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-20 w-20 rounded-lg bg-white shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src="/placeholder.svg"
                alt={`${company.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl mb-2">
                {company.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building size={16} className="text-primary" />
                  <span className="text-sm">{company.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">{company.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
              {company.linkedin_url && (
                <a 
                  href={company.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-1.5"
                >
                  <ExternalLink size={16} />
                  View on LinkedIn
                </a>
              )}
              <Button asChild>
                <Link href={`/review?company=${company.id}`}>
                  <MessageSquare size={16} className="mr-2" /> Submit Review
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs for Overview and Stories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview" className="flex-1 sm:flex-initial">Overview</TabsTrigger>
            <TabsTrigger value="stories" className="flex-1 sm:flex-initial">Employee Stories</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            {/* Review Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Review Count</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="text-primary" />
                    <span className="text-3xl font-bold">
                      {company.surveyCount || 0}
                    </span>
                    <span className="text-muted-foreground">surveys</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Green Flags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Flag className="text-success" />
                    <span className="text-3xl font-bold">{company.greenFlagCount || 0}</span>
                    <span className="text-muted-foreground">positives</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="sm:col-span-2 md:col-span-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Red Flags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Flag className="text-warning" />
                    <span className="text-3xl font-bold">{company.redFlagCount || 0}</span>
                    <span className="text-muted-foreground">concerns</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Green Flags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 md:mb-12"
            >
              <h2 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 flex items-center gap-2">
                <Flag className="text-success" />
                Green Flags
                <Badge variant="outline" className="ml-2 font-normal">
                  {greenFlags.length}
                </Badge>
              </h2>
              
              {greenFlags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {greenFlags.map((flag, index) => (
                    <motion.div
                      key={flag.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-success/5 border border-success/20 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium flex items-center gap-1.5">
                          <Flag size={16} className="text-success" />
                          {flag.text}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flag.votes} votes
                        </div>
                      </div>
                      <div className="w-full bg-success/10 rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full" 
                          style={{ width: `${flag.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-success">
                        {flag.percentage}% employees answered positively
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No green flags yet. Be the first to share positive feedback!</p>
              )}
            </motion.div>

            {/* Red Flags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <h2 className="font-poppins font-bold text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 flex items-center gap-2">
                <Flag className="text-warning" />
                Red Flags
                <Badge variant="outline" className="ml-2 font-normal">
                  {redFlags.length}
                </Badge>
              </h2>
              
              {redFlags.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {redFlags.map((flag, index) => (
                    <motion.div
                      key={flag.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-warning/5 border border-warning/20 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium flex items-center gap-1.5">
                          <Flag size={16} className="text-warning" />
                          {flag.text}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {flag.votes} votes
                        </div>
                      </div>
                      <div className="w-full bg-warning/10 rounded-full h-2">
                        <div 
                          className="bg-warning h-2 rounded-full" 
                          style={{ width: `${flag.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-warning">
                        {flag.percentage}% employees answered negatively
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No red flags yet. Share your experience to help others!</p>
              )}
            </motion.div>

            {/* CTA Section */}
            <div className="mt-12 md:mt-16 bg-muted/30 rounded-lg p-6 md:p-8 text-center">
              <h3 className="font-poppins font-bold text-lg md:text-xl mb-4">
                Do you work at {company.name}?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Help others know before they go by sharing your experience.
                All submissions are 100% anonymous.
              </p>
              <Button size={isMobile ? "default" : "lg"} asChild>
                <Link href={`/review?company=${company.id}`}>
                  <Send size={16} className="mr-1" /> Submit Your Review
                </Link>
              </Button>
            </div>
          </TabsContent>
          
          {/* Stories Tab Content */}
          <TabsContent value="stories" className="mt-6">
            <div className="mb-6">
              <h2 className="font-poppins font-bold text-xl md:text-2xl mb-4 flex items-center gap-2">
                <MessageSquare className="text-primary" />
                Employee Stories
                <Badge variant="outline" className="ml-2 font-normal">
                  {filteredStories.length}
                </Badge>
              </h2>
              
              {/* Story Filters */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter size={18} className="text-primary" />
                    Filter Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="mb-2 block">Category</Label>
                      <Select 
                        value={filters.category || "all"} 
                        onValueChange={(value) => setFilters({...filters, category: value === "all" ? undefined : value})}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((cat) => (
                            cat ? <SelectItem key={cat} value={cat}>{cat}</SelectItem> : null
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="topic" className="mb-2 block">Topic</Label>
                      <Select 
                        value={filters.topic || "all"} 
                        onValueChange={(value) => setFilters({...filters, topic: value === "all" ? undefined : value})}
                      >
                        <SelectTrigger id="topic">
                          <SelectValue placeholder="All Topics" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Topics</SelectItem>
                          {topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stories List */}
              {filteredStories.length > 0 ? (
                <div className="space-y-4">
                  {filteredStories.map((story, index) => {
                    // Find the corresponding question data
                    const questionData = questionsData.find(q => q.id === story.questionId);
                    
                    return (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card>
                          <CardHeader className="pb-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                              <CardTitle className="text-lg">
                                {story.question}
                              </CardTitle>
                              <Badge variant={story.answer ? "default" : "destructive"} className={story.answer ? "bg-green-600" : "bg-red-600"}>
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
                            <p className="text-muted-foreground italic mb-3">"{story.comment}"</p>
                            <p className="text-xs text-muted-foreground">
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
                    {(company?.stories || exampleStories).length > 0 
                      ? "No stories match the selected filters." 
                      : "No stories have been shared yet."}
                  </p>
                </div>
              )}
            </div>
            
            {/* CTA for Stories */}
            <div className="mt-8 bg-muted/30 rounded-lg p-6 text-center">
              <h3 className="font-medium mb-2">Share Your Experience</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Help others by anonymously sharing your experience at {company.name}.
              </p>
              <Button asChild>
                <Link href={`/review?company=${company.id}`}>Submit Your Review</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}