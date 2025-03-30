
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MessageSquare, ThumbsUp, BookOpen, FileText } from "lucide-react";
import MainLayout from "@/components/MainLayout";

// Demo articles data
const articlesData = [
  {
    id: 1,
    title: "10 Tips for Crafting a Standout Resume in 2023",
    category: "Resume Building",
    excerpt: "Learn how to make your resume stand out in a competitive job market with these expert tips for highlighting your skills and experience.",
    image: "https://placehold.co/600x400?text=Resume+Tips",
    author: "Sarah Johnson",
    authorTitle: "Career Coach",
    authorImage: "https://placehold.co/100x100?text=SJ",
    date: "2023-09-10",
    readTime: "5 min read",
    likes: 245,
    comments: 32,
    featured: true,
    content: `
      <h2>How to Make Your Resume Stand Out</h2>
      <p>In today's competitive job market, having a standout resume is more important than ever. Recruiters often spend only a few seconds scanning each resume before deciding whether to move forward with a candidate.</p>
      
      <h3>1. Tailor your resume for each job application</h3>
      <p>One of the biggest mistakes job seekers make is using the same generic resume for every application. Take the time to customize your resume for each position, highlighting the skills and experiences most relevant to that specific role.</p>
      
      <h3>2. Use a clean, professional design</h3>
      <p>While you want your resume to stand out, an overly fancy design can be distracting. Stick to a clean, professional layout with consistent formatting throughout. Use bullet points, headings, and white space to make your resume easy to scan.</p>
      
      <h3>3. Start with a strong summary statement</h3>
      <p>Replace the outdated "objective" with a powerful summary statement that highlights your most relevant qualifications and what you bring to the table. This is your chance to make a great first impression.</p>
      
      <h3>4. Quantify your achievements</h3>
      <p>Don't just list your responsibilities—showcase your accomplishments with numbers whenever possible. For example, instead of saying "Managed social media accounts," try "Increased social media engagement by 45% and grew follower base by 10,000 in six months."</p>
      
      <h3>5. Include relevant keywords</h3>
      <p>Many companies use Applicant Tracking Systems (ATS) to screen resumes before a human even sees them. Include industry-specific keywords from the job description to ensure your resume passes through these systems.</p>
      
      <h3>6. Focus on your most recent and relevant experience</h3>
      <p>Your most recent positions should have more detail than older roles. For positions older than 10-15 years, consider including only the company name, your title, and dates of employment, or leaving them off entirely if they're not relevant.</p>
      
      <h3>7. Highlight your skills section</h3>
      <p>Include a dedicated skills section that showcases both your technical and soft skills. Organize them by category if you have many to list, and prioritize those most relevant to the position.</p>
      
      <h3>8. Include relevant certifications and continuing education</h3>
      <p>Even if you don't have a degree in a particular field, relevant certifications or continuing education courses can demonstrate your commitment to learning and growing in your profession.</p>
      
      <h3>9. Proofread meticulously</h3>
      <p>Spelling and grammar errors can immediately disqualify you from consideration. Proofread your resume carefully, and then have someone else review it as well. Even small mistakes can signal a lack of attention to detail.</p>
      
      <h3>10. Keep it concise</h3>
      <p>Unless you're in academia or applying for an executive position, aim to keep your resume to one or two pages maximum. Focus on quality over quantity, highlighting only the most relevant information.</p>
      
      <p>Remember, your resume is often your first opportunity to make an impression on potential employers. By following these tips, you can create a document that effectively showcases your qualifications and increases your chances of landing an interview.</p>
    `
  },
  {
    id: 2,
    title: "Mastering the Art of Job Interviews: A Comprehensive Guide",
    category: "Interview Tips",
    excerpt: "Prepare for your next job interview with confidence using this comprehensive guide covering everything from research to follow-up.",
    image: "https://placehold.co/600x400?text=Interview+Guide",
    author: "Michael Chen",
    authorTitle: "HR Director",
    authorImage: "https://placehold.co/100x100?text=MC",
    date: "2023-09-15",
    readTime: "8 min read",
    likes: 312,
    comments: 47,
    featured: true,
    content: "Full interview guide content would go here..."
  },
  {
    id: 3,
    title: "Navigating Career Transitions: How to Successfully Change Industries",
    category: "Career Change",
    excerpt: "Considering a career change? Learn strategies for leveraging your transferable skills and experience to successfully transition to a new industry.",
    image: "https://placehold.co/600x400?text=Career+Change",
    author: "Emily Rodriguez",
    authorTitle: "Career Transition Specialist",
    authorImage: "https://placehold.co/100x100?text=ER",
    date: "2023-09-18",
    readTime: "6 min read",
    likes: 189,
    comments: 28,
    featured: true,
    content: "Full career change guidance content would go here..."
  },
  {
    id: 4,
    title: "The Ultimate Guide to Salary Negotiation: Know Your Worth",
    category: "Salary & Benefits",
    excerpt: "Learn effective strategies for negotiating your salary and benefits package to ensure you're being compensated fairly for your skills and experience.",
    image: "https://placehold.co/600x400?text=Salary+Negotiation",
    author: "David Washington",
    authorTitle: "Compensation Consultant",
    authorImage: "https://placehold.co/100x100?text=DW",
    date: "2023-09-22",
    readTime: "7 min read",
    likes: 276,
    comments: 41,
    featured: false,
    content: "Full salary negotiation guide content would go here..."
  },
  {
    id: 5,
    title: "Building Your Personal Brand: Standing Out in a Digital World",
    category: "Personal Branding",
    excerpt: "Discover how to develop and maintain a strong personal brand that will help you stand out to employers and advance your career.",
    image: "https://placehold.co/600x400?text=Personal+Branding",
    author: "Lisa Zhang",
    authorTitle: "Personal Branding Expert",
    authorImage: "https://placehold.co/100x100?text=LZ",
    date: "2023-09-25",
    readTime: "5 min read",
    likes: 203,
    comments: 19,
    featured: false,
    content: "Full personal branding guide content would go here..."
  },
  {
    id: 6,
    title: "Remote Work Success: Strategies for Productivity and Work-Life Balance",
    category: "Remote Work",
    excerpt: "Working remotely? Learn how to maintain productivity, communicate effectively, and achieve better work-life balance in a remote environment.",
    image: "https://placehold.co/600x400?text=Remote+Work",
    author: "James Patel",
    authorTitle: "Remote Work Consultant",
    authorImage: "https://placehold.co/100x100?text=JP",
    date: "2023-09-28",
    readTime: "6 min read",
    likes: 224,
    comments: 36,
    featured: false,
    content: "Full remote work strategy content would go here..."
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Resume Building",
  "Interview Tips",
  "Career Change",
  "Salary & Benefits",
  "Personal Branding",
  "Remote Work",
  "Networking",
  "Job Search",
  "Professional Development"
];

const CareerAdvicePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  // Filter articles based on search term and category
  const handleSearch = () => {
    let results = [...articlesData];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(article => 
        article.title.toLowerCase().includes(term) || 
        article.excerpt.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term)
      );
    }
    
    if (selectedCategory !== "All Categories") {
      results = results.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(results);
  };

  // Handle opening an article
  const openArticle = (articleId) => {
    const article = articlesData.find(a => a.id === articleId);
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  // Handle closing an article
  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Career Advice</h1>
        <p className="text-gray-600 mb-6">Expert guidance to help you succeed in your career journey</p>
        
        {!selectedArticle ? (
          <>
            {/* Search and filter section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="relative">
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button onClick={handleSearch} className="h-10">
                  <Search className="mr-2 h-4 w-4" />
                  Search Articles
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="featured" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
              </TabsList>
              
              <TabsContent value="featured" className="pt-6">
                {/* Featured Articles Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {filteredArticles
                    .filter(article => article.featured)
                    .slice(0, 3)
                    .map(article => (
                      <FeaturedArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => openArticle(article.id)}
                      />
                    ))}
                </div>
                
                {/* All Articles Section */}
                <h2 className="text-xl font-semibold mb-4">All Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles
                    .filter(article => !article.featured)
                    .map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => openArticle(article.id)}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="latest" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => openArticle(article.id)}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles
                    .sort((a, b) => b.likes - a.likes)
                    .map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onClick={() => openArticle(article.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredArticles.length === 0 && (
              <div className="text-center py-12 border rounded-lg">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or category selection</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setFilteredArticles(articlesData);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="relative">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-64 md:h-80 object-cover"
              />
              <Button 
                variant="outline" 
                className="absolute top-4 left-4 bg-white" 
                onClick={closeArticle}
              >
                Back to Articles
              </Button>
            </div>
            
            <div className="p-6 md:p-8">
              <Badge className="mb-3">{selectedArticle.category}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{selectedArticle.title}</h1>
              
              <div className="flex items-center mb-6">
                <img 
                  src={selectedArticle.authorImage} 
                  alt={selectedArticle.author} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">{selectedArticle.author}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{selectedArticle.authorTitle}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(selectedArticle.date)}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />
              
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like ({selectedArticle.likes})</span>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment ({selectedArticle.comments})</span>
                  </Button>
                </div>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Save Article</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Featured Article Card Component
const FeaturedArticleCard = ({ article, onClick }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3">{article.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>{formatDate(article.date)}</span>
          </div>
          <span>{article.readTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Regular Article Card Component
const ArticleCard = ({ article, onClick }) => {
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-40 object-cover"
        />
        <Badge className="absolute top-3 left-3">{article.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={article.authorImage} 
              alt={article.author} 
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-sm">{article.author}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ThumbsUp className="h-3.5 w-3.5 mr-1" />
            <span>{article.likes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default CareerAdvicePage;
