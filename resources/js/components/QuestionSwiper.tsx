
import React, { useState } from "react";
import { SwipeableQuestion } from "@/components/SwipeableQuestion";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuestionType, SurveyQuestionType } from "@/types/company";

export interface QuestionAnswer {
  questionId: number;
  answer: boolean;
  comment?: string;
}

interface QuestionSwiperProps {
  questions: QuestionType[];
  onAnswerAll: (answers: SurveyQuestionType[]) => void;
}

export function QuestionSwiper({ questions, onAnswerAll }: QuestionSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<SurveyQuestionType[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();

  const handleSwipe = (id: number, value: boolean, comment?: string) => {
    if (isTransitioning) return; // Prevent multiple rapid swipes
    
    setIsTransitioning(true);
    
    const newAnswer: SurveyQuestionType = {
      question_id: id,
      is_yes: value,
      comment: comment?.trim() || undefined,
      additional_responses: []
    };
    
    setAnswers((prev) => [...prev, newAnswer]);
    setDirection(value ? "right" : "left");
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsCompleted(true);
      }
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const handleButtonSwipe = (value: boolean) => {
    if (isTransitioning || currentIndex >= questions.length) return;
    
    handleSwipe(questions[currentIndex].id, value);
  };

  const handleComplete = () => {
    onAnswerAll(answers);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setIsCompleted(false);
    setDirection(null);
    setIsTransitioning(false);
  };

  // Calculate progress percentage
  const progressPercentage = (answers.length / questions.length) * 100;

  // Count comments
  const commentCount = answers.filter(a => a.comment && a.comment.trim().length > 0).length;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-8 text-center max-w-md mx-auto shadow-md"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">All Done!</h3>
        <p className="text-muted-foreground mb-2">
          Thank you for answering all the questions. Your feedback is valuable!
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm mb-6">
          <MessageCircle size={16} className="text-primary" />
          <span>{commentCount} {commentCount === 1 ? 'story' : 'stories'} shared</span>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button onClick={handleComplete} className="bg-primary text-primary-foreground">
            Submit Answers
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Start Over
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <div className="h-2 bg-muted rounded-full mb-2">
          <motion.div
            className="h-2 bg-primary rounded-full"
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ 
              opacity: 0, 
              x: direction === "right" ? -300 : direction === "left" ? 300 : 0
            }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ 
              opacity: 0, 
              x: direction === "right" ? 300 : direction === "left" ? -300 : 0,
              position: "absolute"
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="w-full"
          >
            <SwipeableQuestion
              question={questions[currentIndex]}
              onSwipe={handleSwipe}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Swapped button positions: No on left, Yes on right */}
      <div className="flex justify-center gap-4 mt-12">
        <Button 
          onClick={() => handleButtonSwipe(false)} 
          variant="outline"
          className="px-6 py-5 text-base bg-red-600 hover:bg-red-700 text-white border-red-700 hover:text-white dark:bg-red-700 dark:hover:bg-red-800 rounded-xl transition-all shadow-md flex-1"
          disabled={isTransitioning}
        >
          <ThumbsDown className="mr-2" size={20} />
          No
        </Button>
        
        <Button 
          onClick={() => handleButtonSwipe(true)} 
          className="px-6 py-5 text-base bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700 rounded-xl transition-all shadow-md flex-1"
          disabled={isTransitioning}
        >
          <ThumbsUp className="mr-2" size={20} />
          Yes
        </Button>
      </div>
      
      {/* Additional visual instruction */}
      <div className="mt-4 text-center">
        <p className="text-muted-foreground text-sm italic">
          Use the buttons above or swipe the card to answer
        </p>
      </div>
    </div>
  );
}