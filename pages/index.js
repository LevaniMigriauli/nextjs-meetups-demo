import Head from 'next/head'
import { MongoClient } from 'mongodb'

import MeetupList from '../components/meetups/MeetupList'
import { Fragment } from 'react'

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A first meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg',
//     address: 'guramis meetup str',
//     description: 'This is first meetup'
//   }, {
//     id: 'm2',
//     title: 'A second meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg',
//     address: 'guramis meetup str',
//     description: 'This is second meetup'
//   }]

function HomePage (props) {
  return <Fragment>
    <Head>
      <title>React Meetups</title>
      <meta
        name={'description'}
        content={'Browse a huge list of highly active React meetups!'}
      />
    </Head>
    <MeetupList meetups={props.meetups}/>
  </Fragment>
}

// export async function getServerSideProps(context){
// const req = context.req
// const res = context.res
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps () {

  const client = await MongoClient.connect(
    'mongodb+srv://Levan:qsmrkhef16@cluster0.grxui.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image
      }))
    },
    revalidate: 1
  }
}

export default HomePage