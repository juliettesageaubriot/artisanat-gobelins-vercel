import Link from 'next/link'

const BackButton = () => {
  return (
    <Link href='/' as={`/`}>
      <button className=''>
        Previous page
      </button>
    </Link>
  )
}

export default BackButton
