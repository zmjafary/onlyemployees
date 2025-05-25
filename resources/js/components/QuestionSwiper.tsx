import { SwipeableQuestion } from "@/components/SwipeableQuestion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { QuestionType, SurveyQuestionType } from "@/types/company";
import { AnimatePresence, motion } from "framer-motion";
import { Check, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

export interface QuestionAnswer {
  questionId: number;
  answer: boolean;
  comment?: string;
}

interface QuestionSwiperProps {
  questions: QuestionType[];
  onAnswerAll: (answers: SurveyQuestionType[]) => void;
  onAnswersChange?: (answers: Record<number, SurveyQuestionType>) => void;
}

export function QuestionSwiper({ questions, onAnswerAll, onAnswersChange }: QuestionSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SurveyQuestionType>>({});
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();

  // Reset state when questions change
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setDirection(null);
    setIsTransitioning(false);
  }, [questions]);

  // Notify parent of answers changes
  useEffect(() => {
    if (onAnswersChange) {
      onAnswersChange(answers);
    }
  }, [answers, onAnswersChange]);

  const handleSwipe = (id: number, value: boolean, comment?: string) => {
    if (isTransitioning) return;
    
    console.log('Handling swipe:', { id, value, comment });
    setIsTransitioning(true);
    
    const newAnswer: SurveyQuestionType = {
      question_id: id,
      is_yes: value,
      comment: comment?.trim() || undefined
    };
    
    setAnswers(prev => {
      const updated = { ...prev, [id]: newAnswer };
      console.log('Updated answers:', updated);
      return updated;
    });
    
    setDirection(value ? "right" : "left");
    
    // Short delay to allow animation to start
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      } else {
        setIsCompleted(true);
        setIsTransitioning(false);
      }
    }, 200);
  };

  const handleButtonSwipe = (value: boolean) => {
    if (isTransitioning || currentIndex >= questions.length) return;
    
    console.log('Button swipe:', { value, currentIndex, questionId: questions[currentIndex]?.id });
    handleSwipe(questions[currentIndex].id, value);
  };

  const handleComplete = () => {
    const answersArray = Object.values(answers);
    console.log('Completing survey with answers:', answersArray);
    
    // Ensure we only pass answers that have been explicitly answered
    const validAnswers = answersArray.filter(answer => 
      answer.is_yes !== undefined && answer.is_yes !== null
    );
    
    console.log('Valid answers to submit:', validAnswers);
    onAnswerAll(validAnswers);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setDirection(null);
    setIsTransitioning(false);
  };

  // Calculate progress percentage based on answered questions
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Count comments
  const commentCount = Object.values(answers).filter(a => a.comment && a.comment.trim().length > 0).length;

  if (questions.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-4 sm:p-8 text-center max-w-md mx-auto shadow-md">
        <p className="text-muted-foreground">No questions available for the selected category.</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-4 sm:p-8 text-center max-w-md mx-auto shadow-md"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">All Done!</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-2">
          Thank you for answering {answeredCount} out of {questions.length} questions. Your feedback is valuable!
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm mb-6">
          <MessageCircle size={16} className="text-primary" />
          <span>{commentCount} {commentCount === 1 ? 'story' : 'stories'} shared</span>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button onClick={handleComplete} className="bg-primary text-primary-foreground">
            Submit {answeredCount} Answers
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Start Over
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-0">
      <div className="mb-4 sm:mb-8">
        <div className="h-2 bg-muted rounded-full mb-2">
          <motion.div
            className="h-2 bg-primary rounded-full"
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-muted-foreground">
            {answeredCount} answered ({Math.round(progressPercentage)}%)
          </span>
        </div>
      </div>

      <div className="relative min-h-[350px] sm:min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`question-${currentIndex}-${questions[currentIndex]?.id}`}
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
            {questions[currentIndex] && (
              <SwipeableQuestion
                question={questions[currentIndex]}
                onSwipe={handleSwipe}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="my-4 text-center text-sm text-muted-foreground">
        <p>Swipe ← or → to answer</p>
      </div>

      <div className="flex justify-center gap-3 sm:gap-4">
        <Button 
          onClick={() => handleButtonSwipe(false)} 
          variant="outline"
          className="px-3 sm:px-6 py-4 sm:py-5 text-sm sm:text-base bg-transparent hover:bg-red-50/50 dark:hover:bg-red-900/20 text-foreground border-border hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-all duration-200 flex-1 group"
          disabled={isTransitioning}
        >
          <ThumbsDown className="mr-1 sm:mr-2 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-200" size={isMobile ? 16 : 20} />
          No
        </Button>
        
        <Button 
          onClick={() => handleButtonSwipe(true)} 
          variant="outline"
          className="px-3 sm:px-6 py-4 sm:py-5 text-sm sm:text-base bg-transparent hover:bg-green-50/50 dark:hover:bg-green-900/20 text-foreground border-border hover:border-green-300 dark:hover:border-green-700 hover:text-green-600 dark:hover:text-green-400 rounded-xl transition-all duration-200 flex-1 group"
          disabled={isTransitioning}
        >
          <ThumbsUp className="mr-1 sm:mr-2 text-green-600 dark:text-green-500 group-hover:scale-110 transition-transform duration-200" size={isMobile ? 16 : 20} />
          Yes
        </Button>
      </div>
      
      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground italic">
          Use the buttons above or swipe the card to answer
        </p>
      </div>
    </div>
  );
}
