import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType } from "@/types/company";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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

  // Calculate GIF size based on screen size
  const gifSize = isMobile ? 80 : 120;
  // Adjust position for mobile
  const gifTopPosition = isMobile ? "2%" : "5%";

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
        className={`${getCardStyle()} rounded-xl border border-border shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] p-4 cursor-grab active:cursor-grabbing w-full transition-colors duration-200`}
        style={{ rotate: dragX / 20, touchAction: "none" }}
      >
        {/* Question Metadata */}
        <div className="text-xs text-muted-foreground mb-2">
          {question.category} • {question.topic}
        </div>
        
        {/* Main Question */}
        <h3 className="text-lg font-medium mb-4 leading-snug">
          {question.question || question.question_regular || question.question_meme}
        </h3>
        
        {/* Swipe Indicators */}
        <div className="flex justify-between text-sm mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
            <span className="text-red-500">No</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500">Yes</span>
            <div className="w-2 h-2 rounded-full ml-2 bg-green-500"></div>
          </div>
        </div>
        
        {/* Optional Comment */}
        <div className="mb-4">
          <Textarea
            placeholder="Share your experience (optional)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none text-sm min-h-[80px] bg-background/50"
          />
        </div>
        
        {/* Additional Info (only shown if exists) */}
        {question.favorStatement && (
          <div className="p-3 bg-green-50/50 dark:bg-green-900/10 rounded-lg mb-3">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-400">
              {question.favorStatement}
            </h4>
          </div>
        )}
        
        {question.againstStatement && (
          <div className="p-3 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
            <h4 className="text-sm font-medium text-red-700 dark:text-red-400">
              {question.againstStatement}
            </h4>
          </div>
        )}
      </motion.div>

      {/* GIF Display Containers - Adjusted for mobile */}
      {showGif === "positive" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute"
          style={{
            top: gifTopPosition,
            right: "-10px",
            width: `${gifSize}px`,
            height: `${gifSize}px`,
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #22c55e", // green-500
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            zIndex: 10
          }}
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
          className="absolute"
          style={{
            top: gifTopPosition,
            left: "-10px",
            width: `${gifSize}px`,
            height: `${gifSize}px`,
            borderRadius: "50%",
            overflow: "hidden",
            border: "4px solid #ef4444", // red-500
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            zIndex: 10
          }}
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
    </div>
  );
}
