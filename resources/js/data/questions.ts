
import { CategoryType, QuestionType, TopicType } from "@/types/company";

// Categories
export const categoriesData: CategoryType[] = [
  { id: 1, name: "Compensation & Benefits" },
  { id: 2, name: "Work-Life Balance" },
  { id: 3, name: "Company Culture" },
  { id: 4, name: "Management & Leadership" },
  { id: 5, name: "Career Development" },
  { id: 6, name: "Workplace Environment" },
  { id: 7, name: "Feedback & Recognition" },
  { id: 8, name: "Collaboration & Communication" },
  { id: 9, name: "Inclusivity & Facilities" }
];

// Topics
export const topicsData: TopicType[] = [
  { 
    id: 1, 
    name: "Salary", 
    category_id: 1, 
    favor_statement: "Competitive salaries attract and retain talent.",
    favor_description: "Fair compensation is crucial for employee satisfaction and retention.",
    against_statement: "Low salaries lead to dissatisfaction.",
    against_description: "Employees may feel undervalued and seek opportunities elsewhere if salaries are not competitive.",
    status: true
  },
  { 
    id: 2, 
    name: "Benefits", 
    category_id: 1,
    favor_statement: "Comprehensive benefits support employee well-being.",
    favor_description: "Benefits like health insurance and retirement plans are essential for employee satisfaction.",
    against_statement: "Lack of benefits reduces job attractiveness.",
    against_description: "Employees may feel unsupported if essential benefits are missing.",
    status: true
  },
  { 
    id: 3, 
    name: "Flexibility", 
    category_id: 2,
    favor_statement: "Flexible work options improve work-life balance.",
    favor_description: "Employees with flexible work arrangements are often more satisfied and productive.",
    against_statement: "Lack of flexibility harms work-life balance.",
    against_description: "Rigid work schedules can lead to burnout and decreased productivity.",
    status: true
  },
  { 
    id: 4, 
    name: "Remote Work", 
    category_id: 2,
    favor_statement: "Remote work options enhance flexibility.",
    favor_description: "Remote work allows employees to balance personal and professional responsibilities.",
    against_statement: "No remote work options limit flexibility.",
    against_description: "Requiring constant office presence can be difficult for many employees.",
    status: true
  },
  { 
    id: 5, 
    name: "Culture", 
    category_id: 3,
    favor_statement: "Positive and inclusive culture fosters employee well-being.",
    favor_description: "An inclusive culture enhances collaboration and innovation.",
    against_statement: "Negative culture breeds dissatisfaction and conflict.",
    against_description: "A toxic culture can lead to employee disengagement and high turnover.",
    status: true
  },
  { 
    id: 6, 
    name: "Leadership", 
    category_id: 4,
    favor_statement: "Effective leadership inspires and supports employees.",
    favor_description: "Supportive and effective leadership boosts employee morale and productivity.",
    against_statement: "Poor leadership demotivates employees and hinders progress.",
    against_description: "Ineffective leadership can lead to a toxic work environment and high turnover.",
    status: true
  },
  { 
    id: 7, 
    name: "Growth", 
    category_id: 5,
    favor_statement: "Clear advancement opportunities motivate employees.",
    favor_description: "Employees are more motivated when they see a clear path for growth.",
    against_statement: "Lack of advancement opportunities leads to stagnation.",
    against_description: "Employees may feel stuck and unmotivated without clear growth prospects.",
    status: true
  },
  { 
    id: 8, 
    name: "Environment", 
    category_id: 6,
    favor_statement: "A safe and comfortable environment enhances productivity.",
    favor_description: "Employees perform better in a well-equipped and safe workplace.",
    against_statement: "Poor work environment affects performance.",
    against_description: "Uncomfortable or unsafe work conditions can lead to decreased productivity and morale.",
    status: true
  }
];

// Questions
export const questionsData: QuestionType[] = [
  {
    id: 1,
    question: "Does the company offer competitive salaries?",
    question_regular: "Does the company offer competitive salaries?",
    question_meme: "Does the company pay decent money?",
    topic_id: 1,
    category: "Compensation & Benefits",
    topic: "Salary",
    positiveGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW40YXd3cTRiNjNvNXF5a3lxcnhocTJnNmVhNm0wN3FkMTdybDUxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jn83xcTx4KnoeP5mRv/giphy.gif",
    negativeGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW8yYmw1ZHBncWpoajVvdmZqbmEzYzNyZjg0ZXI0dzB2OG0wMGppciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/RJzv5gG13bFsER6BbK/giphy.gif",
    favorStatement: "Competitive salaries attract and retain talent.",
    favorDescription: "Fair compensation is crucial for employee satisfaction and retention.",
    againstStatement: "Low salaries lead to dissatisfaction.",
    againstDescription: "Employees may feel undervalued and seek opportunities elsewhere if salaries are not competitive.",
    status: true
  },
  {
    id: 2,
    question: "Are there any performance-based bonuses?",
    question_regular: "Are there any performance-based bonuses?",
    question_meme: "Can you earn extra cash for good work?",
    topic_id: 1,
    category: "Compensation & Benefits",
    topic: "Salary",
    positiveGif: "https://media.giphy.com/media/3o6gDWzmAzrpi5DQU8/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3o7WIrzShiwnLUYAUw/giphy.gif",
    favorStatement: "Performance bonuses reward and motivate employees.",
    favorDescription: "Bonuses linked to performance can drive productivity and reward high achievers.",
    againstStatement: "No bonuses can reduce motivation.",
    againstDescription: "Without performance incentives, employees may feel less motivated to excel.",
    status: true
  },
  {
    id: 3,
    question: "Are health and wellness benefits provided?",
    question_regular: "Are health and wellness benefits provided?",
    question_meme: "Do they care about your health?",
    topic_id: 2,
    category: "Compensation & Benefits",
    topic: "Benefits",
    positiveGif: "https://media.giphy.com/media/3ohhwG9QWQDUcbSzrG/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3oz8xLlw6GHVfokaNW/giphy.gif",
    favorStatement: "Health and wellness benefits support employee well-being.",
    favorDescription: "Good health benefits are essential for employee welfare and job satisfaction.",
    againstStatement: "Lack of health benefits creates stress.",
    againstDescription: "Without adequate health coverage, employees may worry about healthcare costs.",
    status: true
  },
  {
    id: 4,
    question: "Is there flexibility in work hours?",
    question_regular: "Is there flexibility in work hours?",
    question_meme: "Can you choose when to work?",
    topic_id: 3,
    category: "Work-Life Balance",
    topic: "Flexibility",
    positiveGif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    favorStatement: "Flexible work hours improve work-life balance.",
    favorDescription: "Flexibility allows employees to manage personal and professional responsibilities.",
    againstStatement: "Rigid hours restrict employees' lives.",
    againstDescription: "Strict schedules can make it difficult to manage personal commitments.",
    status: true
  },
  {
    id: 5,
    question: "Can you work remotely if needed?",
    question_regular: "Can you work remotely if needed?",
    question_meme: "Can you work in your pajamas?",
    topic_id: 4,
    category: "Work-Life Balance",
    topic: "Remote Work",
    positiveGif: "https://media.giphy.com/media/ZB2bR9FgoqXsDTIAJ0/giphy.gif",
    negativeGif: "https://media.giphy.com/media/26ybwL1BgROUXbCdG/giphy.gif",
    favorStatement: "Remote work options provide flexibility.",
    favorDescription: "Being able to work from home or other locations offers valuable flexibility.",
    againstStatement: "No remote options can be limiting.",
    againstDescription: "Requiring constant office presence can be restrictive for employees.",
    status: true
  },
  {
    id: 6,
    question: "Is the company culture inclusive?",
    question_regular: "Is the company culture inclusive?",
    question_meme: "Does everyone feel welcome?",
    topic_id: 5,
    category: "Company Culture",
    topic: "Culture",
    positiveGif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyE/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3o7WIrzShiwnLUYAUw/giphy.gif",
    favorStatement: "Inclusive cultures foster belonging.",
    favorDescription: "When everyone feels included, collaboration and innovation flourish.",
    againstStatement: "Non-inclusive cultures alienate people.",
    againstDescription: "Exclusionary environments can make people feel unwelcome and undervalued.",
    status: true
  },
  {
    id: 7,
    question: "Is the management supportive?",
    question_regular: "Is the management supportive?",
    question_meme: "Do your bosses have your back?",
    topic_id: 6,
    category: "Management & Leadership",
    topic: "Leadership",
    positiveGif: "https://media.giphy.com/media/xT9DPIBYf0pAviBLzO/giphy.gif",
    negativeGif: "https://media.giphy.com/media/xT9DPjOy0lxRvRGNXi/giphy.gif",
    favorStatement: "Supportive management empowers employees.",
    favorDescription: "Good managers help their teams succeed and develop professionally.",
    againstStatement: "Unsupportive management undermines morale.",
    againstDescription: "Poor management can lead to frustration and decreased job satisfaction.",
    status: true
  },
  {
    id: 8,
    question: "Are there opportunities for career growth?",
    question_regular: "Are there opportunities for career growth?",
    question_meme: "Can you move up the ladder?",
    topic_id: 7,
    category: "Career Development",
    topic: "Growth",
    positiveGif: "https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif",
    favorStatement: "Growth opportunities motivate employees.",
    favorDescription: "Clear career paths keep employees engaged and loyal.",
    againstStatement: "Lack of growth leads to stagnation.",
    againstDescription: "Without advancement opportunities, talented employees may look elsewhere.",
    status: true
  },
  {
    id: 9,
    question: "Is the workplace safe and healthy?",
    question_regular: "Is the workplace safe and healthy?",
    question_meme: "Is it a safe place to work?",
    topic_id: 8,
    category: "Workplace Environment",
    topic: "Environment",
    positiveGif: "https://media.giphy.com/media/3o7TKSHKzhZURtibFS/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif",
    favorStatement: "Safe workplaces protect employees.",
    favorDescription: "Safety standards ensure employee well-being and prevent accidents.",
    againstStatement: "Unsafe conditions endanger employees.",
    againstDescription: "Neglecting safety can lead to injuries and harm employee health.",
    status: true
  },
  {
    id: 10,
    question: "Is there a significant female percentage in the workplace?",
    question_regular: "Is there a significant female percentage in the workplace?",
    question_meme: "Is the workplace diverse in terms of gender?",
    topic_id: 5,
    category: "Inclusivity & Facilities",
    topic: "Culture",
    positiveGif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyE/giphy.gif",
    negativeGif: "https://media.giphy.com/media/3o7WIrzShiwnLUYAUw/giphy.gif",
    favorStatement: "Gender diversity enhances the workplace.",
    favorDescription: "A balanced gender representation brings diverse perspectives and ideas.",
    againstStatement: "Gender imbalance may indicate issues.",
    againstDescription: "A lack of gender diversity might suggest systemic barriers or biases.",
    status: true
  }
];

// Helper functions
export function getDistinctCategories(): string[] {
  return [...new Set(questionsData.map(question => question.category))].sort();
}

export function getDistinctTopics(): string[] {
  return [...new Set(questionsData.map(question => question.topic))].sort();
}

export function getQuestionsByCategory(category: string): QuestionType[] {
  return questionsData.filter(question => question.category === category);
}

export function getQuestionsByTopic(topic: string): QuestionType[] {
  return questionsData.filter(question => question.topic === topic);
}

export function getQuestionById(id: number): QuestionType | undefined {
  return questionsData.find(question => question.id === id);
}

export function getCategoryById(id: number): CategoryType | undefined {
  return categoriesData.find(category => category.id === id);
}

export function getTopicById(id: number): TopicType | undefined {
  return topicsData.find(topic => topic.id === id);
}

export function getCategoryByName(name: string): CategoryType | undefined {
  return categoriesData.find(category => category.name === name);
}

export function getTopicByName(name: string): TopicType | undefined {
  return topicsData.find(topic => topic.name === name);
}
