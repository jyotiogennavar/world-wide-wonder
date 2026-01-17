import {Image} from 'next-sanity/image'

import {urlForImage} from '@/sanity/lib/utils'
import DateComponent from '@/app/components/Date'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: any
  }
  date?: string
  small?: boolean
}

export default function Avatar({person, date, small = false}: Props) {
  const {firstName, lastName, picture} = person

  return (
    <div className="flex items-center font-sans">
      {picture?.asset?._ref ? (
        <div className={`${small ? 'h-8 w-8 mr-3' : 'h-12 w-12 mr-4'} relative overflow-hidden rounded-full ring-2 ring-stone-100`}>
          <Image
            alt={picture?.alt || ''}
            className="h-full w-full object-cover"
            height={small ? 32 : 48}
            width={small ? 32 : 48}
            src={
              urlForImage(picture)
                ?.height(small ? 64 : 96)
                .width(small ? 64 : 96)
                .fit('crop')
                .url() as string
            }
          />
        </div>
      ) : (
        <div className={`${small ? 'h-8 w-8 mr-3' : 'h-12 w-12 mr-4'} rounded-full bg-stone-200 flex items-center justify-center`}>
          <span className={`text-stone-500 ${small ? 'text-xs' : 'text-sm'}`}>
            {firstName?.[0]}{lastName?.[0]}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <span className={`font-medium text-stone-900 ${small ? 'text-sm' : 'text-base'}`}>
            {firstName} {lastName}
          </span>
        )}
        {date && (
          <span className={`text-stone-400 ${small ? 'text-xs' : 'text-sm'}`}>
            <DateComponent dateString={date} />
          </span>
        )}
      </div>
    </div>
  )
}
