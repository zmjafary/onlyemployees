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
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock survey questions
const questions = [
  {
    id: 1,
    question: "Does the company use modern technologies?",
    category: "Technology",
  },
  {
    id: 2,
    question: "Is the management supportive?",
    category: "Leadership",
  },
  {
    id: 3,
    question: "Is there good work-life balance?",
    category: "Culture",
  },
  {
    id: 4,
    question: "Are the compensation/benefits competitive?",
    category: "Benefits",
  },
  {
    id: 5,
    question: "Are there growth opportunities?",
    category: "Development",
  },
  {
    id: 6,
    question: "Is the team collaborative?",
    category: "Culture",
  },
  {
    id: 7,
    question: "Is the workload reasonable?",
    category: "Environment",
  },
  {
    id: 8,
    question: "Does the company value diversity and inclusion?",
    category: "Culture",
  },
];

export default function ReviewPage() {
  const [companyUrl, setCompanyUrl] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const { toast } = useToast();

  const handleToggleChange = (questionId: number, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };
  const handleValidation = () => {
    const errors: Record<string, string> = {};

    if (!companyUrl) errors.companyUrl = "Please provide the company website.";
    if (!role) errors.role = "Let us know your current role.";
    if (!experience) errors.experience = "Select your experience level.";
    if (Object.keys(answers).length === 0) errors.answers = "We’d appreciate if you answered the survey questions.";

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Oops! Something went wrong.",
        description: Object.values(errors)[0],
        variant: "destructive",
      });
    }

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    toast({
      title: "Thanks for your input!",
      description: "Your responses have been submitted anonymously. We appreciate your time.",
      variant: "default",
    });

    // Reset form
    setCompanyUrl("");
    setRole("");
    setExperience("");
    setAnswers({});
  };

  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              Submit a Review
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your workplace insights anonymously and help others make
              informed career decisions.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-background border border-border rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className="font-poppins font-semibold text-xl mb-4 flex items-center">
                  <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                    1
                  </span>
                  Company Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyUrl">LinkedIn Company URL</Label>
                    <Input
                      id="companyUrl"
                      type="url"
                      className="mt-2"
                      placeholder="https://www.linkedin.com/company/..."
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      We'll use this to identify the company but keep you anonymous
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-poppins font-semibold text-xl mb-4 flex items-center">
                  <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                    2
                  </span>
                  Your Role (Anonymous)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Your Role Category</Label>
                    <Select
                      value={role}
                      onValueChange={setRole}
                    >
                      <SelectTrigger id="role" className="mt-2">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={experience}
                      onValueChange={setExperience}
                    >
                      <SelectTrigger id="experience" className="mt-2">
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
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-poppins font-semibold text-xl mb-4 flex items-center">
                  <span className="bg-primary/10 text-primary w-8 h-8 flex items-center justify-center rounded-full mr-2">
                    3
                  </span>
                  Workplace Insights (Yes/No)
                </h2>

                <div className="space-y-6">
                  {questions.map((q) => (
                    <motion.div
                      key={q.id}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-background rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block w-2 h-2 rounded-full ${q.category === 'Culture' ? 'bg-purple-500' :
                              q.category === 'Work-life' ? 'bg-blue-500' :
                                q.category === 'Compensation' ? 'bg-green-500' : 'bg-gray-500'
                              }`}></span>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              {q.category}
                            </span>
                          </div>
                          <p className="font-medium text-sm sm:text-base">{q.question}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className={`px-4 py-2 rounded-md text-sm font-medium ${answers[q.id] === true
                              ? "bg-primary text-white"
                              : "bg-muted/30 text-muted-foreground"
                              }`}
                            onClick={() => handleToggleChange(q.id, true)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`px-4 py-2 rounded-md text-sm font-medium ${answers[q.id] === false
                              ? "bg-primary text-white"
                              : "bg-muted/30 text-muted-foreground"
                              }`}
                            onClick={() => handleToggleChange(q.id, false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-md mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="mr-2">🔒</span>
                  Your Privacy is Protected
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your submission is completely anonymous. We don't store IP addresses,
                  require login, or collect any personally identifiable information.
                </p>
              </div>

              <Button type="submit" className="w-full bg-primary">
                Submit Anonymous Review
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
