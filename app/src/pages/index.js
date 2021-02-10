import useStore from '@/helpers/store'

import Header from '@/components/Header/Header'

const Page = () => {
  useStore.setState({ title: 'Sphere' })
  return (
    <>
      <Header />
    </>
  )
}

export default Page
