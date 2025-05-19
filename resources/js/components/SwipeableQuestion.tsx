
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType } from "@/types/company";
import { Card } from "@/components/ui/card";

interface SwipeableQuestionProps {
  question: QuestionType;
  onSwipe: (id: number, value: boolean, comment?: string) => void;
}

export function SwipeableQuestion({ 
  question, 
  onSwipe 
}: SwipeableQuestionProps) {
  const [comment, setComment] = useState("");
  const [dragX, setDragX] = useState(0);
  const [showGif, setShowGif] = useState<"positive" | "negative" | null>(null);
  const [gifLoaded, setGifLoaded] = useState({ positive: false, negative: false });
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Get the appropriate GIF URLs with fallbacks
  const positiveGif = question.positiveGif || 
    question.favour_gif || 
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW40YXd3cTRiNjNvNXF5a3lxcnhocTJnNmVhNm0wN3FkMTdybDUxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jn83xcTx4KnoeP5mRv/giphy.gif";
  
  const negativeGif = question.negativeGif || 
    question.against_gif || 
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW8yYmw1ZHBncWpoajVvdmZqbmEzYzNyZjg0ZXI0dzB2OG0wMGppciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RJzv5gG13bFsER6BbK/giphy.gif";

  // Preload GIFs
  useEffect(() => {
    const preloadImage = (url: string, type: "positive" | "negative") => {
      const img = new Image();
      img.onload = () => {
        setGifLoaded(prev => ({ ...prev, [type]: true }));
      };
      img.onerror = () => {
        console.error(`Failed to load ${type} GIF`);
      };
      img.src = url;
    };

    preloadImage(positiveGif, "positive");
    preloadImage(negativeGif, "negative");
  }, [positiveGif, negativeGif]);

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    setDragX(info.offset.x);
    
    // Show GIFs based on drag direction
    if (info.offset.x > 80) {
      setShowGif("positive");
    } else if (info.offset.x < -80) {
      setShowGif("negative");
    } else {
      setShowGif(null);
    }
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }, velocity: { x: number } }) => {
    const threshold = 100;
    const velocityThreshold = 500;
    const isSwipedRight = info.offset.x > threshold || (info.velocity.x > velocityThreshold);
    const isSwipedLeft = info.offset.x < -threshold || (info.velocity.x < -velocityThreshold);
    
    if (isSwipedRight) {
      // Animate to the right edge before triggering the callback
      controls.start({ 
        x: window.innerWidth,
        transition: { duration: 0.3 } 
      }).then(() => {
        // Swiped right - YES
        onSwipe(question.id, true, comment);
      });
    } else if (isSwipedLeft) {
      // Animate to the left edge before triggering the callback
      controls.start({ 
        x: -window.innerWidth,
        transition: { duration: 0.3 } 
      }).then(() => {
        // Swiped left - NO
        onSwipe(question.id, false, comment);
      });
    } else {
      // Not enough to trigger a swipe, reset position
      controls.start({ 
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 } 
      });
      setShowGif(null);
      setDragX(0);
    }
  };

  const getRotation = () => {
    return dragX / 20;
  };

  const getCardStyle = () => {
    let backgroundColor = "bg-card";
    
    if (dragX > 50) {
      backgroundColor = "bg-green-50 dark:bg-green-900/20";
    } else if (dragX < -50) {
      backgroundColor = "bg-red-50 dark:bg-red-900/20";
    }
    
    return backgroundColor;
  };

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0 }}
        whileTap={{ cursor: "grabbing" }}
        className={`${getCardStyle()} rounded-2xl shadow-lg border border-border p-6 cursor-grab active:cursor-grabbing touch-none w-full transition-colors duration-200`}
        style={{ 
          rotate: getRotation(), 
          touchAction: "none" // Prevent browser's default touch behavior
        }}
      >
        <div className="mb-3 text-muted-foreground text-xs font-medium uppercase tracking-wide">
          {question.category} • {question.topic}
        </div>
        
        <h3 className="text-xl font-semibold mb-6">
          {question.question || question.question_regular || question.question_meme}
        </h3>
        
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
            <span className="text-red-700 dark:text-red-400">No</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-700 dark:text-green-400">Yes</span>
            <div className="w-3 h-3 rounded-full ml-2 bg-green-500"></div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Share your experience (optional)</p>
          <Textarea
            placeholder="Tell your story about this aspect of the company..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none text-sm min-h-[100px]"
          />
        </div>
        
        {question.favorStatement && (
          <div className="my-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
            <h4 className="text-sm font-semibold text-green-700 dark:text-green-400">{question.favorStatement}</h4>
            <p className="text-xs text-green-600 dark:text-green-500/80 mt-1">{question.favorDescription}</p>
          </div>
        )}
        
        {question.againstStatement && (
          <div className="my-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">{question.againstStatement}</h4>
            <p className="text-xs text-red-600 dark:text-red-500/80 mt-1">{question.againstDescription}</p>
          </div>
        )}
      </motion.div>

      {/* GIF Display Containers - Positioned better with fixed dimensions */}
      {showGif === "positive" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-[5%] right-[-15px] w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-green-500 shadow-lg z-10"
        >
          <div className="w-full h-full bg-green-100 flex items-center justify-center">
            <img
              src={positiveGif}
              alt="Yes"
              className="w-full h-full object-cover"
              style={{ display: gifLoaded.positive ? "block" : "none" }}
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif";
              }}
            />
            {!gifLoaded.positive && (
              <div className="animate-pulse flex-1 h-full bg-green-200"></div>
            )}
          </div>
        </motion.div>
      )}
      
      {showGif === "negative" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-[5%] left-[-15px] w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-red-500 shadow-lg z-10"
        >
          <div className="w-full h-full bg-red-100 flex items-center justify-center">
            <img
              src={negativeGif}
              alt="No"
              className="w-full h-full object-cover"
              style={{ display: gifLoaded.negative ? "block" : "none" }}
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif";
              }}
            />
            {!gifLoaded.negative && (
              <div className="animate-pulse flex-1 h-full bg-red-200"></div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* More visible instruction indicator */}
      <div className="absolute -bottom-4 left-0 w-full flex justify-center">
        <div className="text-foreground text-sm bg-background px-4 py-2 rounded-full shadow-md border border-border font-medium flex items-center">
          <motion.div 
            animate={{ x: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mr-1 text-red-500"
          >
            ←
          </motion.div>
          Swipe left for No, right for Yes
          <motion.div 
            animate={{ x: [3, -3, 3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-1 text-green-500"
          >
            →
          </motion.div>
        </div>
      </div>
    </div>
  );
}
