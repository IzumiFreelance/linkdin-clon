import React from 'react';
import { Building2, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    created_at: string;
    company_logo?: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
          {job.company_logo ? (
            <img src={job.company_logo} alt={job.company} className="w-10 h-10 object-contain" />
          ) : (
            <Building2 className="w-6 h-6 text-gray-400" />
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-lg text-blue-600 hover:underline">
            {job.title}
          </h3>
          <p className="text-gray-600">{job.company}</p>
          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Posted {formatDistanceToNow(new Date(job.created_at))} ago • {job.type}
            </div>
          </div>
        </div>
        
        <button className="ml-4 px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50">
          Save
        </button>
      </div>
    </div>
  );
}