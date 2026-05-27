import { UserProb } from "@/types";

function Avatar({ author }: { author: UserProb }) {
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <div className="absolute inset-0 bg-yellow-400 rounded rotate-[-12deg]" />
      <div className="absolute inset-0 bg-yellow-500 rounded rotate-[-6deg] opacity-70" />
      <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
        {author?.avatar_url ? (
          <img
            src={author.avatar_url}
            alt={author.username || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-medium text-gray-500">
            {author?.first_name?.[0] || ''}
            {author?.last_name?.[0] || ''}
          </span>
        )}
      </div>
    </div>
  );
}

export default function AuthorCard({ author }: { author: UserProb }) {
  if (!author) return null;

  return (
   <div className="bg-primary-50 rounded-xl p-4 md:p-6 w-full">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
      Authors
    </h2>

    <hr className="border-gray-200 mb-4" />

    <div className="flex items-center gap-3 md:gap-4">
      <div className="shrink-0">
        <Avatar author={author} />
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <p className="text-sm md:text-base font-bold text-gray-900 leading-tight truncate">
          {(author.first_name || '') + ' ' + (author.last_name || '')}
        </p>

        <p className="text-xs md:text-sm text-gray-500 leading-normal break-words">
          {author.role_title || 'Member'} at Vietstrix Team
        </p>
      </div>
    </div>

    <hr className="border-gray-200 my-4" />

    <p className="text-sm text-gray-600 leading-7 break-words">
      {author.bio}
    </p>
</div>
  );
}
