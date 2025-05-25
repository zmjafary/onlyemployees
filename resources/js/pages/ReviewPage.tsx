import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { getCompanyById } from "@/services/companyService";
import { getQuestions, getCountries, getCities, getRoles, getDepartments, createSurvey, createSurveyAnswers } from "@/services/supabaseService";
import { CompanyType, QuestionType, CountryType, CityType, RoleType, DepartmentType, SurveyQuestionType } from "@/types/company";
import { Building, ArrowLeft, Check, ChevronRight, Smartphone, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionSwiper } from "@/components/QuestionSwiper";
import { QuestionFilter } from "@/components/QuestionFilter";
import { Link } from '@inertiajs/react';

export default function ReviewPage({ companyId = "" }: { companyId?: string }) {
  const { toast } = useToast();
    
  const [company, setCompany] = useState<CompanyType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, SurveyQuestionType>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"user-info" | "mode-select" | "questions" | "swipe" | "complete">("user-info");
  const [reviewMode, setReviewMode] = useState<"traditional" | "swipe">("traditional");
  const [showQuestionFilter, setShowQuestionFilter] = useState(false);
  
  // User information
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isEmployed, setIsEmployed] = useState<boolean | null>(null);
  const [employedFromDate, setEmployedFromDate] = useState("");
  const [employedToDate, setEmployedToDate] = useState("");
  const [countryId, setCountryId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [roleId, setRoleId] = useState<number | null>(null);
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [experience, setExperience] = useState("");
  
  // Question filtering
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  
  // Reference data
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  
  const answeredCount = Object.keys(answers).length;
  const progress = step === "questions" || step === "swipe" ? 
    (answeredCount / filteredQuestions.length) * 100 : 
    step === "complete" ? 100 : 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (companyId) {
          const companyData = await getCompanyById(companyId);
          setCompany(companyData || null);
        }
        
        const [questionsData, countriesData, citiesData, rolesData, departmentsData] = await Promise.all([
          getQuestions(),
          getCountries(),
          getCities(),
          getRoles(),
          getDepartments()
        ]);
        
        setQuestions(questionsData);
        setFilteredQuestions(questionsData);
        setCountries(countriesData);
        setCities(citiesData);
        setRoles(rolesData);
        setDepartments(departmentsData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load review form data",
          variant: "destructive",
        });
      }
    };
    
    fetchData();
  }, [companyId, toast]);

  // Filter cities based on selected country
  useEffect(() => {
    if (countryId === null) {
      setFilteredCities(cities);
    } else {
      setFilteredCities(cities.filter(city => city.country_id === countryId));
    }
    setCityId(null);
  }, [countryId, cities]);

  // Filter questions based on selected categories and topics
  useEffect(() => {
    let filtered = questions;
    
    if (selectedCategories.length > 0) {
      // For now, filter by question content since we don't have category names
      filtered = filtered.filter(q => selectedCategories.some(cat => 
        q.question.toLowerCase().includes(cat.toLowerCase())
      ));
    }
    
    if (selectedTopics.length > 0) {
      // For now, filter by question content since we don't have topic names
      filtered = filtered.filter(q => selectedTopics.some(topic => 
        q.question.toLowerCase().includes(topic.toLowerCase())
      ));
    }
    
    setFilteredQuestions(filtered);
    setCurrentQuestionIndex(0);
    
    // Clear answers for questions that are no longer in the filtered set
    setAnswers(prevAnswers => {
      const filteredQuestionIds = new Set(filtered.map(q => q.id));
      const newAnswers: Record<number, SurveyQuestionType> = {};
      
      Object.entries(prevAnswers).forEach(([questionId, answer]) => {
        if (filteredQuestionIds.has(parseInt(questionId))) {
          newAnswers[parseInt(questionId)] = answer;
        }
      });
      
      return newAnswers;
    });
  }, [questions, selectedCategories, selectedTopics]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleUserInfoSubmit = () => {
    if (!roleId) {
      toast({
        title: "Missing Information",
        description: "Please select your role before continuing",
        variant: "destructive",
      });
      return;
    }
    setStep("mode-select");
  };

  const handleModeSelect = (mode: "traditional" | "swipe") => {
    setReviewMode(mode);
    setStep(mode === "swipe" ? "swipe" : "questions");
  };

  const handleSwipeAnswersChange = (swipeAnswers: Record<number, SurveyQuestionType>) => {
    console.log('Received swipe answers change:', swipeAnswers);
    setAnswers(swipeAnswers);
  };

  const handleSwipeAnswers = (swipeAnswers: SurveyQuestionType[]) => {
    console.log('Received swipe answers for submission:', swipeAnswers);
    
    const validAnswers = swipeAnswers.filter(answer => 
      answer.question_id && 
      answer.is_yes !== undefined && 
      answer.is_yes !== null
    );
    
    console.log('Valid swipe answers to submit:', validAnswers);
    
    if (validAnswers.length === 0) {
      toast({
        title: "No Answers",
        description: "Please answer at least one question before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    handleSubmit(validAnswers);
  };

  const handleAnswerChange = (questionId: number, isYes: boolean, comment?: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        question_id: questionId,
        is_yes: isYes,
        comment: comment || undefined
      }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async (providedAnswers?: SurveyQuestionType[]) => {
    if (!company) {
      toast({
        title: "Error",
        description: "Company information is missing",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create survey
      const surveyData = {
        company_id: company.id,
        city_id: cityId ?? undefined,
        country_id: countryId ?? undefined,
        role_id: roleId ?? undefined,
        department_id: departmentId ?? undefined,
        is_anonymous: isAnonymous,
        is_employed: isEmployed || false,
        employed_from_date: employedFromDate || undefined,
        employed_to_date: employedToDate || undefined
      };
      
      console.log('Creating survey with data:', surveyData);
      const surveyId = await createSurvey(surveyData);
      console.log('Survey created with ID:', surveyId);
      
      // Create survey answers
      const answersToSubmit = providedAnswers || Object.values(answers);
      console.log('Answers to submit:', answersToSubmit);
      
      const validAnswersData = answersToSubmit
        .filter(answer => 
          answer.question_id && 
          answer.is_yes !== undefined && 
          answer.is_yes !== null
        )
        .map(answer => ({
          survey_id: surveyId,
          question_id: answer.question_id,
          is_yes: answer.is_yes,
          comment: answer.comment || undefined
        }));
      
      console.log('Final answers data to submit:', validAnswersData);
      
      if (validAnswersData.length > 0) {
        await createSurveyAnswers(validAnswersData);
        console.log('Survey answers created successfully');
      } else {
        console.warn('No valid answers to submit');
      }
      
      setStep("complete");
      
      toast({
        title: "Review Submitted",
        description: `Thank you for sharing your experience! You answered ${validAnswersData.length} questions.`,
      });
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!companyId) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No Company Selected</h2>
        <p className="mb-6 text-muted-foreground">Please select a company to review.</p>
        <Button>
          <Link href="/explore">Explore Companies</Link> 
        </Button>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Review Submitted!</h2>
          <p className="mb-6 text-muted-foreground">
            Thank you for sharing your experience. Your review will help others make informed decisions about {company?.name}.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              <Link href="/explore">Explore More Companies</Link> 
            </Button>
            <Button>
              <Link href={`/company/${companyId}`}>View Company Profile</Link> 
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const displayName = company?.name || "Unknown Company";

  return (
    <div className="py-8 md:py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
              <Link href={`/company/${companyId}`}>Explore Companies</Link> 
          </Button>
          
          {company && (
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <Building className="text-primary" size={20} />
              </div>
              <div>
                <h1 className="font-poppins font-bold text-2xl md:text-3xl">
                  Review {displayName}
                </h1>
                <p className="text-muted-foreground">
                  Help others know before they go
                </p>
              </div>
            </div>
          )}
          
          {(step === "questions" || step === "swipe") && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress ({answeredCount}/{filteredQuestions.length} answered)</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === "user-info" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle className="font-poppins font-semibold text-xl flex items-center">
                    <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                      1
                    </span>
                    Company & Role Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={isAnonymous}
                      onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                    />
                    <Label htmlFor="anonymous" className="text-sm font-medium">
                      Submit this review anonymously
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                      <Select value={countryId?.toString() || ""} onValueChange={(value) => setCountryId(value ? parseInt(value) : null)}>
                        <SelectTrigger id="country" className="mt-1.5">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id.toString()}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">City</Label>
                      <Select value={cityId?.toString() || ""} onValueChange={(value) => setCityId(value ? parseInt(value) : null)}>
                        <SelectTrigger id="city" className="mt-1.5">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredCities.map((city) => (
                            <SelectItem key={city.id} value={city.id.toString()}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">Your Role *</Label>
                      <Select value={roleId?.toString() || ""} onValueChange={(value) => setRoleId(value ? parseInt(value) : null)}>
                        <SelectTrigger id="role" className="mt-1.5">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                      <Select value={departmentId?.toString() || ""} onValueChange={(value) => setDepartmentId(value ? parseInt(value) : null)}>
                        <SelectTrigger id="department" className="mt-1.5">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((department) => (
                            <SelectItem key={department.id} value={department.id.toString()}>
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-sm font-medium">Experience Level</Label>
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger id="experience" className="mt-1.5">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry-level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Employment Status</Label>
                    <div className="grid grid-cols-2 gap-4 mt-1.5 text-sm">
                      <div 
                        className={`border rounded-md p-2 cursor-pointer transition-all ${
                          isEmployed === true 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => setIsEmployed(true)}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            isEmployed === true ? "bg-primary" : "bg-muted"
                          }`}></div>
                          <span>Currently Employed</span>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-md p-2 cursor-pointer transition-all ${
                          isEmployed === false 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-muted-foreground"
                        }`}
                        onClick={() => setIsEmployed(false)}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            isEmployed === false ? "bg-primary" : "bg-muted"
                          }`}></div>
                          <span>Former Employee</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-sm font-medium">
                        Employment Start
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        className="mt-1.5"
                        value={employedFromDate}
                        onChange={(e) => setEmployedFromDate(e.target.value)}
                      />
                    </div>
                    {isEmployed === false && (
                      <div>
                        <Label htmlFor="endDate" className="text-sm font-medium">Employment End</Label>
                        <Input
                          id="endDate"
                          type="date"
                          className="mt-1.5"
                          value={employedToDate}
                          onChange={(e) => setEmployedToDate(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button onClick={handleUserInfoSubmit} className="bg-primary">
                      Continue to Survey
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "mode-select" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Review Style</CardTitle>
                  <p className="text-muted-foreground">
                    Pick the way you'd like to share your experience
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handleModeSelect("swipe")}
                      className="h-32 flex flex-col items-center justify-center space-y-2 hover:border-primary"
                    >
                      <Smartphone className="h-8 w-8 text-primary" />
                      <div className="text-center">
                        <div className="font-semibold">Swipe Cards</div>
                        <div className="text-sm text-muted-foreground">Quick & fun with GIFs</div>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleModeSelect("traditional")}
                      className="h-32 flex flex-col items-center justify-center space-y-2 hover:border-primary"
                    >
                      <ChevronRight className="h-8 w-8 text-primary" />
                      <div className="text-center">
                        <div className="font-semibold">Traditional Form</div>
                        <div className="text-sm text-muted-foreground">Step by step</div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep("user-info")}>
                      Back to Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === "swipe" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-4 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowQuestionFilter(!showQuestionFilter)}
                  className="flex items-center gap-2"
                >
                  <Filter size={16} />
                  Filter Questions
                </Button>
                
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || answeredCount === 0}
                  variant="secondary"
                >
                  {isSubmitting ? "Submitting..." : `Submit ${answeredCount} Answers`}
                </Button>
              </div>
              
              {showQuestionFilter && (
                <QuestionFilter
                  selectedCategories={selectedCategories}
                  selectedTopics={selectedTopics}
                  onCategoryChange={setSelectedCategories}
                  onTopicChange={setSelectedTopics}
                />
              )}
              
              <QuestionSwiper
                questions={filteredQuestions}
                onAnswerAll={handleSwipeAnswers}
                onAnswersChange={handleSwipeAnswersChange}
              />
            </motion.div>
          )}

          {step === "questions" && currentQuestion && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-4 justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowQuestionFilter(!showQuestionFilter)}
                  className="flex items-center gap-2"
                >
                  <Filter size={16} />
                  Filter Questions
                </Button>
                
                <Button
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting || answeredCount === 0}
                  variant="secondary"
                >
                  {isSubmitting ? "Submitting..." : `Submit ${answeredCount} Answers`}
                </Button>
              </div>
              
              {showQuestionFilter && (
                <QuestionFilter
                  selectedCategories={selectedCategories}
                  selectedTopics={selectedTopics}
                  onCategoryChange={setSelectedCategories}
                  onTopicChange={setSelectedTopics}
                />
              )}
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">
                      Question {currentQuestionIndex + 1}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {currentQuestionIndex + 1} of {filteredQuestions.length}
                      {answers[currentQuestion.id] && " (Answered)"}
                    </span>
                  </div>
                  <CardTitle className="text-xl md:text-2xl">
                    {currentQuestion.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={answers[currentQuestion.id]?.is_yes === true ? "yes" : answers[currentQuestion.id]?.is_yes === false ? "no" : ""}
                    onValueChange={(value) => handleAnswerChange(currentQuestion.id, value === "yes")}
                    className="flex justify-center gap-3 sm:gap-4"
                  >
                    <Label className="flex-1 cursor-pointer">
                      <RadioGroupItem
                        value="no"
                        id={`no-${currentQuestion.id}`}
                        className="peer sr-only"
                      />
                      <div
                        className={`
                          w-full px-3 sm:px-6 py-4 sm:py-5 text-sm sm:text-base text-center border rounded-xl transition-all duration-200
                          bg-transparent border-border text-foreground hover:bg-red-50/50 dark:hover:bg-red-900/20
                          ${answers[currentQuestion.id]?.is_yes === false ? 
                            'bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-400' : 
                            ''}
                        `}
                      >
                        No
                      </div>
                    </Label>

                    <Label className="flex-1 cursor-pointer">
                      <RadioGroupItem
                        value="yes"
                        id={`yes-${currentQuestion.id}`}
                        className="peer sr-only"
                      />
                      <div
                        className={`
                          w-full px-3 sm:px-6 py-4 sm:py-5 text-sm sm:text-base text-center border rounded-xl transition-all duration-200
                          bg-transparent border-border text-foreground hover:bg-green-50/50 dark:hover:bg-green-900/20
                          ${answers[currentQuestion.id]?.is_yes === true ? 
                            'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-400' : 
                            ''}
                        `}
                      >
                        Yes
                      </div>
                    </Label>
                  </RadioGroup>

                  <div>
                    <Label htmlFor="comment" className="mb-2 block">
                      Comment (Optional)
                    </Label>
                    <Textarea
                      id="comment"
                      placeholder="Share more details about your experience..."
                      value={answers[currentQuestion.id]?.comment || ""}
                      onChange={(e) =>
                        handleAnswerChange(currentQuestion.id, answers[currentQuestion.id]?.is_yes || false, e.target.value)
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Previous
                    </Button>
                    
                    <Button onClick={handleNextQuestion}>
                      {currentQuestionIndex === filteredQuestions.length - 1 ? "Submit Review" : "Next"}
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
