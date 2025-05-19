import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { QuestionSwiper } from "@/components/QuestionSwiper";
import { MessageCircle } from "lucide-react";
import { questionsData, getDistinctCategories } from "@/data/questions";
import { QuestionType, SurveyQuestionType, SurveyType, CountryType, CityType } from "@/types/company";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewPage() {
  const [companyUrl, setCompanyUrl] = useState("");
  const [role, setRole] = useState("all");
  const [department, setDepartment] = useState("all");
  const [city, setCity] = useState("all");
  const [country, setCountry] = useState("all");
  const [experience, setExperience] = useState("all");
  const [isCurrentlyEmployed, setIsCurrentlyEmployed] = useState("yes");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState<SurveyQuestionType[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityType[]>([]);

  const { toast } = useToast();
  
  // Fetch countries and cities
  useEffect(() => {
    // In a real app, this would be an API call
    // For now we'll mock some data
    setCountries([
      { id: 1, name: "United States" },
      { id: 2, name: "United Kingdom" },
      { id: 3, name: "Canada" },
      { id: 4, name: "Australia" },
      { id: 5, name: "Germany" }
    ]);
    
    setCities([
      { id: 1, name: "New York", country_id: 1 },
      { id: 2, name: "San Francisco", country_id: 1 },
      { id: 3, name: "London", country_id: 2 },
      { id: 4, name: "Manchester", country_id: 2 },
      { id: 5, name: "Toronto", country_id: 3 },
      { id: 6, name: "Vancouver", country_id: 3 },
      { id: 7, name: "Sydney", country_id: 4 },
      { id: 8, name: "Melbourne", country_id: 4 },
      { id: 9, name: "Berlin", country_id: 5 },
      { id: 10, name: "Munich", country_id: 5 }
    ]);
  }, []);

  // Filter cities based on selected country
  useEffect(() => {
    if (country === "all") {
      setFilteredCities(cities);
    } else {
      const countryId = parseInt(country);
      setFilteredCities(cities.filter(city => city.country_id === countryId));
    }
    
    // Reset city selection if country changes
    setCity("all");
  }, [country, cities]);
  
  // Filter questions by category if one is selected
  const filteredQuestions = selectedCategory !== "all"
    ? questionsData.filter(q => q.category === selectedCategory)
    : questionsData;

  const handleAnswerAll = (newAnswers: SurveyQuestionType[]) => {
    setQuestionAnswers(newAnswers);
    setCurrentStep(3);
  };

  const handleValidation = () => {
    const errors: Record<string, string> = {};

    if (!companyUrl) errors.companyUrl = "Please provide the company website or LinkedIn URL.";
    if (role === "all") errors.role = "Please select your role.";
    if (questionAnswers.length < filteredQuestions.length) errors.answers = "We'd appreciate if you answered all the survey questions.";

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Oops! Something went wrong.",
        description: Object.values(errors)[0],
        variant: "destructive",
      });
    }

    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!companyUrl || role === "all") {
        toast({
          title: "Missing Information",
          description: "Please complete all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    // Parse IDs
    const cityId = city !== "all" ? parseInt(city) : undefined;
    const countryId = country !== "all" ? parseInt(country) : undefined;
    const roleId = role !== "all" ? parseInt(role) : undefined;
    const departmentId = department !== "all" ? parseInt(department) : undefined;

    // Create survey object
    const survey: SurveyType = {
      company_id: 1, // This would be the actual company ID from the database
      city_id: cityId,
      country_id: countryId,
      role_id: roleId,
      department_id: departmentId,
      is_anonymous: true,
      is_employed: isCurrentlyEmployed === "yes",
      employed_from_date: startDate || undefined,
      employed_to_date: isCurrentlyEmployed === "no" ? endDate : undefined,
      answers: questionAnswers
    };

    console.log("Submitting survey:", survey);

    // Count how many stories were shared
    const storiesCount = questionAnswers.filter(a => a.comment && a.comment.trim().length > 0).length;

    toast({
      title: "Thanks for your input!",
      description: `Your responses and ${storiesCount} ${storiesCount === 1 ? 'story' : 'stories'} have been submitted anonymously. We appreciate your time!`,
      variant: "default",
    });

    // Reset form
    setCompanyUrl("");
    setRole("all");
    setDepartment("all");
    setCity("all");
    setCountry("all");
    setExperience("all");
    setIsCurrentlyEmployed("yes");
    setStartDate("");
    setEndDate("");
    setQuestionAnswers([]);
    setCurrentStep(1);
    setSelectedCategory("all");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border shadow-sm">
            <CardContent className="pt-6">
              <h2 className="font-poppins font-semibold text-xl mb-6 flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                  1
                </span>
                Company & Role Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <Label htmlFor="companyUrl" className="text-sm font-medium">LinkedIn Company URL</Label>
                  <Input
                    id="companyUrl"
                    type="url"
                    className="mt-1.5"
                    placeholder="https://www.linkedin.com/company/..."
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    We'll use this to identify the company but keep you anonymous
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                    <Select
                      value={country}
                      onValueChange={setCountry}
                    >
                      <SelectTrigger id="country" className="mt-1.5">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select Country</SelectItem>
                        {countries.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-sm font-medium">City</Label>
                    <Select
                      value={city}
                      onValueChange={setCity}
                    >
                      <SelectTrigger id="city" className="mt-1.5">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select City</SelectItem>
                        {filteredCities.map((c) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role" className="text-sm font-medium">Your Role</Label>
                    <Select
                      value={role}
                      onValueChange={setRole}
                    >
                      <SelectTrigger id="role" className="mt-1.5">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select Role</SelectItem>
                        <SelectItem value="1">Engineering</SelectItem>
                        <SelectItem value="2">Design</SelectItem>
                        <SelectItem value="3">Product</SelectItem>
                        <SelectItem value="4">Marketing</SelectItem>
                        <SelectItem value="5">Sales</SelectItem>
                        <SelectItem value="6">Operations</SelectItem>
                        <SelectItem value="7">HR</SelectItem>
                        <SelectItem value="8">Finance</SelectItem>
                        <SelectItem value="9">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                    <Select
                      value={department}
                      onValueChange={setDepartment}
                    >
                      <SelectTrigger id="department" className="mt-1.5">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Select Department</SelectItem>
                        <SelectItem value="1">Technology</SelectItem>
                        <SelectItem value="2">Marketing</SelectItem>
                        <SelectItem value="3">Sales</SelectItem>
                        <SelectItem value="4">Operations</SelectItem>
                        <SelectItem value="5">Human Resources</SelectItem>
                        <SelectItem value="6">Finance</SelectItem>
                        <SelectItem value="7">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience" className="text-sm font-medium">Experience Level</Label>
                  <Select
                    value={experience}
                    onValueChange={setExperience}
                  >
                    <SelectTrigger id="experience" className="mt-1.5">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Select Experience Level</SelectItem>
                      <SelectItem value="entry">Entry-level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Employment Status</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1.5">
                    <div 
                      className={`border rounded-md p-2 cursor-pointer transition-all ${
                        isCurrentlyEmployed === "yes" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-muted-foreground"
                      }`}
                      onClick={() => setIsCurrentlyEmployed("yes")}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          isCurrentlyEmployed === "yes" ? "bg-primary" : "bg-muted"
                        }`}></div>
                        <span>Currently Employed</span>
                      </div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-2 cursor-pointer transition-all ${
                        isCurrentlyEmployed === "no" 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-muted-foreground"
                      }`}
                      onClick={() => setIsCurrentlyEmployed("no")}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          isCurrentlyEmployed === "no" ? "bg-primary" : "bg-muted"
                        }`}></div>
                        <span>Former Employee</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="mt-1.5"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  
                  {isCurrentlyEmployed === "no" && (
                    <div>
                      <Label htmlFor="endDate" className="text-sm font-medium">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        className="mt-1.5"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-primary"
                >
                  Continue to Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 2:
        return (
          <Card className="border shadow-sm">
            <CardContent className="pt-6">
              <h2 className="font-poppins font-semibold text-xl mb-6 flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                  2
                </span>
                Workplace Insights
              </h2>
              
              <div className="mb-6">
                <Label htmlFor="category" className="text-sm font-medium">Filter by Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="category" className="mt-1.5">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {getDistinctCategories().map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Filter questions by category to focus on specific aspects of the company
                </p>
              </div>
              
              <div className="py-4">
                <QuestionSwiper 
                  questions={filteredQuestions} 
                  onAnswerAll={handleAnswerAll} 
                />
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                >
                  Back to Company Info
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      case 3:
        return (
          <Card className="border shadow-sm">
            <CardContent className="pt-6">
              <h2 className="font-poppins font-semibold text-xl mb-6 flex items-center">
                <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                  3
                </span>
                Review & Submit
              </h2>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-medium mb-3">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div>
                    <p className="text-sm mb-1"><span className="font-medium">Company URL:</span> {companyUrl || "N/A"}</p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Location:</span> {
                        country !== "all" && city !== "all" 
                          ? `${filteredCities.find(c => c.id === parseInt(city))?.name}, ${countries.find(c => c.id === parseInt(country))?.name}` 
                          : "N/A"
                      }
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Role:</span> {
                        role !== "all" 
                          ? document.querySelector(`[value="${role}"]`)?.textContent 
                          : "N/A"
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Department:</span> {
                        department !== "all" 
                          ? document.querySelector(`[value="${department}"]`)?.textContent 
                          : "N/A"
                      }
                    </p>
                    <p className="text-sm mb-1"><span className="font-medium">Experience:</span> {experience !== "all" ? experience : "N/A"}</p>
                    <p className="text-sm mb-1"><span className="font-medium">Status:</span> {isCurrentlyEmployed === "yes" ? "Currently Employed" : "Former Employee"}</p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Period:</span> {startDate ? new Date(startDate).toLocaleDateString() : "N/A"} 
                      {isCurrentlyEmployed === "no" && endDate ? ` to ${new Date(endDate).toLocaleDateString()}` : ""}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Questions Answered</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      You've answered {questionAnswers.length} out of {filteredQuestions.length} questions.
                    </p>
                    
                    <div className="flex items-center gap-1 text-sm text-primary">
                      <MessageCircle size={14} />
                      <span>
                        {questionAnswers.filter(a => a.comment && a.comment.trim().length > 0).length} stories shared
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-md mt-6 border border-border">
                  <h3 className="font-medium mb-2 flex items-center">
                    <span className="mr-2">🔒</span>
                    Your Privacy is Protected
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your submission is completely anonymous. We don't store IP addresses,
                    require login, or collect any personally identifiable information.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Back to Questions
                </Button>
                <Button type="submit" onClick={handleSubmit} className="bg-primary">
                  Submit Anonymous Review
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-6">
              Submit a Company Review
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your workplace insights anonymously and help others make
              informed career decisions.
            </p>
          </motion.div>

          <div className="bg-background rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center mb-8">
                <div className="flex">
                  <div className={`flex items-center ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      1
                    </div>
                    <span className="hidden sm:inline">Company</span>
                  </div>
                  <div className={`w-12 h-1 mt-4 mx-2 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                  <div className={`flex items-center ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      2
                    </div>
                    <span className="hidden sm:inline">Questions</span>
                  </div>
                  <div className={`w-12 h-1 mt-4 mx-2 ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
                  <div className={`flex items-center ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      3
                    </div>
                    <span className="hidden sm:inline">Submit</span>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }}>
                {renderStepContent()}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
