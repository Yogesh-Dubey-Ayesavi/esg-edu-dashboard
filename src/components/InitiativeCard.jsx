import React from 'react'
import { Card, CardTitle } from './ui/card'
import Link from 'next/link'

const InitiativeCard = ({ title, dir }) => {

  return (
    <Link href={`/${dir}/${title}`} >
    <Card className='m-3 p-3 w-full'>
    <CardTitle>{title}</CardTitle>
    </Card>
    </Link>
  )
}

export default InitiativeCard