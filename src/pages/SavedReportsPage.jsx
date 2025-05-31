import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Assuming AlertDialog component exists

const SavedReportsPage = () => {
  const [reports, setReports] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('leafGuardReports')) || [];
    setReports(savedReports);
  }, []);

  const handleDeleteReport = (reportId) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    localStorage.setItem('leafGuardReports', JSON.stringify(updatedReports));
    setReports(updatedReports);
    toast({
      title: 'Report Deleted',
      description: 'The diagnosis report has been removed.',
      className: 'bg-orange-500 dark:bg-orange-700 text-white',
    });
  };

  if (reports.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <BookOpen className="w-20 h-20 text-primary/70 mb-6" />
        <h1 className="text-3xl font-semibold mb-3 text-primary">No Saved Reports Yet</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          It looks like you haven't saved any diagnosis reports. Analyze a leaf image on the homepage to get started!
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
          <Link to="/">
            <Eye className="mr-2 h-5 w-5" /> Analyze a Leaf
          </Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-border">
        <h1 className="text-4xl font-bold text-primary mb-4 sm:mb-0">My Saved Reports</h1>
        <span className="text-lg text-muted-foreground">{reports.length} report(s) saved</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const isHealthy = report.name.toLowerCase().includes('healthy');
          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={cn(
                "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col",
                isHealthy ? "border-green-500/50" : "border-red-500/50"
              )}>
                <CardHeader className={cn(
                  "pb-4",
                  isHealthy ? "bg-green-500/10 dark:bg-green-700/20" : "bg-red-500/10 dark:bg-red-700/20"
                )}>
                   <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                     {isHealthy ? <CheckCircle className="w-7 h-7 text-green-500" /> : <AlertTriangle className="w-7 h-7 text-red-500" />}
                      <CardTitle className={cn("text-xl", isHealthy ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>{report.name}</CardTitle>
                    </div>
                     {report.imagePreview && (
                       <img
                        src={report.imagePreview}
                        alt="Leaf preview"
                        className="w-16 h-16 object-cover rounded-md border ml-2"
                       src="https://images.unsplash.com/photo-1606907408021-8e1a1c8e3f3b"/>
                     )}
                  </div>
                  <CardDescription className="text-xs pt-1">
                    Analyzed on: {new Date(report.date).toLocaleDateString()} at {new Date(report.date).toLocaleTimeString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <p className="text-sm text-muted-foreground mb-1">Confidence: <span className="font-semibold text-foreground">{(report.confidence * 100).toFixed(0)}%</span></p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <span className="font-medium text-foreground">Organic: </span>{report.organic || 'N/A'}
                  </p>
                   <p className="text-sm text-muted-foreground line-clamp-2">
                    <span className="font-medium text-foreground">Chemical: </span>{report.chemical || 'N/A'}
                  </p>
                </CardContent>
                <div className="p-4 border-t bg-slate-50 dark:bg-slate-800/30 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:bg-primary/10">
                    <Link to={`/report/${report.id}`}>
                      <Eye className="mr-1.5 h-4 w-4" /> View Full
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the diagnosis report for "{report.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteReport(report.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SavedReportsPage;