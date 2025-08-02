"use client";

import { useState, useEffect } from "react";
import { Job } from "@/types/job";
import JobCard from "./JobCard";
import Filters from "./Filters";

const fetchJobs = (): Promise<Job[]> => {
  return new Promise((resolve, reject) => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs data");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    // add a delay to the fetch to simulate a real-world scenario
    setTimeout(() => {
      fetchJobs()
        .then((data) => {
          setJobs(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }, 1000);
  }, []);

  // Filter jobs based on selected filters
  const filteredJobs = jobs.filter((job) => {
    if (filters.length === 0) return true;
    
    const jobSkills = [
      job.role,
      job.level,
      ...job.languages,
      ...job.tools
    ];
    
    return filters.every(filter => jobSkills.includes(filter));
  });

  // Add filters from job position click
  const addFiltersFromJob = (job: Job) => {
    const newFilters = [job.role, job.level, ...job.languages, ...job.tools];
    const uniqueFilters = Array.from(new Set([...filters, ...newFilters]));
    setFilters(uniqueFilters);
  };

  // Add single filter
  const addFilter = (filter: string) => {
    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  // Remove filter
  const removeFilter = (filterToRemove: string) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters([]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-neutral-dark">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filters.length > 0 && (
        <Filters 
          filters={filters} 
          removeFilter={removeFilter}
          clearAllFilters={clearAllFilters}
        />
      )}
      {filteredJobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onPositionClick={addFiltersFromJob}
          onSkillClick={addFilter}
        />
      ))}
    </div>
  );
}
