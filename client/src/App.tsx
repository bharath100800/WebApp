import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import Appointment from "@/pages/appointment";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
