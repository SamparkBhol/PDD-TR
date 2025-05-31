
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer, Share2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const DiagnosisReportPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem('leafGuardReports')) || [];
    const currentReport = savedReports.find(r => r.id === id);
    if (currentReport) {
      setReport(currentReport);
    } else {
      toast({
        title: 'Report Not Found',
        description: 'The requested diagnosis report could not be found.',
        variant: 'destructive',
      });
    }
  }, [id, toast]);

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Report Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The diagnosis report you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Home
          </Link>
        </Button>
      </div>
    );
  }
  
  const isHealthy = report.name.toLowerCase().includes('healthy');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
     if (navigator.share) {
      navigator.share({
        title: `LeafGuard Diagnosis: ${report.name}`,
        text: `Diagnosis: ${report.name}, Confidence: ${(report.confidence * 100).toFixed(0)}%. View report for details.`,
        url: window.location.href, 
      }).then(() => {
        toast({ title: 'Report Shared', description: 'Successfully shared the diagnosis report.' });
      }).catch((error) => {
        console.error('Error sharing:', error);
        toast({ title: 'Share Failed', description: 'Could not share the report.', variant: 'destructive'});
      });
    } else {
      const shareText = `LeafGuard Diagnosis:\nDisease: ${report.name}\nConfidence: ${(report.confidence * 100).toFixed(0)}%\nDate: ${new Date(report.date).toLocaleDateString()}\nURL: ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        toast({ title: 'Report Link Copied!', description: 'Link to report copied to clipboard.'});
      }).catch(err => {
        toast({ title: 'Copy Failed', description: 'Could not copy report link.', variant: 'destructive'});
      });
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-6 flex justify-start">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analyzer
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl print:shadow-none">
        <CardHeader className={cn(
            "p-6 flex flex-row items-center justify-between print:p-4",
            isHealthy ? "bg-green-500/10 dark:bg-green-700/20" : "bg-red-500/10 dark:bg-red-700/20"
          )}>
          <div className="flex items-center space-x-3">
             {isHealthy ? (
              <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400 print:w-8 print:h-8" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400 print:w-8 print:h-8" />
            )}
            <div>
              <CardTitle className={cn("text-3xl print:text-2xl", isHealthy ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>
                {report.name}
              </CardTitle>
              <CardDescription className={cn("text-lg print:text-base", isHealthy ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400")}>
                Confidence: {(report.confidence * 100).toFixed(0)}%
              </CardDescription>
            </div>
          </div>
          <div className="text-sm text-muted-foreground print:text-xs">
            Analyzed on: {new Date(report.date).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 print:p-4 print:space-y-4">
          {report.imagePreview && (
            <div className="my-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Analyzed Image:</p>
              <img  
                src={report.imagePreview} 
                alt={`Preview of ${report.name} diagnosis`} 
                className="max-w-xs mx-auto rounded-lg shadow-md border print:max-w-[200px]"
               src="https://images.unsplash.com/photo-1703612227727-20ee61c719dd" />
            </div>
          )}

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-2 text-primary print:text-lg">Treatment Guides</h2>
            <div className="grid md:grid-cols-2 gap-4 print:grid-cols-1">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1 print:text-base">Organic Treatments</h3>
                <p className="text-sm text-foreground/90 print:text-xs">{report.organic || 'Not specified.'}</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-1 print:text-base">Chemical Treatments</h3>
                <p className="text-sm text-foreground/90 print:text-xs">{report.chemical || 'Not specified.'}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="print:hidden"> {/* Hide actions in print view */}
             <h2 className="text-xl font-semibold mb-3 text-primary">Actions</h2>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Print Report
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              {/* <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download PDF (mock)
              </Button> */}
            </div>
          </div>

        </CardContent>
        <CardFooter className="p-6 border-t print:hidden">
          <p className="text-xs text-muted-foreground">
            This report is generated by LeafGuard AI. Always consult with an agricultural expert for critical decisions.
          </p>
        </CardFooter>
      </Card>

      {/* Styles for printing */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\:hidden {
            display: none !important;
          }
          header, footer, .no-print { /* Add .no-print to elements you don't want to print from Layout */
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .print\:shadow-none { box-shadow: none !important; }
          .print\:p-4 { padding: 1rem !important; }
          .print\:text-2xl { font-size: 1.5rem !important; }
          /* Add other print-specific styles as needed */
        }
      `}</style>
    </motion.div>
  );
};

export default DiagnosisReportPage;
