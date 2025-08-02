import Image from 'next/image';
import classNames from 'classnames';
import { Job } from '@/types/job';
import SkillTag from './SkillTag';

interface JobCardProps {
  job: Job;
  onPositionClick: (job: Job) => void;
  onSkillClick: (skill: string) => void;
}

export default function JobCard({ job, onPositionClick, onSkillClick }: JobCardProps) {
  const cardClasses = classNames(
    'bg-white rounded-lg shadow-lg p-6 border-l-4 hover:shadow-xl transition-shadow duration-300 mb-[40px] md:mb-[20px]',
    {
      'border-primary': job.featured,
      'border-transparent': !job.featured,
    }
  );

  return (
    <div className={cardClasses}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0 mt-[-50px] md:mt-0">
          <Image
            src={job.logo}
            alt={`${job.company} logo`}
            width={56}
            height={56}
            className="rounded-full"
          />
        </div>

        {/* Job Info */}
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-primary font-bold">{job.company}</h3>
            {job.new && (
              <span className={classNames(
                'text-white text-xs leading-none font-bold px-2 pt-1 rounded-full uppercase',
                'bg-primary'
              )}>
                New!
              </span>
            )}
            {job.featured && (
              <span className={classNames(
                'text-white text-xs leading-none font-bold px-2 pt-1 rounded-full uppercase',
                'bg-neutral-very-dark'
              )}>
                Featured
              </span>
            )}
          </div>
          
          <h4 
            className="text-neutral-very-dark inline-block font-bold text-lg mb-2 hover:text-primary cursor-pointer"
            onClick={() => onPositionClick(job)}
          >
            {job.position}
          </h4>
          
          <div className="flex items-center gap-3 text-neutral-dark text-sm">
            <span>{job.postedAt}</span>
            <span>•</span>
            <span>{job.contract}</span>
            <span>•</span>
            <span>{job.location}</span>
          </div>
        </div>

        {/* Skills/Tags */}
        <div className="flex flex-wrap gap-2 md:ml-auto">
          <SkillTag text={job.role} onClick={() => onSkillClick(job.role)} />
          <SkillTag text={job.level} onClick={() => onSkillClick(job.level)} />
          {job.languages.map(language => (
            <SkillTag key={language} text={language} onClick={() => onSkillClick(language)} />
          ))}
          {job.tools.map(tool => (
            <SkillTag key={tool} text={tool} onClick={() => onSkillClick(tool)} />
          ))}
        </div>
      </div>
    </div>
  );
}