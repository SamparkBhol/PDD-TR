
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, RotateCcw, MapPin, Share2, Save, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Mock computer vision model
const mockClassifyImage = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const diseases = [
        { name: 'Tomato Late Blight', confidence: 0.92, organic: 'Apply copper-based fungicides. Improve air circulation. Remove infected plants.', chemical: 'Use fungicides containing mancozeb or chlorothalonil. Follow label instructions carefully.' },
        { name: 'Apple Scab', confidence: 0.88, organic: 'Prune infected branches. Rake and destroy fallen leaves. Apply sulfur or lime-sulfur sprays.', chemical: 'Apply fungicides like captan or myclobutanil before rain events.' },
        { name: 'Potato Early Blight', confidence: 0.95, organic: 'Rotate crops. Water at the base of plants. Apply biofungicides with Bacillus subtilis.', chemical: 'Use fungicides containing azoxystrobin or pyraclostrobin.' },
        { name: 'Healthy Tomato Leaf', confidence: 0.99, organic: 'Maintain good soil health. Ensure proper watering and sunlight.', chemical: 'No chemical treatment needed for healthy plants.' },
        { name: 'Healthy Apple Leaf', confidence: 0.97, organic: 'Ensure adequate nutrients and water. Prune for good air circulation.', chemical: 'No chemical treatment needed.' },
      ];
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      resolve({ ...randomDisease, id: Date.now().toString() });
    }, 2000);
  });
};

// Mock nearby shops
const mockNearbyShops = [
  { name: 'GreenThumb Agro Supplies', distance: '2.5 km' },
  { name: 'FarmCare Essentials', distance: '5.1 km' },
  { name: 'CropSavers Inc.', distance: '7.8 km' },
];

const HomePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [selectedFile]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setAnalysisResult(null);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select an image file to analyze.',
        variant: 'destructive',
      });
      return;
    }
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setAnalysisProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 150);

    try {
      const result = await mockClassifyImage(selectedFile);
      setAnalysisResult(result);
      clearInterval(interval); // Ensure progress completes
      setAnalysisProgress(100);
      toast({
        title: 'Analysis Complete!',
        description: `Detected: ${result.name}`,
        variant: result.name.toLowerCase().includes('healthy') ? 'default' : 'destructive',
        className: result.name.toLowerCase().includes('healthy') ? 'bg-green-500 dark:bg-green-700 text-white' : 'bg-red-500 dark:bg-red-700 text-white',
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the image. Please try again.',
        variant: 'destructive',
      });
      clearInterval(interval);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const handleSaveReport = () => {
    if (!analysisResult) return;
    const savedReports = JSON.parse(localStorage.getItem('leafGuardReports')) || [];
    const newReport = { ...analysisResult, date: new Date().toISOString(), imagePreview: preview };
    // Limit to 10 saved reports for demo
    const updatedReports = [newReport, ...savedReports].slice(0,10); 
    localStorage.setItem('leafGuardReports', JSON.stringify(updatedReports));
    toast({
      title: 'Report Saved!',
      description: 'The diagnosis report has been saved locally.',
      className: 'bg-blue-500 dark:bg-blue-700 text-white',
    });
    // Potentially navigate to a reports page or show a list
    // For now, just a toast. User can be directed to /report/:id if we implement a list of saved reports.
  };
  
  const handleShareReport = () => {
    if (!analysisResult) return;
    // Mock sharing functionality
    if (navigator.share) {
      navigator.share({
        title: `LeafGuard Diagnosis: ${analysisResult.name}`,
        text: `Diagnosis: ${analysisResult.name}, Confidence: ${(analysisResult.confidence * 100).toFixed(0)}%. Organic Treatment: ${analysisResult.organic}. Chemical Treatment: ${analysisResult.chemical}`,
        url: window.location.href, // Or a specific report URL
      }).then(() => {
        toast({ title: 'Report Shared', description: 'Successfully shared the diagnosis report.' });
      }).catch((error) => {
        console.error('Error sharing:', error);
        toast({ title: 'Share Failed', description: 'Could not share the report.', variant: 'destructive'});
      });
    } else {
       // Fallback for browsers that don't support Web Share API
      const shareText = `LeafGuard Diagnosis:\nDisease: ${analysisResult.name}\nConfidence: ${(analysisResult.confidence * 100).toFixed(0)}%\nOrganic Treatment: ${analysisResult.organic}\nChemical Treatment: ${analysisResult.chemical}`;
      navigator.clipboard.writeText(shareText).then(() => {
        toast({ title: 'Report Copied!', description: 'Diagnosis details copied to clipboard.'});
      }).catch(err => {
        toast({ title: 'Copy Failed', description: 'Could not copy report to clipboard.', variant: 'destructive'});
      });
    }
  };


  const isHealthy = analysisResult && analysisResult.name.toLowerCase().includes('healthy');

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden shadow-2xl glass-card border-primary/30 dark:border-primary/50">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-sky-500/10 dark:from-primary/20 dark:to-sky-700/20 p-6">
            <div className="flex items-center space-x-3">
              <UploadCloud className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Upload Crop Leaf Image</CardTitle>
                <CardDescription className="text-lg text-foreground/80">
                  Let our AI analyze your crop leaf for potential diseases.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid gap-6 md:grid-cols-2 items-start">
            <div className="space-y-4">
              <div>
                <Label htmlFor="leaf-image" className="text-lg font-semibold mb-2 block">
                  Select Image File
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="leaf-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:file:bg-primary/80 dark:file:text-primary-foreground"
                    disabled={isAnalyzing}
                  />
                </div>
              </div>

              {preview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 border-2 border-dashed border-primary/50 rounded-lg p-2 bg-slate-50 dark:bg-slate-800"
                >
                  <p className="text-sm text-muted-foreground mb-2 text-center">Image Preview:</p>
                  <img 
                    src={preview}
                    alt="Selected leaf preview"
                    className="w-full max-h-64 object-contain rounded-md shadow-md"
                   src="https://images.unsplash.com/photo-1557079308-af34adba5e45" />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 md:pt-8">
                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isAnalyzing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-700 dark:hover:to-emerald-800 shadow-lg transform hover:scale-105 transition-transform duration-150 neumorphic-button"
                >
                  <Leaf className="mr-2 h-5 w-5" />
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Leaf'}
                </Button>
                { (selectedFile || analysisResult) &&
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={isAnalyzing}
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                }
            </div>

          </CardContent>
          {isAnalyzing && (
            <CardFooter className="p-6">
              <Progress value={analysisProgress} className="w-full" />
            </CardFooter>
          )}
        </Card>
      </motion.div>

      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-2xl border-2 border-transparent"
                  style={{borderColor: isHealthy ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'}}>
              <CardHeader className={cn(
                "p-6 flex flex-row items-center justify-between",
                isHealthy ? "bg-green-500/10 dark:bg-green-700/20" : "bg-red-500/10 dark:bg-red-700/20"
              )}>
                <div className="flex items-center space-x-3">
                  {isHealthy ? (
                    <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400" />
                  ) : (
                    <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
                  )}
                  <div>
                    <CardTitle className={cn("text-3xl", isHealthy ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>
                      {analysisResult.name}
                    </CardTitle>
                    <CardDescription className={cn("text-lg", isHealthy ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                      Confidence: {(analysisResult.confidence * 100).toFixed(0)}%
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={handleShareReport} title="Share Report">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleSaveReport} title="Save Report">
                    <Save className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="treatment" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                    <TabsTrigger value="treatment">Treatment Guides</TabsTrigger>
                    <TabsTrigger value="shops">Nearby Shops</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="treatment">
                    <h4 className="text-xl font-semibold mb-3 text-primary">Treatment Information</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="bg-slate-50 dark:bg-slate-800/50">
                        <CardHeader>
                          <CardTitle className="text-emerald-600 dark:text-emerald-400">Organic Treatments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/90">{analysisResult.organic || 'No organic treatment information available.'}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-slate-50 dark:bg-slate-800/50">
                        <CardHeader>
                          <CardTitle className="text-amber-600 dark:text-amber-400">Chemical Treatments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/90">{analysisResult.chemical || 'No chemical treatment information available.'}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="shops">
                    <h4 className="text-xl font-semibold mb-3 text-primary">Recommended Agro-Chemical Shops</h4>
                    {mockNearbyShops.length > 0 ? (
                      <ul className="space-y-3">
                        {mockNearbyShops.map((shop, index) => (
                          <li key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-5 h-5 text-primary" />
                              <span className="font-medium text-foreground/90">{shop.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{shop.distance}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No nearby shops information available at this moment.</p>
                    )}
                     <p className="text-xs text-muted-foreground mt-4 italic">Note: Shop locations are illustrative. Real-time mapping coming soon!</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
