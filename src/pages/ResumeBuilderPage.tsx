
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Plus, 
  Trash, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Link as LinkIcon, 
  Edit, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code 
} from "lucide-react";
import { useForm } from "react-hook-form";
import MainLayout from "@/components/MainLayout";

// Resume Templates
const resumeTemplates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and minimalist design with a modern touch",
    thumbnail: "https://placehold.co/300x400?text=Modern+Resume"
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout perfect for corporate applications",
    thumbnail: "https://placehold.co/300x400?text=Professional+Resume"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique and bold design",
    thumbnail: "https://placehold.co/300x400?text=Creative+Resume" 
  },
  {
    id: "simple",
    name: "Simple",
    description: "Elegant and straightforward layout",
    thumbnail: "https://placehold.co/300x400?text=Simple+Resume"
  }
];

const ResumeBuilderPage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      title: "",
      summary: "",
      website: ""
    },
    experience: [
      { id: 1, title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }
    ],
    education: [
      { id: 1, degree: "", school: "", location: "", startDate: "", endDate: "", current: false, description: "" }
    ],
    skills: [
      { id: 1, name: "", level: "Beginner" }
    ],
    projects: [
      { id: 1, title: "", description: "", technologies: "", link: "" }
    ]
  });
  
  const form = useForm({
    defaultValues: resumeData.personal
  });
  
  // Move to next section
  const handleNext = () => {
    const tabOrder = ["personal", "experience", "education", "skills", "projects", "preview"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };
  
  // Move to previous section
  const handlePrevious = () => {
    const tabOrder = ["personal", "experience", "education", "skills", "projects", "preview"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };
  
  // Update personal information
  const handlePersonalSubmit = (data) => {
    setResumeData({
      ...resumeData,
      personal: data
    });
    handleNext();
  };
  
  // Add new experience entry
  const addExperience = () => {
    const newId = resumeData.experience.length > 0 
      ? Math.max(...resumeData.experience.map(exp => exp.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        { id: newId, title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }
      ]
    });
  };
  
  // Update experience entry
  const updateExperience = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };
  
  // Remove experience entry
  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };
  
  // Add new education entry
  const addEducation = () => {
    const newId = resumeData.education.length > 0 
      ? Math.max(...resumeData.education.map(edu => edu.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        { id: newId, degree: "", school: "", location: "", startDate: "", endDate: "", current: false, description: "" }
      ]
    });
  };
  
  // Update education entry
  const updateEducation = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };
  
  // Remove education entry
  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };
  
  // Add new skill
  const addSkill = () => {
    const newId = resumeData.skills.length > 0 
      ? Math.max(...resumeData.skills.map(skill => skill.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        { id: newId, name: "", level: "Beginner" }
      ]
    });
  };
  
  // Update skill
  const updateSkill = (id, field, value) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };
  
  // Remove skill
  const removeSkill = (id) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };
  
  // Add new project
  const addProject = () => {
    const newId = resumeData.projects.length > 0 
      ? Math.max(...resumeData.projects.map(project => project.id)) + 1 
      : 1;
    
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        { id: newId, title: "", description: "", technologies: "", link: "" }
      ]
    });
  };
  
  // Update project
  const updateProject = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };
  
  // Remove project
  const removeProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Resume Builder</h1>
        <p className="text-gray-600 mb-6">Create a professional resume in minutes</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - steps */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border shadow-sm p-4">
              <h2 className="font-semibold text-lg mb-4">Build Your Resume</h2>
              <nav className="space-y-1">
                <StepButton 
                  icon={<User className="h-4 w-4" />}
                  title="Personal Information"
                  active={activeTab === "personal"}
                  onClick={() => setActiveTab("personal")}
                />
                <StepButton 
                  icon={<Briefcase className="h-4 w-4" />}
                  title="Work Experience"
                  active={activeTab === "experience"}
                  onClick={() => setActiveTab("experience")}
                />
                <StepButton 
                  icon={<BookOpen className="h-4 w-4" />}
                  title="Education"
                  active={activeTab === "education"}
                  onClick={() => setActiveTab("education")}
                />
                <StepButton 
                  icon={<Code className="h-4 w-4" />}
                  title="Skills"
                  active={activeTab === "skills"}
                  onClick={() => setActiveTab("skills")}
                />
                <StepButton 
                  icon={<Award className="h-4 w-4" />}
                  title="Projects"
                  active={activeTab === "projects"}
                  onClick={() => setActiveTab("projects")}
                />
                <StepButton 
                  icon={<Eye className="h-4 w-4" />}
                  title="Preview & Download"
                  active={activeTab === "preview"}
                  onClick={() => setActiveTab("preview")}
                />
              </nav>
              
              {activeTab === "preview" && (
                <div className="mt-6">
                  <h3 className="font-medium text-sm mb-3">Choose Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {resumeTemplates.map(template => (
                      <div 
                        key={template.id}
                        className={`cursor-pointer border rounded p-1 ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <img 
                          src={template.thumbnail} 
                          alt={template.name} 
                          className="w-full h-auto rounded"
                        />
                        <p className="text-xs font-medium mt-1 text-center">{template.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === "personal" && "Personal Information"}
                  {activeTab === "experience" && "Work Experience"}
                  {activeTab === "education" && "Education"}
                  {activeTab === "skills" && "Skills"}
                  {activeTab === "projects" && "Projects"}
                  {activeTab === "preview" && "Preview Your Resume"}
                </CardTitle>
                <CardDescription>
                  {activeTab === "personal" && "Add your contact details and personal information"}
                  {activeTab === "experience" && "Add your work experience, starting with the most recent"}
                  {activeTab === "education" && "Add your educational background"}
                  {activeTab === "skills" && "Add your technical and soft skills"}
                  {activeTab === "projects" && "Add projects that showcase your abilities"}
                  {activeTab === "preview" && "Review your resume and download it"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsContent value="personal">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handlePersonalSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Software Developer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website/Portfolio (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://johndoe.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="summary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Summary</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="A brief summary of your professional background, skills, and career goals."
                                  className="h-24"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button type="submit">Continue</Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="border rounded-lg p-4 relative">
                          <div className="absolute right-4 top-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <h3 className="font-medium mb-4">Experience {index + 1}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Job Title</label>
                              <Input 
                                value={exp.title}
                                onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                placeholder="Software Developer"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Company</label>
                              <Input 
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Acme Inc."
                              />
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <Input 
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                              placeholder="San Francisco, CA (or Remote)"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Start Date</label>
                              <Input 
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            
                            {!exp.current && (
                              <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <Input 
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <label className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm">I currently work here</span>
                            </label>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea 
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Describe your responsibilities, achievements, and the technologies you worked with."
                              className="h-24"
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" onClick={addExperience} className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Add Experience
                      </Button>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handlePrevious}>Back</Button>
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="border rounded-lg p-4 relative">
                          <div className="absolute right-4 top-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <h3 className="font-medium mb-4">Education {index + 1}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Degree</label>
                              <Input 
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">School</label>
                              <Input 
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                                placeholder="University of California"
                              />
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <Input 
                              value={edu.location}
                              onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                              placeholder="Berkeley, CA"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Start Date</label>
                              <Input 
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                              />
                            </div>
                            
                            {!edu.current && (
                              <div>
                                <label className="block text-sm font-medium mb-1">End Date</label>
                                <Input 
                                  type="month"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-4">
                            <label className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={edu.current}
                                onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm">I am currently studying here</span>
                            </label>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                            <Textarea 
                              value={edu.description}
                              onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                              placeholder="Relevant coursework, achievements, activities, etc."
                              className="h-24"
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" onClick={addEducation} className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Add Education
                      </Button>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handlePrevious}>Back</Button>
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills">
                    <div className="space-y-6">
                      {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="border rounded-lg p-4 relative">
                          <div className="absolute right-4 top-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <h3 className="font-medium mb-4">Skill {index + 1}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Skill Name</label>
                              <Input 
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                                placeholder="JavaScript, Project Management, etc."
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">Proficiency</label>
                              <select 
                                value={skill.level}
                                onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" onClick={addSkill} className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Add Skill
                      </Button>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handlePrevious}>Back</Button>
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects">
                    <div className="space-y-6">
                      {resumeData.projects.map((project, index) => (
                        <div key={project.id} className="border rounded-lg p-4 relative">
                          <div className="absolute right-4 top-4">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeProject(project.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          
                          <h3 className="font-medium mb-4">Project {index + 1}</h3>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Project Title</label>
                            <Input 
                              value={project.title}
                              onChange={(e) => updateProject(project.id, "title", e.target.value)}
                              placeholder="E-commerce Website, Mobile App, etc."
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <Textarea 
                              value={project.description}
                              onChange={(e) => updateProject(project.id, "description", e.target.value)}
                              placeholder="Describe the project, your contributions, and its impact."
                              className="h-24"
                            />
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Technologies Used</label>
                            <Input 
                              value={project.technologies}
                              onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                              placeholder="React, Node.js, MongoDB, etc."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Project Link (Optional)</label>
                            <Input 
                              value={project.link}
                              onChange={(e) => updateProject(project.id, "link", e.target.value)}
                              placeholder="https://github.com/yourusername/project"
                            />
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" onClick={addProject} className="w-full">
                        <Plus className="h-4 w-4 mr-2" /> Add Project
                      </Button>
                      
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handlePrevious}>Back</Button>
                        <Button onClick={handleNext}>Continue</Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preview">
                    <div className="space-y-6">
                      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        <div className="p-6 bg-gray-50 border-b">
                          <h2 className="text-2xl font-bold">{resumeData.personal.firstName} {resumeData.personal.lastName}</h2>
                          <p className="text-gray-600 mt-1">{resumeData.personal.title}</p>
                          
                          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                            {resumeData.personal.email && (
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                <span>{resumeData.personal.email}</span>
                              </div>
                            )}
                            
                            {resumeData.personal.phone && (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                <span>{resumeData.personal.phone}</span>
                              </div>
                            )}
                            
                            {resumeData.personal.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{resumeData.personal.location}</span>
                              </div>
                            )}
                            
                            {resumeData.personal.website && (
                              <div className="flex items-center">
                                <LinkIcon className="h-4 w-4 mr-1" />
                                <span>{resumeData.personal.website}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {resumeData.personal.summary && (
                          <div className="p-6 border-b">
                            <h3 className="font-semibold mb-2">Professional Summary</h3>
                            <p className="text-sm text-gray-600">{resumeData.personal.summary}</p>
                          </div>
                        )}
                        
                        {resumeData.experience.length > 0 && resumeData.experience[0].title && (
                          <div className="p-6 border-b">
                            <h3 className="font-semibold mb-3">Work Experience</h3>
                            <div className="space-y-4">
                              {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{exp.title}</h4>
                                      <p className="text-sm text-gray-600">{exp.company}, {exp.location}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {exp.startDate && formatYearMonth(exp.startDate)} - {exp.current ? 'Present' : exp.endDate && formatYearMonth(exp.endDate)}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {resumeData.education.length > 0 && resumeData.education[0].degree && (
                          <div className="p-6 border-b">
                            <h3 className="font-semibold mb-3">Education</h3>
                            <div className="space-y-4">
                              {resumeData.education.map((edu) => (
                                <div key={edu.id}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{edu.degree}</h4>
                                      <p className="text-sm text-gray-600">{edu.school}, {edu.location}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {edu.startDate && formatYearMonth(edu.startDate)} - {edu.current ? 'Present' : edu.endDate && formatYearMonth(edu.endDate)}
                                    </div>
                                  </div>
                                  {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {resumeData.skills.length > 0 && resumeData.skills[0].name && (
                          <div className="p-6 border-b">
                            <h3 className="font-semibold mb-3">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.map((skill) => (
                                <Badge key={skill.id} variant="secondary" className="text-sm">
                                  {skill.name} ({skill.level})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {resumeData.projects.length > 0 && resumeData.projects[0].title && (
                          <div className="p-6">
                            <h3 className="font-semibold mb-3">Projects</h3>
                            <div className="space-y-4">
                              {resumeData.projects.map((project) => (
                                <div key={project.id}>
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-medium">{project.title}</h4>
                                    {project.link && (
                                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                        View Project
                                      </a>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                  {project.technologies && (
                                    <div className="mt-2">
                                      <span className="text-sm font-medium">Technologies: </span>
                                      <span className="text-sm text-gray-600">{project.technologies}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={handlePrevious}>Back</Button>
                        <Button>
                          <Download className="h-4 w-4 mr-2" /> Download Resume
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Step Button Component
const StepButton = ({ icon, title, active, onClick }) => {
  return (
    <button
      className={`w-full flex items-center justify-between p-2 rounded-md ${
        active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`mr-3 ${active ? 'text-blue-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <span className={`${active ? 'font-medium' : ''}`}>{title}</span>
      </div>
      {active && <ChevronRight className="h-4 w-4 text-blue-600" />}
    </button>
  );
};

// Helper function to format year-month
const formatYearMonth = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Missing components imports
const User = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
};

const Eye = ({ className }) => {
  return <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
};

export default ResumeBuilderPage;
