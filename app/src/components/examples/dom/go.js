import Link from 'next/link'

const Go = () => {
  return (
    <Link href='/box' as={`/box`}>
      <button className=''>
        Next page
      </button>
    </Link>
  )
}

export default Go
