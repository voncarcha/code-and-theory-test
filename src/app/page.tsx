import JobList from '@/components/JobList';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-background">
      {/* Header with background pattern */}
      <div className="header-bg relative h-32 bg-primary"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-12">
        <JobList />
      </div>
    </main>
  );
}
